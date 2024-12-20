// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

import { plugins } from "chart.js";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{port:3060}
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server:{port:3060},
  build: {
    outDir: 'dist', // This is the default, make sure it's set
  }
});
