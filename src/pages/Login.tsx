import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login as apiLogin } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from.pathname || "/home";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await apiLogin(username, password);
      if (user) {
        login(user);
        navigate(from, { replace: true });
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("login Failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 300,
        }}
      >
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
