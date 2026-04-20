import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <div
        style={{
          padding: 10,
          background: "#222",
          color: "white",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: 22,
            background: "none",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        
        <h1
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            fontSize: 20,
          }}
        >
          Portfolio Manager
        </h1>
      </div>

      
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : -300,
          width: "200px",
          height: "100%",
          background: "#333",
          color: "white",
          padding: "20px",
          transition: "0.3s",
        }}
      >
        
        <button
          onClick={() => setOpen(false)}
          style={{
            fontSize: 20,
            background: "none",
            color: "white",
            border: "none",
            cursor: "pointer",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          ✖
        </button>

        <div style={{ marginTop: 40 }}>
          <p><Link to="/dashboard">Dashboard</Link></p>
          <p><Link to="/portfolio">Portfolio</Link></p>
          <p><Link to="/watchlist">Watchlist</Link></p>
          <p><Link to="/report">Report</Link></p>
          <p><Link to="/register">Register</Link></p>
        </div>
      </div>
    </>
  );
}