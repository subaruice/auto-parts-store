import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router";
import { AuthContextProvider } from "./AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </HashRouter>
);
