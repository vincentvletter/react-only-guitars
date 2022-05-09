import "./Register.css";
import React, {useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";


function Register() {

    const {register, formState: {errors}, handleSubmit, watch} = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const history = useHistory();

    async function userRegister(data) {

        try {
            await axios.post("http://localhost:8080/register", {
                password: data.password,
                username: data.username,
            })
            setSuccessMessage("account aangemaakt!");
            setTimeout(() => {
                history.push('/');
            }, 2000)
        } catch (e) {
            console.error(e.response.data);
            console.error(e.response)
            setErrorMessage(e.response.data);
        }
        setTimeout(() => {
            setErrorMessage("");
        },2000)
            setSuccessMessage("account successful created!");
            history.push('/');
        } catch (e) {
            console.error(e.response.data);
            setErrorMessage("Gebruikersnaam bestaat al");
        }
    }

    function onFormSubmit(data) {
        userRegister(data);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Registreren</h2>
                <label htmlFor="details-usrename">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="details-username"
                        {...register("username", {
                            required: "Het veld is leeg!",
                        })}
                    />
                    {errors.username && (
                        <p className="error-message">{errors.username.message}</p>
                    )}
                </label>
                <label htmlFor="details-password">
                    Wachtwoord:
                    <input
                        type="password"
                        id="details-password"
                        {...register("password", {
                            required: "Het veld is leeg!",
                        })}
                    />
                    {errors.password && (
                        <p className="error-message">{errors.password.message}</p>
                    )}
                </label>
                <label htmlFor="details-password-check">
                    Herhaal wachtwoord:
                    <input
                        type="password"
                        id="details-password-check"
                        {...register("passwordCheck", {
                            required: "Het veld is leeg!",
                            validate: value =>
                                value === watch("password") || "Wahtwoorden zijn niet het zelfde!",
                        })}
                    />
                    {errors.passwordCheck && (
                        <p className="error-message">{errors.passwordCheck.message}</p>
                    )}
                </label>
                <button className="button" type="submit">registeren</button>
                {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                {successMessage && (<p>{successMessage}</p>)}
                <p>Heb je al een account?<Link to="/"><span className="blue">Login</span></Link></p>
            </form>
        </div>
    );
}

export default Register;