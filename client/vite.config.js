import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


// http://localhost:3000
// https://mernsite-k2ky.onrender.com
// https://adlmmarketplace.onrender.com

// TO TEST LIVE SERVER CHANGE TARGET URL TO https://mernsite-k2ky.onrender.com
// OR http://localhost:3000 TO SPIN-UP LOCAL DEVELOPMENT

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
