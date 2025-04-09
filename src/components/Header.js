import React from "react";
import "../styles.css";

export default function Header() {
    return (
        <div>
            <img className="logo" src="saltyFish.png" alt="saltyFish" />
            <h2 className="app-subtitle">Any requests? Ask SaltyFish!</h2>
        </div>
    )
}