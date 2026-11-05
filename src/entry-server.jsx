import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { PrivacyPolicy } from "./PrivacyPolicy.jsx";

export function render(url) {
  const basePath = import.meta.env.BASE_URL;
  const appPath = url.startsWith(basePath) ? `/${url.slice(basePath.length)}` : url;
  const isPrivacyPage = appPath.replace(/\/$/, "") === "/privacy";
  return renderToString(isPrivacyPage ? <PrivacyPolicy /> : <App />);
}
