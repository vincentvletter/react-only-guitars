import './Tile.css';
import {ReactComponent as Heart} from "../assets/heart-431.svg";
import {ReactComponent as Review} from "../assets/speech-bubble-1080.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function Tile({id, review}) {
    const [result, setResult] = useState({});

    useEffect(() => {

        const token = localStorage.getItem("token");

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
                console.error(e.response.data)
            }
        }

        if (id) {
            fetchGuitar();
        }
    }, [])

    return (
        <div className="tile">
            <Link to={`/guitar/${id}`} className="guitar-link"><img className="guitar-image" src={result.imageApi} alt="guitar-image" /></Link>
            <Heart className="heart-icon"/>
            <p className="profile-likes">{result.profileLikes}</p>
            {review !== 0 && <Review className="review-icon" />}
            {review !== 0 && <p className="reviews">{review}</p>}
        </div>
    )
}

export default Tile;