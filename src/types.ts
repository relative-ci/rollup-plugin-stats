/**
 * A generated asset entry in the output bundle (e.g. CSS, images, JSON).
 *
 * @example
 * {
 *   type: 'asset',
 *   fileName: 'assets/logo-CvPeBknE.svg',
 *   names: ['logo'],
 *   originalFileNames: ['src/assets/logo.svg'],
 *   source: '<svg xmlns="http://www.w3.org/2000/svg">...</svg>',
 * }
 */
export type OutputAsset = {
  /** Discriminant literal identifying this entry as an asset. */
  type: 'asset';
  /** All entry names that reference this asset. */
  names: string[];
  /** Original source file names this asset was generated from. */
  originalFileNames: string[];
  /** The asset content as a string (text assets) or a `Uint8Array` (binary assets). */
  source: string | Uint8Array;
  /** The emitted file name of the asset relative to the output directory. */
  fileName: string;
};

/**
 * A generated JavaScript chunk entry in the output bundle.
 *
 * @example
 * {
 *   type: 'chunk',
 *   fileName: 'assets/index-DpgTxXR6.js',
 *   name: 'index',
 *   facadeModuleId: '/project/src/index.ts',
 *   isEntry: true,
 *   isDynamicEntry: false,
 *   exports: ['default'],
 *   imports: ['assets/vendor-CvaBJZ2l.js'],
 *   dynamicImports: ['assets/lazy-Dj3OKb2X.js'],
 *   modules: { '/project/src/index.ts': { renderedLength: 120, ... } },
 *   code: '"use strict";...',
 *   map: null,
 * }
 */
export type OutputChunk = {
  /** Discriminant literal identifying this entry as a JavaScript chunk. */
  type: 'chunk';
  /** Names exported by this chunk. */
  exports: string[];
  /**
   * The module ID of the entry point that this chunk acts as a facade for,
   * or `null` when this chunk is not an entry facade.
   */
  facadeModuleId: string | null;
  /** Whether this chunk is a dynamic entry point (i.e. produced by a dynamic `import()`). */
  isDynamicEntry: boolean;
  /** Whether this chunk is a static entry point declared in the Vite/RollDown/Rollup input options. */
  isEntry: boolean;
  /**
   * The chunk name as used in `chunkFileNames` and `entryFileNames` patterns,
   * without any content hash.
   */
  name: string;
  /** File names of chunks that are dynamically imported by this chunk. */
  dynamicImports: string[];
  /** The emitted file name of the chunk relative to the output directory. */
  fileName: string;
  /** File names of chunks that are statically imported by this chunk. */
  imports: string[];
  /**
   * Per-module render stats for every module included in this chunk,
   * keyed by the module's original file path.
   */
  modules: Record<string, RenderedModule>;
  /** The rendered JavaScript source code of this chunk. */
  code: string;
  /** Source map for this chunk, or `null` when source maps are not enabled. */
  map: SourceMap | null;
};

/**
 * Stats for an individual module included in an output chunk.
 *
 * @example
 * {
 *   code: 'export { add } from "./math.js";',
 *   originalLength: 512,
 *   removedExports: ['subtract'],
 *   renderedExports: ['add'],
 *   renderedLength: 34,
 * }
 */
export type RenderedModule = {
  /**
   * The module code that Vite/Rolldown/Rollup included in the bundle, or `null` when the
   * module was fully tree-shaken.
   */
  readonly code: string | null;
  /** Size of the original module source in bytes, before any transformations. */
  originalLength: number;
  /** Exports removed from this module by tree-shaking. */
  removedExports: string[];
  /** Exports from this module that are retained in the final bundle. */
  renderedExports: string[];
  /** Size of the rendered module code in bytes. */
  renderedLength: number;
};

/**
 * Standard source map v3 object mapping generated code back to original sources.
 *
 * @see https://sourcemaps.info/spec.html
 */
type SourceMap = {
  /** Name of the generated file this source map corresponds to. */
  file: string;
  /** Base64 VLQ-encoded string describing the source mappings. */
  mappings: string;
  /** Original symbol names referenced by the mappings. */
  names: string[];
  /** Paths to the original source files. */
  sources: string[];
  /** Optional inline content of each original source file, parallel to `sources`. */
  sourcesContent?: string[];
  /** Source map specification version — always `3`. */
  version: number;
};

/**
 * The complete output bundle produced by Vite/Rolldown/Rollup — a map from emitted file name
 * to its corresponding asset or chunk descriptor.
 */
export type OutputBundle = Record<string, OutputAsset | OutputChunk>;

/**
 * A subset of resolved output options provided to the `generateBundle` hook by Vite/Rolldown/Rollup,
 *  containing only the fields this plugin uses to generate a stats file for a specific output.
 *
 * @example
 * { dir: 'dist', format: 'es' }
 */
export type OutputOptions = {
  /** Output directory for the generated files. */
  dir?: string | undefined;

  /**
   * Output format.
   *
   * - `'es'` / `'esm'` / `'module'` — ES module
   * - `'cjs'` / `'commonjs'`        — CommonJS
   * - `'iife'`                       — Immediately Invoked Function Expression
   * - `'umd'`                        — Universal Module Definition
   * - `'amd'`                        — Asynchronous Module Definition (Rollup only)
   * - `'system'` / `'systemjs'`      — SystemJS (Rollup only)
   */
  format?:
    | 'es'
    | 'esm'
    | 'module'
    | 'cjs'
    | 'commonjs'
    | 'iife'
    | 'umd'
    | 'amd'
    | 'system'
    | 'systemjs'
    | undefined;
};

/**
 * Subset of the Vite/RollDown/Rollup plugin hook context (`this`) used by this plugin.
 */
type PluginContext = {
  /** Log an informational message through Vite/RollDown/Rollup's logging pipeline. */
  info: (message: string) => void;
  /** Log a warning through bundler's logging pipeline without stopping the build. */
  warn: (message: string) => void;
};

/**
 * Minimum plugin interface compatible with Vite/Rolldown/Rollup.
 *
 * @example
 * {
 *   name: 'rollupStats',
 *   async generateBundle(outputOptions, bundle) { ... },
 * }
 */
export type Plugin = {
  /** Unique identifier for the plugin, used in error messages and logs. */
  name: string;
  /**
   * Hook called after the bundle has been fully generated but before it is
   * written to disk. Receives the resolved output options and the complete
   * output bundle map.
   */
  generateBundle?: (
    this: PluginContext,
    outputOptions: OutputOptions,
    bundle: OutputBundle,
    isWrite: boolean
  ) => void | Promise<void>;
};
