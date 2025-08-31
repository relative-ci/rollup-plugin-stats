/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('rollup');
const stats = require('rollup-plugin-stats');

module.exports = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist-cjs',
  },
  plugins: [stats({})],
});
