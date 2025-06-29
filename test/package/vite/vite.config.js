import { defineConfig } from 'vite';
import stats from 'rollup-plugin-stats';

const baseConfig = {
  root: __dirname,
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
};

export default defineConfig({
  ...baseConfig,
  plugins: [stats()],
});

export const relativeFileNameConfig = defineConfig({
  ...baseConfig,
  plugins: [
    stats({
      fileName: '../artifacts/stats-relative-path.json',
    }),
  ],
});

export const absoluteFileNameConfig = defineConfig({
  ...baseConfig,
  plugins: [
    stats({
      fileName: '/tmp/custom-stats.json',
    }),
  ],
});
