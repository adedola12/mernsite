import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    base:
      command === "serve"
        ? "http://localhost:3000/"
        : "https://adlmmarketplace.onrender.com/",
  };
});

//vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: import.meta.env.VITE_API_URL_SERVER,
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// });
