import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// @ts-expect-error Почему ошибка не понятно
import eslint from 'vite-plugin-eslint';
import { fileURLToPath } from 'node:url'; // Современная альтернатива path

// Современный аналог __dirname
// const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint({
      failOnWarning: false,
      failOnError: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
});
