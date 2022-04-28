import "./ReviewTile.css";
import React from "react";


function ReviewTile({title, details}) {

    return (
        <div className="review-container">
            <h2>{title}</h2>
            <p className="review-text">{details}</p>
        </div>
    )
}

export default ReviewTile;
