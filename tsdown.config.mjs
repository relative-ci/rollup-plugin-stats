import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    outDir: 'dist/esm',
    entry: {
      index: './src/index.ts',
      extract: './src/extract.ts',
    },
    format: 'esm',
    hash: false,
    minify: true,
    sourcemap: true,
  },
  {
    outDir: 'dist/cjs',
    entry: {
      index: './src/index.ts',
      extract: './src/extract.ts',
    },
    format: 'cjs',
    hash: false,
    minify: true,
    sourcemap: true,
  },
]);
