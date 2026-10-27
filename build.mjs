// Builds the PRESENT prototype into one self-contained page.
// Run from this folder:  node build.mjs   (needs Node and an internet connection the first time, for esbuild)
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(root, 'build'), { recursive: true });
execSync('npx --yes esbuild@0.23.1 src/App.jsx --bundle --format=iife --jsx=transform --target=es2019 --outfile=build/app.js --log-level=warning', { cwd: root, stdio: 'inherit' });

const svg = Object.fromEntries(readdirSync(join(root, 'assets')).filter(f => f.endsWith('.svg'))
  .map(f => [basename(f, '.svg'), readFileSync(join(root, 'assets', f), 'utf8').trim()]));
const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
const js = readFileSync(join(root, 'build/app.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const svgJs = JSON.stringify(svg).replace(/<\/script/gi, '<\\/script');

const head = `<title>PRESENT App Prototype</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
<style>
${css}</style>`;
const body = `<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>window.__PRESENT_SVG = ${svgJs};</script>
<script>
${js}</script>`;

// Lets the page be added to a phone's home screen and open full screen like an app. Page only: the artifact has no icon files.
const appMeta = `<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="PRESENT">
<meta name="theme-color" content="#FFFFFF">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">`;

// A page to open locally, and the same content as an artifact page body.
writeFileSync(join(root, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${appMeta}
${head}
</head>
<body>
${body}
</body>
</html>
`);
writeFileSync(join(root, 'build/artifact.html'), `${head}\n${body}\n`);
console.log('Built index.html and build/artifact.html');
