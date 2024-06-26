import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://mernsite-k2ky.onrender.com
// http://localhost:3000
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://adlmmarketplace.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
