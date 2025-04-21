import React from "react";

export default function RequestCard({ request, isSavedListed, toggleSavedList }) {
    
    const handleError = (e) => {
        e.target.src = "service_imgs/default.jpg"
    }

    const getDateClass = (date) => {
        const today = new Date();
        const requestDate = new Date(date);

        const timeDiff = requestDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff <= 0) {
            return "rating-bad";
        }
        else if (date <= 5) {
            return "rating-ok";
        }
        else {
            return "rating-good";
        }
    }

    return (
        <div key={request.id} className="movie-card">
            <img src={`services_imgs/${request.image}`} alt={request.title} onError={handleError}/>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{request.title}</h3>
                
                <div className="movie-card-details">
                <span className="movie-card-category">{request.category}</span><br/>
                <span className={`movie-card-rating ${getDateClass(request.date)}`}>Start Date: {request.date}</span>
                </div>
                
                <p className="movie-card-description">{request.description}</p>
                    <label className="switch">
                        <input type="checkbox" checked={isSavedListed} onChange={() => toggleSavedList(request.id)}></input>
                        <span className="slider">
                            <span className="slider-label">{isSavedListed ? "In SavedList" : "Add to SavedList"}</span>
                        </span>
                    </label>
            </div>
        </div>
    );
}