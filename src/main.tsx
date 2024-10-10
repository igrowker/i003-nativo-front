import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import VerificationCode from "./components/VerificationCode";
import MicrocreditsPage from "./pages/microcredits/MicrocreditsPage";
import ApplyMicrocreditsPage from "./pages/microcredits/ApplyMicrocreditsPage";
import ContributeMicrocreditsPage from "./pages/microcredits/ContributeMicrocreditsPage";
import HistoryMicrocreditsPage from "./pages/microcredits/HistoryMicrocreditsPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import AboutUs from "./pages/aboutUs";
import Team from "./pages/team";
import Home from "./pages/home";
import QrGeneratorPage from "./pages/qr/QrGeneratorPage";
import "./index.css";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import History from "./pages/history";
import Donations from "./pages/donations";
import ProfileEdition from "./pages/profileEdition";
import QRCodeScanner from "./pages/qr/QRCodeScanner";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<VerificationCode />} />
        <Route element={<ProtectedLayout />}>
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/dashboard" element={"hola todo bien"} />
          <Route path="/generate-qr" element={<QrGeneratorPage />} />
          <Route path="/pay-qr" element={<QRCodeScanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edition" element={<ProfileEdition />} />
          <Route path="/microcredits" element={<MicrocreditsPage />} />
          <Route
            path="/apply-microcredit"
            element={<ApplyMicrocreditsPage />}
          />
          <Route
            path="/contribute-microcredit"
            element={<ContributeMicrocreditsPage />}
          />
          <Route
            path="/history-microcredits"
            element={<HistoryMicrocreditsPage />}
          />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
);
