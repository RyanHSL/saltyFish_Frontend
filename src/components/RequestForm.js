import react, { useState, useEffect } from "react";
import "../formStyles.css";
import "../styles.css";
import { clear } from "@testing-library/user-event/dist/clear";
import { type } from "@testing-library/user-event/dist/type";

export default function RequestForm({ dispatch, editingRequest }) {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categoryLabel, setCategoryLabel] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch("/serviceCategories.json")
        .then((response) => response.json())
        .then((data) => setCategoryLabel(data))
        .catch((error) => console.log("Failed to load the category"));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const imgFileName = category.toLowerCase() + ".jpg";

        const requestData = {
            id: editingRequest ? editingRequest.id : new Date().getTime(),
            title,
            category,
            description,
            image: imgFileName,
            date
        };

        dispatch({
            type: editingRequest ? "UPDATE_REQUESTS" : "ADD_REQUESTS",
            payload: requestData
        });

        clearForm();
    }

    const clearForm = () => {
        setTitle("");
        setCategory("");
        setDescription("");
        setDate("");
    }

    const handleCancel = () => {
        dispatch({type: "CLEAR_EDITING_REQUEST"});
        clearForm();
    }

    return (
        <section>
            <h3 className="Title">New Request</h3>
            <form className="service-form" onSubmit={handleSubmit}>
                <div className="FormFields">
                    <div className="FormField">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="search-input" aria-label="Title" placeholder="Request Title" name="name" autoComplete="off" />
                    </div>
                    <div className="FormField">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="search-input" aria-label="Description" placeholder="Request Description" name="description" rows="3" />
                    </div>
                    <div className="filter-bar">
                        <div className="filter-slot">
                            <label htmlFor="deadline">Start Time</label>
                            <input type="date" value={date} id="deadline" name="deadline" className="rating-input" onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        <div className="filter-slot">
                            <label htmlFor="category">Category</label>
                            <select className="filter-dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categoryLabel.map((categoryItem) => (
                                    <option key={categoryItem.id} value={categoryItem.value}>{categoryItem.value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {category && (
                        <div style={{ marginTop: "10px" }}>
                            <img
                                src={`/services_imgs/${category.toLowerCase()}.jpg`}
                                alt={category}
                                style={{ width: "350px", borderRadius: "8px" }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <button type="submit" className="watchlist-btn">Submit</button>
                    {
                        editingRequest && (
                            <button type="button" className="button" onClick={handleCancel}>Cancel Edit</button>
                        )
                    }
                </div>
            </form>
        </section>
    );
}