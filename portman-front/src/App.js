import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import Portfolio from "./pages/Portfolio.js";
import Watchlist from "./pages/Watchlist.js";
import Report from "./pages/Report.js";
import Navbar from "./components/Navbar.js";

function App() {
  useEffect(() => {
    // ⚠️ This logs user out on every refresh — probably NOT what you want
    // localStorage.clear();
  }, []);

  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/portfolio"
          element={isLoggedIn ? <Portfolio /> : <Navigate to="/login" />}
        />
        <Route
          path="/watchlist"
          element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={isLoggedIn ? <Report /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;