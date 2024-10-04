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
import QrGeneratorPage from "./pages/qr/QrGeneratorPage";
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
        <Route path="/microcredits" element={<MicrocreditsPage />} />
        <Route path="/apply-microcredit" element={<ApplyMicrocreditsPage />} />
        <Route
          path="/contribute-microcredit"
          element={<ContributeMicrocreditsPage />}
        />
        <Route
          path="/history-microcredits"
          element={<HistoryMicrocreditsPage />}
        />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={"hola todo bien"} />
          <Route path="/generate-qr" element={<QrGeneratorPage />} />
          <Route path="/qr/:id" element={<QrGeneratorPage />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
);
