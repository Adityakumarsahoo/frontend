import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{js,jsx,ts,tsx}',
    }),
  ],
  esbuild: {
    jsx: 'automatic',
    loader: 'jsx',
    include: /src[\\/].*\.(js|jsx)$/,
  },
  server: {
    port: 5171,
    strictPort: false,
    watch: {
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    },
  },
  build: {
    outDir: 'build',
  },
});
