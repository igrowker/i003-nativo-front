import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import VerificationCode from "./components/VerificationCode";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<VerificationCode />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
