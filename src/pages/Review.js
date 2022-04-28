import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

function Review() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {id} = useParams();
    const history = useHistory();

    const token = localStorage.getItem("token");

    async function addReviewToGuitar(data) {
        try {
            await axios.post(`http://localhost:8080/profiles/guitars/${id}/reviews`, {
                title: data.title,
                details: data.details,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSuccessMessage("Review toegevoegd!");
        } catch (e) {
            console.error(e.response.data);
            setErrorMessage(e.response.data.errorList[0])
        }
    }

    function onFormSubmit(data) {
        addReviewToGuitar(data);
    }

    return (
        <div className="form-container">
            <form id="form" onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Review schrijven</h2>
                <label htmlFor="details-title">
                    Titel:
                    <input
                        type="text"
                        id="details-title"
                        {...register("title", {
                            required: "het veld is leeg!",
                        })}
                    />
                    {errors.title && (
                        <p className="error-message">{errors.title.message}</p>)}
                </label>
                <label htmlFor="details">
                    Text:
                    <textarea
                        id="details"
                        rows="5"
                        cols="35"
                        {...register("details", {
                            required: "het veld is leeg!",
                        })}
                    />
                    {errors.details && (
                        <p className="error-message">{errors.details.message}</p>)}
                </label>
                {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                {successMessage && (<p>{successMessage}</p>)}
                <button className="button" type="submit">versturen</button>
                <button className="button" type="submit" onClick={() => history.push(`/guitar/${id}`)}>back</button>
            </form>
        </div>
    )
}

export default Review;