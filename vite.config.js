import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [
    react(), 
   
  ],
  build: {
    outDir: 'dist',  // ✅ Build output folder (default is 'dist')
     rollupOptions: {
      input: {
        popup: 'index.html',
      }
    }
  },
  server: {
    historyApiFallback: true
  },

  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
})
