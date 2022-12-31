import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import "react-photo-view/dist/react-photo-view.css";
import "aos/dist/aos.css";
const helmetContext = {};

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_API,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AuthProvider>
                    <HelmetProvider context={helmetContext}>
                        <App />
                    </HelmetProvider>
                </AuthProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
