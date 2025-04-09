import React from "react";
import "../styles.css"
import ServiceCard from "./ServiceCard";

export default function SavedList({ services, savedList, toggleSavedList }) {
    return (
        <div>
            <h1 className="title">Your Saved Services</h1>
            <div className="watchList">
                {
                    savedList.map(id => {
                        const service = services.find(service => service.id === id);
                        return <ServiceCard key={id} service={service} toggleSavedList={toggleSavedList}></ServiceCard>
                    })
                }
            </div>
        </div>
    );
}