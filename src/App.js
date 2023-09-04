import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router";
import { Container } from "@mui/system";
import { LanguageProvider } from "./Components/LanguageContext";
// Pages
import Home from "./Pages/Home";
import Publication from "./Pages/Publications";
import Guidelines from "./Pages/Guidelines";
import Journal from "./Pages/Journal";
import AboutUs from "./Pages/About us";
// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer.jsx";

function App() {
  const location = useLocation();
  const nav = location.pathname === "/" ? <Navbar /> : <Navbar />;
  return (
    <LanguageProvider>
      <div className="app">
        {nav}
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/Publications" element={<Publication />} />
          <Route path="/Guidelines" element={<Guidelines />} />
          <Route path="/Journal" element={<Journal />} />
          <Route path="/About-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
