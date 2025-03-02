import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://your-ec2-public-ip:5000/login", { email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);

            onLogin(response.data.username, response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
