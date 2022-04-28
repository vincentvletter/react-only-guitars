import "./Login.css";
import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from "axios";
import {Link} from "react-router-dom";

function Login() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState("");


    async function logUserIn(data) {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: data.username,
                password: data.password,
            })
            login(response.data);

        } catch (e) {
            console.error(e.response.data)
            setErrorMessage("Verkeerde gebruikersnaam of wachtwoord")
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
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="details-username"
                        {...register("username",{
                            required: "het veld is leeg",
                        })}
                    />
                    {errors.username && (
                        <p className="error-message">{errors.username.message}</p>)}
                </label>
                <label htmlFor="details-wachtwoord">
                    Wachtwoord:
                    <input
                        type="password"
                        id="details-wachtwoord"
                        {...register("password", {
                            required: "het veld is leeg",
                        })}
                    />
                    {errors.password && (
                        <p className="error-message">{errors.password.message}</p>)}
                </label>
                <button className="button" type="submit">login</button>
                {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                <p>Heb je nog geen account? <Link to="/register"><span className="blue">Registreren</span></Link></p>
            </form>
        </div>
    );
}

export default Login;