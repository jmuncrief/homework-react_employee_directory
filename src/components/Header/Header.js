import React from 'react';
import "./Header.css";

export default function Header() {
    return (
        <div className="banner">
            <div className="header">
                <h1>Employee Directory</h1>
            </div>
            <div className="info">
                <h5>Type to search, or click 'name' to sort A-Z</h5>
            </div>
        </div>
    )
}