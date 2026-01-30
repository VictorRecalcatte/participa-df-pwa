import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acesso externo
    port: 3000, // ou sua porta
    allowedHosts: [
      'localhost',
      '.ngrok-free.dev', // permite todos os subdomínios ngrok
    ],
  },
})