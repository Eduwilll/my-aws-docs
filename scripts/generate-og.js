import sharp from "sharp";

const width = 1200;
const height = 630;
const sourceImagePath =
  "C:/Users/Eduardo/.gemini/antigravity/brain/347c1038-e663-40c8-87f9-aa41ebadc071/cloud_computing_bg_1776450679032.png";

const svgText = `
<svg width="${width}" height="${height}">
  <defs>
    <linearGradient id="textFade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#020617" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#020617" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#020617" stop-opacity="0.0" />
    </linearGradient>
    <linearGradient id="btn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#textFade)" />
  
  <text x="80" y="160" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="76" fill="#f8be00ff" filter="url(#shadow)">My AWS Docs</text>
  <text x="80" y="240" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="76" fill="#ffffff" filter="url(#shadow)">Desbrave a</text>
  <text x="80" y="325" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="76" fill="#3b82f6" filter="url(#shadow)">Nuvem AWS</text>
  
  <text x="80" y="405" font-family="Inter, Arial, sans-serif" font-size="32" fill="#cbd5e1" font-weight="600" filter="url(#shadow)">Guia definitivo de documentação</text>
  <text x="80" y="455" font-family="Inter, Arial, sans-serif" font-size="32" fill="#cbd5e1" font-weight="600" filter="url(#shadow)">e simulados interativos.</text>
  
  <g filter="url(#shadow)">
    <rect x="80" y="510" width="380" height="70" rx="35" fill="url(#btn)" />
    <text x="270" y="555" font-family="Inter, Arial, sans-serif" font-weight="bold" font-size="24" fill="#ffffff" text-anchor="middle">Acessar Simulador Gratuito</text>
  </g>
</svg>
`;

async function main() {
  try {
    await sharp(sourceImagePath)
      .resize(width, height, { fit: "cover", position: "right" })
      .composite([{ input: Buffer.from(svgText) }])
      .webp({ quality: 90 })
      .toFile("public/images/og-image-seo.webp");
    console.log("Premium OG image generated based on AI base map.");
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

main();
