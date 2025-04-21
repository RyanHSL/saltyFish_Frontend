import react, { useState, useEffect, use } from "react";
import "../styles.css";
import "../formStyles.css";

export default function ServiceForm({ dispatch, editingService }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [categoryLabel, setCategoryLabel] = useState([]);
    const [rating, setRating] = useState("");

    useEffect(() => {
        if (editingService) {
            setTitle(editingService.title);
            setCategory(editingService.category);
            setDescription(editingService.description);
            setRating(editingService.rating);
        } else {
            clearForm();
        }
    }, [editingService])

    useEffect(() => {
        fetch("/serviceCategories.json")
        .then((response) => response.json())
        .then((data) => setCategoryLabel(data))
        .catch((error) => console.log("Failed to load the category"));
    }, []);

    const clearForm = () => {
        setTitle("");
        setCategory("");
        setDescription("");
        setRating("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const imgFileName = category.toLowerCase() + ".jpg";
        
        const serviceData = {
            id: editingService ? editingService.id : new Date().getTime(),
            title,
            category,
            description,
            image: imgFileName,
            rating
        };
        
        dispatch({
            type: editingService ? "UPDATE_SERVICE" : "ADD_SERVICE",
            payload: serviceData
        });

        clearForm();
    }

    const handleCancel = () => {
        dispatch({type: "CLEAR_EDITING_SERVICE"});
        clearForm();
    }

    return (
        <section>
            <h3 className="Title">New Service</h3>
            <form onSubmit={handleSubmit} className="service-form">
                <div className="FormFields">
                    <div className="FormField">
                        <input type="text" value={title} className="search-input" aria-label="Title" onChange={(e) => setTitle(e.target.value)} placeholder="Service Title" />
                        <textarea type="text" value={description} className="search-input" aria-label="Description" onChange={(e) => setDescription(e.target.value)} placeholder="Service Description" rows="3"/>
                    </div>
                    <div className="filter-bar">
                        <div className="filter-slot">
                            <label>Rating</label>
                            <input type="number" value={rating} className="rating-input" onChange={(e) => setRating(e.target.value)} placeholder="Service Rating"/>  
                        </div>
                        <div className="filter-slot">
                            <label>Category</label>
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
                    {/* <fieldset className="priority-fieldset">
                        <legend>Category</legend>
                        {
                            Object.entries(categoryLabel).map(([value, label]) => (
                                <label key={value} className="priority-label">
                                    <input type="radio" value={value} checked={category === value} onChange={(e) => setCategory(e.target.value)} className="priotity-input"/>
                                </label>
                            ))
                        }
                    </fieldset> */}
                </div>
                <div>
                    <button type="submit" className="watchlist-btn">Submit</button>
                    {
                        editingService && (
                            <button type="button" className="button" onClick={handleCancel}>Cancel Edit</button>
                        )
                    }
                </div>
            </form>
        </section>
    );
}