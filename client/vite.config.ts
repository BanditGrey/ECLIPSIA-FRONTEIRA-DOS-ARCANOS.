import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
