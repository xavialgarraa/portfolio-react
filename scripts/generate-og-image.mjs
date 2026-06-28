import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "og-image.png");

const fontStack =
  "Inter, 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Top-left mark -->
  <text x="80" y="110" font-family="${fontStack}" font-weight="800" font-size="40" fill="#0f172a">X</text>
  <line x1="80" y1="135" x2="160" y2="135" stroke="#0f172a" stroke-width="3"/>

  <!-- Headline -->
  <text x="80" y="320" font-family="${fontStack}" font-weight="800" font-size="120" fill="#0f172a" letter-spacing="-3">Xavi Algarra</text>

  <!-- Subtitle -->
  <text x="84" y="400" font-family="${fontStack}" font-weight="500" font-size="40" fill="#475569">Computer Engineer · AI &amp; Computer Vision</text>

  <!-- Accent line -->
  <line x1="80" y1="490" x2="240" y2="490" stroke="#0f172a" stroke-width="2"/>

  <!-- Footer URL -->
  <text x="80" y="560" font-family="${fontStack}" font-weight="500" font-size="26" fill="#64748b">xavialgarraa.github.io</text>

  <!-- Right-side accent -->
  <text x="1120" y="560" text-anchor="end" font-family="${fontStack}" font-weight="500" font-size="22" fill="#94a3b8">Barcelona · 2026</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`og-image written to ${OUT}`);
