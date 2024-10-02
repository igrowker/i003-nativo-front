import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import VerificationCode from "./components/VerificationCode";
import ProtectedLayout from "./layout/ProtectedLayout";
import "./index.css";
import AboutUs from "./pages/aboutUs";
import Team from "./pages/team";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<VerificationCode />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={"hola todo bien"} />
          {/* Otras rutas protegidas */}
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
);
