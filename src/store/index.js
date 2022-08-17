import {configureStore, createSlice} from "@reduxjs/toolkit";
import {reducer as formReducer} from "redux-form";


const initialAuthState = {isAuthenticated: false};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

const stockState = {stocks: []};

const stockSlice = createSlice({
    name: "stock",
    initialState: stockState,
    reducers: {
        setStocks(state, action) {
            state.stocks = action.payload;
        },
        removeStocks(state) {
            state.stocks = [];
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        stock: stockSlice.reducer,
        form: formReducer
    },
});


export const authActions = authSlice.actions;
export const stockActions = stockSlice.actions;

export default store;