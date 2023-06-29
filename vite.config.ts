import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

let faviconURL = "/favicon.svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
      },
      includeAssets: [faviconURL],
      manifest: {
        name: "SIAK Mobile",
        short_name: "SIAK Mobile",
        description: "SIAK-NG for mobile",
        theme_color: "#ffdd00",
        icons: [
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
