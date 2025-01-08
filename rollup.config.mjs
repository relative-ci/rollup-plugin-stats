import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const INPUT = {
  index: './src/index.ts',
  extract: './src/extract.ts',
};

const OUTPUT_DIR = 'dist';
const EXTERNAL = ['node:fs/promises', 'node:path', 'node:process'];

export default defineConfig([
  {
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'esm',
      entryFileNames: '[name].mjs',
      sourcemap: true,
    },
    external: EXTERNAL,
    plugins: [typescript()],
  },
  {
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'commonjs',
      exports: 'default',
      entryFileNames: '[name].cjs',
      sourcemap: true,
    },
    external: EXTERNAL,
    plugins: [typescript()],
  },
]);
