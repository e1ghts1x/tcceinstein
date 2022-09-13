import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import "./global.css"

import Login from "./Components/LoginAdmin/LoginAdmin";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
