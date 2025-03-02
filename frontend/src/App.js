import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css"

function App() {
    const [user, setUser] = useState({
        username: localStorage.getItem("username") || "",
        token: localStorage.getItem("token") || "",
    });

    const handleLogin = (username, token) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        setUser({ username, token });
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUser({ username: "", token: "" });
    };

    return (
        <Router>
            <nav>
                {!user.token ? (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/dashboard" element={user.token ? <Dashboard username={user.username} token={user.token} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={user.token ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
