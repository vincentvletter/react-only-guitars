import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";


function PrivateRoute({children, ...rest}) {

    const {user, isAuth} = useContext(AuthContext);

    return (
        <Route {...rest}>
            {isAuth && user.role === "ADMIN" ? children : <Redirect to="/profile"/>}
        </Route>
    )
}

export default PrivateRoute;