/* eslint-disable */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Report from "./pages/Report.js";
import History from "./pages/History.js";
import Repositories from "./pages/Repositories.js";
import Settings from "./pages/Settings.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <h1 className="logo">CODIFY</h1>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/report">Report</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/repositories">Repositories</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
        <main className="content">
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