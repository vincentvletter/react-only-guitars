import "./ReviewTile.css";
import React from "react";


function ReviewTile({title, details, username}) {

    return (
        <div className="review-container">
            <h2>{title}</h2>
            <div className="details-container">
                <p className="review-text">{details}</p>
                <p className="username">{username}</p>
            </div>
        </div>
    )
}

export default ReviewTile;
