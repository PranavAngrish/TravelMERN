import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Env vars (VITE_*) come from the single .env at the repo root.
// ../shared holds the site content used by both the React app and the server.
export default defineConfig({
  envDir: '..',
  server: { proxy: { '/api': 'http://localhost:3000' }, fs: { allow: ['..'] } },
  plugins: [react()],
})
