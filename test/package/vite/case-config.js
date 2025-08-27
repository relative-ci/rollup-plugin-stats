/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('vite');
const stats = require('rollup-plugin-stats');

module.exports = defineConfig({
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
