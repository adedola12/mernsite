import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// TO TEST LIVE SERVER CHANGE TARGET URL TO https://mernsite-k2ky.onrender.com 
// OR http://localhost:3000 TO SPIN-UP LOCAL DEVELOPMENT

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://mernsite-k2ky.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});

