import React from "react";
import { Route, Redirect } from "react-router-dom";
import Hoc from "./hoc/hoc";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Demo from "./containers/Demo";
import ChangeEmail from "./containers/account/ChangeEmail";
import ChangePassword from "./containers/account/ChangePassword";
import Billing from "./containers/account/Billing";
import APIKey from "./containers/account/APIKey";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authenticated = localStorage.getItem("token") !== null;
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/demo" component={Demo} />
        <PrivateRoute path="/account/change-email" component={ChangeEmail} />
        <PrivateRoute path="/account/change-password" component={ChangePassword} />
        <PrivateRoute path="/account/billing" component={Billing} />
        <PrivateRoute path="/account/api-key" component={APIKey} />
    </Hoc>
);

export default BaseRouter;