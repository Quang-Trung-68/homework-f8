import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // alias "@" trỏ về thư mục src
//     },
//   },
// });

// test url a bang
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.bkstarstudy.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // alias "@" trỏ về thư mục src
    },
  },
});
