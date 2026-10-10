import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so the build works on
// Netlify, Vercel, and GitHub Pages (including repo sub-paths).
export default defineConfig({
  base: './',
  plugins: [react()],
});
