import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({children, ...rest}) {

    const contextData = useContext(AuthContext);

    return (
        <Route {...rest}>
            {contextData.user.role === "ADMIN" ? children : <Redirect to="/profile"/>}
        </Route>
    )
}

export default PrivateRoute;