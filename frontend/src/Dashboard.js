import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import CSS

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "Unknown User");
        setToken(localStorage.getItem("token") || "No Token Available");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome, {username}!</h2>
            <p>Your JWT Token:</p>
            <textarea readOnly value={token}></textarea>
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
