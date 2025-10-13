import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync, cpSync } from 'fs';
import path from 'path';

// Paths
const distPath = path.resolve('dist/web-components');
const staticPath = path.resolve('storybook-static');
const iframePath = path.join(staticPath, 'iframe.html');

// 1️⃣ Clear previous static folder
if (existsSync(staticPath)) rmSync(staticPath, { recursive: true });
mkdirSync(staticPath, { recursive: true });

// 2️⃣ Copy web-components folder
cpSync(distPath, path.join(staticPath, 'web-components'), { recursive: true });

// 3️⃣ Get all JS/CSS files in dist/web-components
const files = readdirSync(distPath);
const jsFiles = files.filter(f => f.endsWith('.js'));
const cssFiles = files.filter(f => f.endsWith('.css'));

// 4️⃣ Generate iframe.html dynamically
let iframeContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Stencil Storybook</title>
`;

// Include CSS files
cssFiles.forEach(file => {
  iframeContent += `<link rel="stylesheet" href="/web-components/${file}" />\n`;
});

// Include JS files
jsFiles.forEach(file => {
  iframeContent += `<script type="module" src="/web-components/${file}"></script>\n`;
});

iframeContent += `</head>
<body>
<storybook-root></storybook-root>
</body>
</html>`;

// 5️⃣ Write iframe.html
writeFileSync(iframePath, iframeContent, 'utf-8');

console.log('✅ Generated iframe.html with all JS/CSS files dynamically!');
