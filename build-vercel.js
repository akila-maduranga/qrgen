#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building for Vercel deployment...');

// Run the normal build
execSync('vite build', { stdio: 'inherit' });

// Read the generated HTML file
const htmlPath = path.join(__dirname, 'dist/public/index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix absolute asset paths to relative paths
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

// Remove the Replit development banner script for production
html = html.replace(/<script type="text\/javascript" src="https:\/\/replit\.com\/public\/js\/replit-dev-banner\.js"><\/script>/, '');

// Write the fixed HTML back
fs.writeFileSync(htmlPath, html);

console.log('Fixed asset paths for Vercel deployment');
console.log('Build completed successfully!');