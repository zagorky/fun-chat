import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  // resolve: {
  //   alias: {
  //     '~': path.resolve(import.meta.dirname, './src'),
  //   },
  // },
  build: {
    minify: true,
    target: 'esnext',
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [react(), tailwindcss()],
});
