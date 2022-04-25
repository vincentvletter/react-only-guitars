import "./Login.css";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

function Login() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const history = useHistory();

    async function logUserIn(data) {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: data.username,
                password: data.password,
            })
            login(response.data);

        } catch (e) {
            console.error(e.response.data)
        }

    }

    function onFormSubmit(data) {
        logUserIn(data);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Login</h2>
                <label htmlFor="details-username">
                    Username:
                    <input
                        type="text"
                        id="details-username"
                        {...register("username")}
                    />
                </label>
                <label htmlFor="details-wachtwoord">
                    Password:
                    <input
                        type="password"
                        id="details-wachtwoord"
                        {...register("password")}
                    />
                </label>
                <button className="login-button" type="submit">login</button>
                <Link><p>wachtwoord vergeten?</p></Link>
                <p>Heb je nog geen account? <Link to="/register">Registreren</Link></p>
            </form>
        </div>
    );
}

export default Login;