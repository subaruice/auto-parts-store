import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Provider} from 'react-redux';
import { HashRouter } from "react-router";
import { AuthContextProvider } from "./AuthContext.tsx";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <Provider store={store}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Provider>
    </HashRouter>
);
