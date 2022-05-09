import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";


function RequestGuitar() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const token = localStorage.getItem("token");

    async function makeRequest(data) {
        try {
            await axios.post("http://localhost:8080/requests", {
                brand: data.brand,
                model: data.model,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setSuccessMessage("Request vertuurd.");
        } catch (e) {
            console.error(e.response.data);
            setErrorMessage("Er ging iets mis.");
        }
        setTimeout(() => {
            setSuccessMessage("");
        }, 2000);
    }

    function onFormSubmit(data) {
        makeRequest(data);
    }

    return (
        <div className="form-container">
            <form id="form" onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Aanvraag</h2>
                <label htmlFor="details-brand">
                    Merk:
                    <input
                        type="text"
                        id="details-brand"
                        {...register("brand", {
                            required: "het veld is leeg!",
                        })}
                    />
                    {errors.brand && (
                        <p className="error-message">{errors.brand.message}</p>)}
                </label>
                <label htmlFor="details-model">
                    Model:
                    <input
                        type="text"
                        id="details-model"
                        {...register("model", {
                            required: "het veld is leeg!",
                        })}
                    />
                    {errors.model && (
                        <p className="error-message">{errors.model.message}</p>)}
                </label>
                <button className="button" type="submit">Versturen</button>
                {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                {successMessage && (<p>{successMessage}</p>)}
            </form>
        </div>
    )
}

export default RequestGuitar;

