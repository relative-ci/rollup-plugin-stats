import path from 'path';
import { defineConfig } from 'rollup';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  input: path.join(__dirname, 'src/index.js'),
  output: {
    dir: 'dist',
  },
  plugins: [stats()],
});

export const dynamicOptions = defineConfig({
  input: path.join(__dirname, 'src/index.js'),
  output: {
    dir: 'dist',
    format: 'commonjs',
  },
  plugins: [stats((options) => ({
    fileName: `stats.${options.format}.json`,
  }))],
});

export const relativeFileNameConfig = defineConfig({
  input: path.join(__dirname, 'src/index.js'),
  output: {
    dir: 'dist',
  },
  plugins: [
    stats({
      fileName: '../artifacts/stats.json',
    }),
  ],
});

export const absoluteFileNameConfig = defineConfig({
  input: path.join(__dirname, 'src/index.js'),
  output: {
    dir: 'dist',
  },
  plugins: [
    stats({
      fileName: '/tmp/custom-stats.json',
    }),
  ],
});
