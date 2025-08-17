# QR Code Generator

A modern, minimal QR code generator with real-time generation and beautiful animations.

## Features

- 🔄 Real-time QR code generation as you type
- ✨ Beautiful loading animations with pixel effects
- 📱 Responsive design for mobile and desktop
- 🎨 Clean, minimal interface
- ⬇️ Download QR codes as PNG
- 🔒 Client-side processing for privacy

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- qrcode library for QR generation

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

### Deploy to Vercel

1. Fork or clone this repository
2. Connect to Vercel via GitHub integration
3. Vercel will automatically detect the configuration and deploy

The project includes:
- `vercel.json` - Vercel deployment configuration
- Automatic build with `vite build`
- Static file serving with SPA routing

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the built application
# Deploy the contents to any static hosting service
```

## Project Structure

```
├── client/src/
│   ├── components/
│   │   └── simple-qr-generator.tsx
│   ├── pages/
│   │   └── home.tsx
│   └── App.tsx
├── dist/              # Build output
├── vercel.json        # Vercel configuration
└── README.md
```

## Usage

1. Enter any text in the input field
2. Watch the QR code generate in real-time
3. Download the generated QR code as PNG

The application works entirely in your browser - no data is sent to any servers.