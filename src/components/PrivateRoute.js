import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";


function PrivateRoute({children, ...rest}) {

    const {isAuth} = useContext(AuthContext);

    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/"/>}
        </Route>
    )
}

export default PrivateRoute;