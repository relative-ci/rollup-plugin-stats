import { defineConfig } from 'vite';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  build: {
    outDir: 'dist-mjs',
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
