import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias for src folder
    },
  },

  build: {
    rolldownOptions: {
      external: ['@crosscopy/clipboard'],
    },
  },
});
