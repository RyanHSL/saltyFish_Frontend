import React from "react";

export default function ServiceCard({ service, isSavedListed, toggleSavedList }) {
    
    const handleError = (e) => {
        e.target.src = "service_imgs/default.jpg"
    }

    const getRatingClass = (rating) => {
        if (rating >= 4) {
            return "rating-good";
        }
        else if (rating >= 2.5) {
            return "rating-ok";
        }
        else {
            return "rating-bad";
        }
    }

    return (
        <div key={service.id} className="movie-card">
            <img src={`services_imgs/${service.image}`} alt={service.title} onError={handleError}/>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{service.title}</h3>
                
                <div className="movie-card-details">
                <span className="movie-card-category">{service.category}</span>
                <span className={`movie-card-rating ${getRatingClass(service.rating)}`}>{service.rating}</span>
                </div>
                
                <p className="movie-card-description">{service.description}</p>
                    <label className="switch">
                        <input type="checkbox" checked={isSavedListed} onChange={() => toggleSavedList(service.id)}></input>
                        <span className="slider">
                            <span className="slider-label">{isSavedListed ? "In SavedList" : "Add to SavedList"}</span>
                        </span>
                    </label>
            </div>
        </div>
    );
}