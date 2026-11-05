import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { PrivacyPolicy } from "./PrivacyPolicy.jsx";

export function render(url) {
  const isPrivacyPage = url.replace(/\/$/, "") === "/privacy";
  return renderToString(isPrivacyPage ? <PrivacyPolicy /> : <App />);
}
