import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 4173,
    watch: {
      // Polling avoids Windows EBUSY failures while image files are copied.
      usePolling: true,
      interval: 1000,
      binaryInterval: 2000,
      // Design exports can create locked temporary files (Windows EBUSY).
      // The app uses imported copies in assets/, not this source directory.
      ignored: ['**/案例封面/**', '**/tmp/**', '**/*.tmp']
    }
  }
});
