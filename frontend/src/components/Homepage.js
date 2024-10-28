// src/components/Homepage.js
import './Homepage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="navbar">
                <button className="button" onClick={() => navigate('/login')}>Login</button>
                <button className="button" onClick={() => navigate('/signup')}>Signup</button>
            </div>
            {/* Add a div for the text with the new class */}
            <div className="text-box">
                <h1>Welcome to PillPerfect</h1>
                <p>Your perfect pill partner!</p>
            </div>
        </div>
    );
};

export default Home;
