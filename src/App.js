// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Report from "./pages/Report.jsx";
import History from "./pages/History.jsx";
import Repositories from "./pages/Repositories.jsx";
import Settings from "./pages/Settings.jsx";
import "./App.css";
import { MdDashboard } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { MdOutlineHistory } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";

function Sidebar() {
  const location = useLocation();

  const getLinkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    margin: "5px 0",
    borderRadius: "15px",
    backgroundColor: location.pathname === path ? "#B9FF66" : "transparent",
    color: location.pathname === path ? "#000" : "#fff",
    fontWeight: location.pathname === path ? "bold" : "normal",
    textDecoration: "none",
    boxShadow: location.pathname === path ? "0px 5px 10px rgba(0, 0, 0, 0.1)" : "none",
  });

  return (
    <nav className="sidebar">
      <h1 style={{ paddingTop: "120%", color: "#fff" }}>CODIFY</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={getLinkStyle("/")}>
            <MdDashboard style={{ marginRight: "10px" }} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/history" style={getLinkStyle("/history")}>
            <MdOutlineHistory style={{ marginRight: "10px" }} />
            History
          </Link>
        </li>
        <li>
          <Link to="/repositories" style={getLinkStyle("/repositories")}>
            <RiGitRepositoryFill style={{ marginRight: "10px" }} />
            Repositories
          </Link>
        </li>
        <li>
          <Link to="/report" style={getLinkStyle("/report")}>
            <HiDocumentReport style={{ marginRight: "10px" }} />
            Report
          </Link>
        </li>
        <li>
          <Link to="/settings" style={getLinkStyle("/settings")}>
            <IoIosSettings style={{ marginRight: "10px" }} />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app" style={{ display: "flex" }}>
        <Sidebar />
        <main className="content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/history" element={<History />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
