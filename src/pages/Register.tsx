import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as apiRegister } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const newUser = await apiRegister({ username, password });
      login(newUser);
      navigate("/home");
    } catch (err) {
      setError("Registration Failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
