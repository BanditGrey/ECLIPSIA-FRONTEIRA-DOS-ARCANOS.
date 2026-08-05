import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@store': new URL('./src/store', import.meta.url).pathname,
      '@data': new URL('./src/data', import.meta.url).pathname,
      '@services': new URL('./src/services', import.meta.url).pathname,
      '@i18n': new URL('./src/i18n', import.meta.url).pathname,
      '@types': new URL('./src/types', import.meta.url).pathname,
      '@hooks': new URL('./src/hooks', import.meta.url).pathname
    }
  }
});
