import React, { useState, useEffect } from "react";
import '../styles.css'
import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ services, savedList, toggleSavedList }) {
    
    const [searchTerm, setSearchTerm] = useState("");

    const [category, setCategory] = useState("All Categories");
    const [rating, setRating] = useState("All");


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    const matchesCategory = (service, category) => {
        return category === "All Categories" || service.category.toLowerCase() === category.toLowerCase();
    }

    const matchesSearchTerm = (service, searchTerm) => {
        return service.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const matchesRating = (service, rating) => {
        switch(rating) {
            case "All":
                return true;
            case "Good":
                return service.rating >= 8;
            case "Ok":
                return service.rating >= 5 && service.rating < 8;
            case "Bad":
                return service.rating < 5;
            default:
                return false;
        }
    }

    const filteredServices = services.filter((service) =>
        matchesCategory(service, category) &&
        matchesSearchTerm(service, searchTerm) &&
        matchesRating(service, rating)
    );

    return (
        <div>
            <input type="text" className="search-input" placeholder="Search services..."
            value={searchTerm} onChange={handleSearchChange}/>
            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Category</label>
                    <select className="filter-dropdown" value={category} onChange={handleCategoryChange}>
                        <option>All Categories</option>
                        <option>Care</option>
                        <option>Cleaning</option>
                        <option>Cooking</option>
                        <option>Makeup</option>
                        <option>Ride</option>
                        <option>UsedGoods</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>
            <div className="movies-grid">
                {
                    filteredServices.map((service) => (
                        <ServiceCard service={service} key={service.id} toggleSavedList={toggleSavedList} isSavedListed={savedList.includes(service.id) }></ServiceCard>
                    )
                )}
            </div>
        </div>
    );
}