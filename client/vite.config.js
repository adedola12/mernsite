import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000",
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// });




export default defineConfig(({ command, mode }) => {

  return {
      server: {
      proxy: {
      "/api": {
        target: command === 'serve' ? 'http://localhost:3000' : 'https://mernsite-k2ky.onrender.com/',
        secure: false,
      },
    },
  },
  plugins: [react()],
  };
});