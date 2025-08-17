#!/bin/bash

# Vercel build script for QR Code Generator
echo "Building QR Code Generator for Vercel deployment..."

# Install dependencies
npm install

# Build the frontend
vite build

echo "Build completed successfully!"