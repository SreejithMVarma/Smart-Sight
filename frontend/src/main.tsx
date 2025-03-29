import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import "./index.css";
import SmartSightHome from "./SmartSightHome";
import Contribute from "./components/Contribute"; 
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Routes>
          <Route path="/" element={<SmartSightHome />} /> {/* Load SmartSightHome initially */}
          <Route path="/app" element={<App />} /> {/* Navigate to App.tsx when button is clicked */}
          <Route path="/contribute" element={<Contribute />} /> {/* Contribute Page */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
