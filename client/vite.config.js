import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base './' keeps asset paths relative, so the built site works from any folder or host.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
    // While developing, any request to /api/... is forwarded to the Express server,
    // so the browser thinks everything lives on one origin (no CORS setup needed).
    proxy: { "/api": "http://localhost:5001" },
  },
});
