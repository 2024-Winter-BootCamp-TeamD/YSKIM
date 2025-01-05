/* eslint-disable */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Report from "./pages/Report.js";
import History from "./pages/History.js";
import Repositories from "./pages/Repositories.js";
import Settings from "./pages/Settings.js";
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";
import { MdDashboard } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { MdOutlineHistory } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
        <Logo />
          <ul>
            <li><Link to="/"><MdDashboard /> Dashboard</Link></li>
            <li><Link to="/report"><HiDocumentReport /> Report</Link></li>
            <li><Link to="/history"><MdOutlineHistory /> History</Link></li>
            <li><Link to="/repositories"><RiGitRepositoryFill /> Repositories</Link></li>
            <li><Link to="/settings"><IoIosSettings /> Settings</Link></li>
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