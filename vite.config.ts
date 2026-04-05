import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true, // also necessary
  },
  base: "/class-wheel-of-misfortune/"
})
