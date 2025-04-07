import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [
    react(), 
   
  ],
  build: {
    outDir: 'dist'  // ✅ Build output folder (default is 'dist')
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
})
