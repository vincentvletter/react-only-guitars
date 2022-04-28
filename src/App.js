import './App.css';
import Login from "./pages/Login";
import {Route, Switch} from "react-router-dom";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import logo from './assets/logo.png'
import Overview from "./pages/Overview";
import GuitarUpload from "./pages/GuitarUpload";
import Guitar from "./pages/Guitar";
import Review from "./pages/Review";
import RequestGuitar from "./pages/RequestGuitar";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";


function App() {



    return (
        <>
            <NavBar>
                <img className="logo" src={logo} alt="test"/>
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
                            <Overview/>
                        </PrivateRoute>
                        <PrivateRouteAdmin exact path="/guitar/upload">
                            <GuitarUpload/>
                        </PrivateRouteAdmin>
                        <PrivateRoute exact path="/guitar/:id">
                            <Guitar/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/review/:id">
                            <Review/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/request/guitar">
                            <RequestGuitar/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </main>
        </>
    );
}

export default App;
