import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 8080,
    host: true, // ensures it binds to 0.0.0.0 (needed for deployment)
  },
  preview: {
    port: Number(process.env.PORT) || 8080,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1000 // optional: suppress large chunk warning
  }
})
