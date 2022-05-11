import "./Profile.css";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import Tile from "../components/Tile";
import {useHistory} from "react-router-dom";


function Profile() {

    const contexData = useContext(AuthContext);
    const [result, setResult] = useState();
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchUserData() {
            try {
                const response = await axios.get("http://localhost:8080/profiles", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResult(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUserData()
    }, [])


    return (
        <section>
            <div className="button-container">
                {result && result.role === "ADMIN" &&
                <button className="button" type="button" onClick={() => history.push("/guitar/upload")}>Gitaar
                    toevoegen</button>}
                {result && result.role === "USER" &&
                <button className="button" type="button" onClick={() => history.push("/request/guitar")}>Gitaar
                    aanvragen</button>}
                <button className="button" type="button" onClick={contexData.logout}>Uitloggen</button>
            </div>
            <article className="tile-content">
                {result && <h2>{result.username}</h2>}
            </article>
            <article className="tile-container">
                {result && result.guitarList.map((guitar) => {
                    return <Tile
                        id={guitar.id}
                        review={guitar.reviewListSize}
                        key={guitar.model}
                    />
                })}
            </article>
        </section>
    )
}

export default Profile;