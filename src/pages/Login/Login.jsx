import {reduxForm} from "redux-form"
import {required} from "../../utils/validators"
import {createField, Input} from "../../common/FormControl"
import classes from "./Login.module.css";
import {api, setToken} from "../../utils/api";
import {authActions} from "../../store";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const LoginForm = ({handleSubmit, error, message}) => {
    return <form onSubmit={handleSubmit}>
        <h2>{message}</h2>
        {createField('username', 'Username', [required], Input)}
        {createField('password', 'Password', [required], Input, undefined,{type: 'password'})}

        {error && <div className="error">{error}</div>}

        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (formData) => {
        const authResponse = await api.login(formData)
        dispatch(authActions.login());
        await setToken(authResponse["key"])
        history.push('/stocks')
    }

    return <main className={classes.auth}>
        <section><h1>Login</h1>
            <LoginReduxForm message="Hello" onSubmit={handleSubmit}/></section>
    </main>
}