import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <StrictMode>
            <App />
        </StrictMode>
    </HashRouter>
);
