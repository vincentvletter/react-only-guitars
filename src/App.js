import './App.css';
import Login from "./pages/Login";
import {Route, Switch} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import logo from './assets/logo.png'

function App() {
    const {auth} = useContext(AuthContext);
    return (
        <>
            <NavBar>
                <img src={logo} alt="test"/>
            </NavBar>
            <main className="outerbox">
                <div className="innerbox">
                    <Switch>
                        <Route exact path="/">
                            <Login/>
                        </Route>
                        <Route exact path="/register">
                            <Register/>
                        </Route>
                        <PrivateRoute exact path="/profile">
                            <Profile/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/overview">
                            <Profile/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </main>
        </>
    );
}

export default App;
