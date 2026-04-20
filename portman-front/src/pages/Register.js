import { useState } from "react";
import API from "../api/api.js";
import "../styles/Register.css";

export default function Register() {
  const [user, setUser] = useState({});

  const register = async () => {
    try {
      await API.post("/auth/register", user);
      alert("Registered!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>

        <input
          className="register-input"
          placeholder="Name"
          onChange={e => setUser({ ...user, name: e.target.value })}
        />

        <input
          className="register-input"
          placeholder="Email"
          onChange={e => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          className="register-input"
          placeholder="Password"
          onChange={e => setUser({ ...user, password: e.target.value })}
        />

        <button className="register-btn" onClick={register}>
          Register
        </button>

        <div
          className="register-link"
          onClick={() => (window.location.href = "/login")}
        >
          Already have an account? Login
        </div>

      </div>
    </div>
  );
}