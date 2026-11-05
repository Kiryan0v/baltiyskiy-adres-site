import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { PrivacyPolicy } from "./PrivacyPolicy.jsx";
import "./styles.css";

const basePath = import.meta.env.BASE_URL;
const appPath = window.location.pathname.startsWith(basePath)
  ? `/${window.location.pathname.slice(basePath.length)}`
  : window.location.pathname;
const isPrivacyPage = appPath.replace(/\/$/, "") === "/privacy";

const page = <React.StrictMode>{isPrivacyPage ? <PrivacyPolicy /> : <App />}</React.StrictMode>;
const root = document.getElementById("root");

if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
