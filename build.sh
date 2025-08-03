#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Create _redirects file for SPA routing
echo "/*    /index.html   200" > dist/_redirects

echo "Build completed successfully!"
