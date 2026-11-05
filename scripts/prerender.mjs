import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { siteConfig } from "../src/siteConfig.js";

const root = process.cwd();
const clientDir = path.join(root, "dist", "client");
const basePath = process.env.GITHUB_PAGES === "true" ? "/baltiyskiy-adres-site/" : "/";
const serverBundle = path.join(root, "dist", "server-render", "entry-server.js");
const { render } = await import(pathToFileURL(serverBundle).href);
const template = await readFile(path.join(clientDir, "index.html"), "utf8");

function injectMarkup(html, route) {
  const markup = render(route);
  let page = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  if (route !== "/privacy") {
    if (/^https?:\/\//.test(siteConfig.siteDomain)) {
      const origin = new URL(siteConfig.siteDomain).origin;
      page = page
        .replace(`content="${basePath}assets/coastal-home.webp"`, `content="${origin}${basePath}assets/coastal-home.webp"`)
        .replace("</head>", `  <meta property="og:url" content="${origin}${basePath}" />\n  <link rel="canonical" href="${origin}${basePath}" />\n  </head>`);
    }
    return page;
  }

  return page
    .replace(/<title>[^<]*<\/title>/, "<title>Политика конфиденциальности — Балтийский адрес</title>")
    .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="Политика конфиденциальности сайта Балтийский адрес." />')
    .replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Политика конфиденциальности — Балтийский адрес" />')
    .replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="Политика конфиденциальности сайта Балтийский адрес." />')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, "")
    .replace("</head>", '  <meta name="robots" content="noindex, follow" />\n  </head>');
}

await writeFile(path.join(clientDir, "index.html"), injectMarkup(template, "/"));
const privacyDir = path.join(clientDir, "privacy");
await mkdir(privacyDir, { recursive: true });
await writeFile(path.join(privacyDir, "index.html"), injectMarkup(template, "/privacy"));

if (/^https?:\/\//.test(siteConfig.siteDomain)) {
  const origin = new URL(siteConfig.siteDomain).origin;
  await writeFile(path.join(clientDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}${basePath}</loc></url></urlset>\n`);
  await writeFile(path.join(clientDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}${basePath}sitemap.xml\n`);
}

console.log("Prerendered home page and privacy draft.");
