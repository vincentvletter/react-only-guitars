import './Tile.css';
import {ReactComponent as Heart} from "../assets/heart-431.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Tile({id}) {
    if (id) {
        console.log(id);
    }
    const [result, setResult] = useState({});

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token);

        async function fetchGuitar() {
            try {
                const response = await axios.get(`http://localhost:8080/guitars/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResult(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e.response.data)
            }
        }

        if (id) {
            fetchGuitar();
        }
    }, [])

    return (
        <div className="tile">
            <img className="guitar-image" src={result.imageApi} alt="guitar-image"/>
            <Heart className="heart-icon"/>
            <p className="test">{result.profileLikes}</p>
        </div>
    )
}

export default Tile;