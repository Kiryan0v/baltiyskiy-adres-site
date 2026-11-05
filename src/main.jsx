import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { PrivacyPolicy } from "./PrivacyPolicy.jsx";
import "./styles.css";

const isPrivacyPage = window.location.pathname.replace(/\/$/, "") === "/privacy";

const page = <React.StrictMode>{isPrivacyPage ? <PrivacyPolicy /> : <App />}</React.StrictMode>;
const root = document.getElementById("root");

if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
