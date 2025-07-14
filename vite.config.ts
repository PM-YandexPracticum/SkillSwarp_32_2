import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// @ts-expect-error Почему ошибка не понятно
import eslint from 'vite-plugin-eslint';
import { fileURLToPath } from 'node:url'; // Современная альтернатива path
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

// Современный аналог __dirname
// const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    tsconfigPaths(),
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
      '@data-types': path.resolve(__dirname, './src/shared/global-types/data-types'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
