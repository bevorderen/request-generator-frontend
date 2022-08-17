import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useSelector} from "react-redux";

const MainNavigation = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Request generator</div>
            <nav className={classes.nav}>
                <ul>
                    {isAuth ? <React.Fragment>
                            <li>
                                <NavLink to="/orders" activeClassName={classes.active}>
                                    Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" activeClassName={classes.active}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stocks" activeClassName={classes.active}>
                                    Stocks
                                </NavLink>
                            </li>
                        </React.Fragment>
                        : <React.Fragment>
                            <li>
                                <NavLink to="/login" activeClassName={classes.active}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/SignUp" activeClassName={classes.active}>
                                    SignUp
                                </NavLink>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;