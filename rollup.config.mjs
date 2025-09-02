import { defineConfig } from 'rollup';

import commonjsPlugin from '@rollup/plugin-commonjs';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import typescriptPlugin from '@rollup/plugin-typescript';

const INPUT = {
  index: './src/index.ts',
  extract: './src/extract.ts',
};

const CONTEXT = './src';
const OUTPUT_DIR = './dist';

export default defineConfig([
  {
    context: CONTEXT,
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'cjs',
      entryFileNames: 'cjs/[name].js',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: CONTEXT,
      interop: 'auto',
    },
    external: /node_modules/,
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.cjs', '.ts', '.json'],
      }),
      commonjsPlugin({
        defaultIsModuleExports: 'auto',
      }),
      typescriptPlugin({
        tsconfig: './tsconfig.cjs.json',
      }),
    ],
  },
  {
    context: CONTEXT,
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'esm',
      entryFileNames: 'esm/[name].js',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: CONTEXT,
      interop: 'auto',
    },
    external: /node_modules/,
    plugins: [
      nodeResolvePlugin({
        extensions: ['.js', '.mjs', '.cjs', '.ts', '.json'],
      }),
      commonjsPlugin(),
      typescriptPlugin({
        tsconfig: './tsconfig.esm.json',
      }),
    ],
  },
]);
