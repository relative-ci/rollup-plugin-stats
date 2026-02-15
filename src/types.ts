import type {
  Plugin as RollupPlugin,
  OutputOptions as RollupOutputOptions,
  OutputBundle as RollupOutputBundle,
} from 'rollup';
import type { Plugin as VitePlugin } from 'vite';

export type Plugin = VitePlugin & RollupPlugin;
export type OutputOptions = RollupOutputOptions;
export type OutputBundle = RollupOutputBundle;
