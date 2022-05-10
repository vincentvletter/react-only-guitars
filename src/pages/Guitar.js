import "./Guitar.css";
import {ReactComponent as Heart} from "../assets/heart-431.svg";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import ReviewTile from "../components/ReviewTile";


function Guitar() {

    const [result, setResult] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {id} = useParams();

    const history = useHistory();

    const token = localStorage.getItem("token");


    useEffect(() => {
        async function fetchGuitar() {
            try {
                const response = await axios.get(`http://localhost:8080/guitars/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResult(response.data);
            } catch (e) {
                console.error(e.response.data);
            }
        }

        if (id) {
            fetchGuitar();
        }
    }, [id, token])

    function handleClick() {
        addGuitarToProfile()
    }

    async function addGuitarToProfile() {
        try {
            await axios.post("http://localhost:8080/profiles/guitars", {
                id: result.id,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSuccessMessage("Gitaar toegevoegd aan profiel!");
        } catch (e) {
            console.error(e.response.data);
            setErrorMessage("Deze gitaar staat al op je profiel!");
            setSuccessMessage("");
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        },2000)
    }

    function handleReviewClick() {
        history.push(`/review/${result.id}`);
    }

    return (
        <section className="outerbox">
            <div className="innerbox">
                <article className="top-container">
                    <h1>{result.brand}</h1>
                    <h1>{result.model}</h1>
                </article>
                <article className="mid-container">
                    <img className="guitar-image" src={result.imageApi} alt="guitar"/>
                    <Heart className="heart-guitar-page" onClick={handleClick}/>
                    {errorMessage && (<p>{errorMessage}</p>)}
                    {successMessage && (<p>{successMessage}</p>)}
                </article>
                <article className="bottum-container">
                    {result.reviewList && result.reviewList.map((review) => {
                        return <ReviewTile
                            title={review.title}
                            details={review.details}
                            username={review.username}
                            key={review.timeStamp}
                        />
                    })}
                </article>
                <div className="button-container">
                    <button type="button" className="button" onClick={handleReviewClick}>Schrijf een review</button>
                    <button type="button" className="button"><a href={`http://localhost:8080/image/${id}/download`} download>Download foto</a></button>
                    <button type="button" className="button" onClick={() => history.push("/overview")}>Naar overview</button>
                </div>
            </div>
        </section>
    )
}

export default Guitar;