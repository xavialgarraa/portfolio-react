import http from "node:http";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE = "/portfolio-react/";
const PORT = 4413;
const ROUTES = ["/"];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  if (url.startsWith(BASE)) url = url.slice(BASE.length - 1);
  if (url === "/" || url === "") url = "/index.html";

  const filePath = join(DIST, url);
  if (existsSync(filePath) && !filePath.endsWith("/")) {
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
    });
    res.end(readFileSync(filePath));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(readFileSync(join(DIST, "index.html")));
});

await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.on("pageerror", (err) => {
      console.warn(`[prerender] page error on ${route}:`, err.message);
    });

    // Force the i18n default to Spanish so the prerendered HTML matches
    // the meta description and og:locale (es_ES). Visitors still control
    // their own language after hydration via the navbar selector.
    await page.evaluateOnNewDocument(() => {
      try {
        localStorage.setItem("lang", "es");
      } catch {}
    });

    const url = `http://localhost:${PORT}${BASE}${route.replace(/^\//, "")}`;
    console.log(`[prerender] rendering ${url}`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector("#hero", { timeout: 10000 });

    const html = await page.evaluate(() => {
      // El HTML estático no debe conservar el estado del reveal-on-scroll:
      // sin JS, "reveal-ready" dejaría el contenido con opacity 0.
      document.documentElement.classList.remove("reveal-ready");
      document
        .querySelectorAll("[data-reveal].is-revealed")
        .forEach((el) => el.classList.remove("is-revealed"));
      return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    });

    const outPath =
      route === "/"
        ? join(DIST, "index.html")
        : join(DIST, route.replace(/^\//, ""), "index.html");

    writeFileSync(outPath, html, "utf-8");
    console.log(`[prerender] wrote ${outPath}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

console.log("[prerender] done");
