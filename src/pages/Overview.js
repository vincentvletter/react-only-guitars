import "./Overview.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Tile from "../components/Tile";


function Overview() {
    const [result, setResult] = useState();


    useEffect(() => {

        const token = localStorage.getItem("token");

        async function fetchGuitar() {
            try {
                const response = await axios.get(`http://localhost:8080/guitars`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResult(response.data);
            } catch (e) {
                console.error(e.response.data)
            }
        }

        fetchGuitar();
    }, [])


    return (
        <section>
            <article className="tile-content">
                <h2>Overview</h2>
            </article>
            <article className="tile-container">
                {result && result.map((guitar) => {
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

export default Overview;