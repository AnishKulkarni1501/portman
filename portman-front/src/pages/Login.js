import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data && res.data.id) {
        localStorage.setItem("userId", res.data.id);

        navigate("/dashboard");
      } else {
        alert("Invalid login");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>
          Login
        </button>

        <button
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          New User?
        </button>

      </div>
    </div>
  );
}