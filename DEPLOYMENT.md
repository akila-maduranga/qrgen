# Deployment Guide

## Deploy to Vercel (Recommended)

### IMPORTANT: Fix for White Screen Issue

If you're getting a white screen on Vercel, follow these steps:

1. **Build locally first**:
   ```bash
   node build-vercel.js
   ```

2. **Use the correct vercel.json**:
   The project includes a `build-vercel.js` script that fixes asset paths for deployment.

### Method 1: GitHub Integration (Easiest)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically use the `vercel.json` configuration
5. Your QR code generator will be live at `yourproject.vercel.app`

### Method 2: Manual Upload

1. Build the project locally:
   ```bash
   node build-vercel.js
   ```
2. Upload the `dist/public` folder contents to Vercel
3. Configure SPA routing in Vercel dashboard

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to deploy
```

## Deploy to Netlify

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Deploy to Other Static Hosts

The project builds to static files in the `dist/` directory. You can deploy these files to:

- GitHub Pages
- Surge.sh
- Firebase Hosting
- Cloudflare Pages
- Any other static hosting service

### Build Commands for Different Platforms

Most platforms will automatically detect the build configuration, but if needed:

- **Build Command**: `vite build`
- **Output Directory**: `dist`
- **Node Version**: 18 or higher

## Environment Variables

This project doesn't require any environment variables as it runs entirely client-side.

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Ensure Node.js version 18+ is installed
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Try building locally first: `npm run build`

### Deployment Issues

- Make sure the `dist/` directory contains `index.html`
- Verify SPA routing is configured (included in `vercel.json`)
- Check that all assets are properly referenced