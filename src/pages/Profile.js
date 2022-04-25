import "./Profile.css";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import Tile from "../components/Tile";

function Profile() {
    const contexData = useContext(AuthContext);
    const [result, setResult] = useState();
    console.log(contexData);

    useEffect(() => {

        const token = localStorage.getItem("token");

        async function fetchUserData(token) {
            try {
                const response = await axios.get("http://localhost:8080/profiles", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setResult(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUserData(token)
    }, [])

    return (
        <section>
            <article className="tile-content">
                {result && <h2>{result.username}</h2>}
            </article>
            <article className="tile-container">
                {result && result.guitarList.map((guitar) => {
                    return <Tile
                        id={guitar.id}
                        key={guitar.model}
                    />
                })}
            </article>
            <button type="button" onClick={contexData.logout}>logout</button>
        </section>
    )
}

export default Profile;