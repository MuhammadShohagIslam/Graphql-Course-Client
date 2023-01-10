import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import "react-photo-view/dist/react-photo-view.css";
import "aos/dist/aos.css";
const helmetContext = {};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
            <AuthProvider>
                <HelmetProvider context={helmetContext}>
                    <App />
                </HelmetProvider>
            </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
