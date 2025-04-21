import React, { useState, useEffect } from "react";
import '../styles.css'
import RequestCard from "./RequestCard";

export default function RequestsGrid({ requests, savedList, toggleSavedList }) {
    
    const [searchTerm, setSearchTerm] = useState("");

    const [category, setCategory] = useState("All Categories");
    const [dateTime, setDateTime] = useState("All");


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    }

    const matchesCategory = (request, category) => {
        return category === "All Categories" || request.category.toLowerCase() === category.toLowerCase();
    }

    const matchesSearchTerm = (request, searchTerm) => {
        return request.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const filteredRequests = requests.filter((request) =>
        matchesCategory(request, category) &&
        matchesSearchTerm(request, searchTerm)
    );

    return (
        <div>
            <input type="text" className="search-input" placeholder="Search requests..."
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
                    <label>Start Date</label>
                    <input type="date" className="filter-dropdown" value={dateTime} onChange={handleDateTimeChange} />
                </div>
            </div>
            <div className="movies-grid">
                {
                    filteredRequests.map((request) => (
                        <RequestCard request={request} key={request.id} toggleSavedList={toggleSavedList} isSavedListed={savedList.includes(request.id) }></RequestCard>
                    )
                )}
            </div>
        </div>
    );
}