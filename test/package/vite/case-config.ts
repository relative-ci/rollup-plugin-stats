import { defineConfig } from 'vite';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  output: {
    dir: 'dist',
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  plugins: [stats()],
});
