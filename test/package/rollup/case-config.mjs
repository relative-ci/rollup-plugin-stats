import { defineConfig } from 'rollup';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [stats({})],
});
