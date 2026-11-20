import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Read VITE_* variables from the single .env at the repo root
export default defineConfig({
  envDir: '..',
  server: { proxy: { '/api': 'http://localhost:3000' } },
  plugins: [react()],
})
