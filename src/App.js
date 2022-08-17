import React from 'react'
import Layout from "./components/layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "./pages/NotFound";
import {Login} from "./pages/Login/Login";
import {SignUp} from "./pages/SignUp/SignUp";
import {StockList} from "./pages/Stock/List";
import {Order} from "./pages/Stock/Order";


function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/login"/>
                </Route>
                <Route path="/login">
                    {<Login/>}
                </Route>
                <Route path="/signup">
                    {<SignUp/>}
                </Route>
                <Route path="/stocks" exact>
                    {<StockList/>}
                </Route>
                <Route path="/stocks/:stockId">
                    {<Order/>}
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
