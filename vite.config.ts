// @ts-expect-ignore
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnWarning: false,
      failOnError: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
