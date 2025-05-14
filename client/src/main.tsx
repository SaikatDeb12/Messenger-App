import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ToasterContext from "./components/ToasterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToasterContext />
    <App />
  </StrictMode>
);
