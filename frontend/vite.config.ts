import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',        // ✅ Vercel output directory set to 'build'
    sourcemap: false,        // ✅ Disable sourcemaps in production (smaller bundle)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],   // ✅ Split vendor chunk for better caching
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});