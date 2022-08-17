import {createBrowserHistory as createHistory} from 'history'

const history = createHistory()
export const TOKEN_KEY = 'token'
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
export const API_URL = "http://localhost:8000/api"

export const headers = function (token, contentType) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }

    if (token) {
        headers['Authorization'] = `Token ${token}`
    }

    if (contentType) {
        headers['Content-Type'] = contentType
    }
    if (contentType === null) {
        delete headers['Content-Type']
    }

    return headers
}

function updateAuthCredentials(response) {
    if (401 === response.status) {
        clearToken()
        history.push('/')
    }

    return response
}

function parseResponse(response) {
    let body
    if (
        response.headers.get('Content-Type') &&
        response.headers.get('Content-Type').indexOf('application/json') !== -1
    ) {
        body = response.json()
    } else {
        body = response.text()
    }

    if (response.status >= 200 && response.status < 300) {
        return body
    }

    return body.then(data =>
        Promise.reject({
            response: response,
            data: data,
        }),
    )
}


export const callApi = (
    endPoint,
    method = 'GET',
    payload = null,
    protect = false,
    contentType,
    opts = {},
) => {
    const token = getToken()

    const body = payload
        ? typeof payload === 'object' && !(payload instanceof FormData)
            ? JSON.stringify(payload)
            : payload
        : undefined

    const options = {
        method: method.toUpperCase(),
        headers: headers(token, contentType),
        body: body,
        redirect: 'follow',
        cache: 'no-cache',
        ...opts,
    }

    return fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, options)
        .then(updateAuthCredentials)
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            })),
        )
        .then(response => {
            if (
                response.headers.get('Content-Type') &&
                response.headers.get('Content-Type').indexOf('application/json') !== -1 &&
                response.body
            ) {
                return {
                    ...response,
                    body: JSON.parse(response.body),
                }
            }

            return response
        })
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(response)
            }

            return response.body
        })
        .catch(data => {
            if (data.status === 401 && protect !== true) {
                options.headers = headers()

                return fetch(`${API_URL}/${endPoint}`, options)
                    .then(updateAuthCredentials)
                    .then(parseResponse)
            }

            return Promise.reject(data)
        })
}
export const api = {
    login: ({username, password}) => callApi('auth/login/', 'POST', {username, password}, false),
    logout: () => callApi('auth/logout/', 'Post'),
    signUp: data => callApi("person/signup", "Post", data, false),
    getStocks: () => callApi("stock/list", "Get"),
    getStock: (stockId) => callApi(`stock/detail/${stockId}`, "Get"),
    creatOrder: (data) => callApi("order/create", "Post", data)
}