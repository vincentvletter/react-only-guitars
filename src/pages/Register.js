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
            const response = await axios.post("http://localhost:8080/register", {
                password: data.password,
                username: data.username,
            })
            setSuccessMessage("account successful created!")
            setInterval(() => {
                history.push('/');
            }, 2000)

        } catch (e) {
            console.error(e.response.data);
            setErrorMessage(e.response.data.errorList[0])
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
                    Username:
                    <input
                        type="text"
                        id="details-username"
                        {...register("username")}
                    />
                </label>
                <label htmlFor="details-password">
                    Password:
                    <input
                        type="password"
                        id="details-password"
                        {...register("password", {
                            required: "This field is required!",
                        })}
                    />
                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </label>
                <label htmlFor="details-password-check">
                    password:
                    <input
                        type="password"
                        id="details-password-check"
                        {...register("passwordCheck", {
                            required: "This field is required!",
                            validate: value =>
                                value === watch("password") || "The passwords do not match!",
                        })}
                    />
                    {errors.passwordCheck && (
                        <p>{errors.passwordCheck.message}</p>
                    )}
                </label>
                <button className="register-button" type="submit">registeren</button>
                {errorMessage && (<p>{errorMessage}</p>)}
                {successMessage && (<p>{successMessage}</p>)}
                <p>Heb je al een account?<Link to="/">Login</Link></p>
            </form>
        </div>
    );
}

export default Register;