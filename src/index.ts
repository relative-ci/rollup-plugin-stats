import path from 'node:path';
import process from 'node:process';

import extractRollupStats, { type StatsOptions } from './extract';
import { type RollupStatsWrite, rollupStatsWrite } from './write';
import { formatFileSize } from './utils/format-file-size';
import type { Plugin, OutputOptions } from './types';

const PLUGIN_NAME = 'rollupStats';
const DEFAULT_FILE_NAME = 'stats.json';

export type RollupStatsOptions = {
  /**
   * Output filename relative to Rollup output directory or absolute
   * @default: stats.json
   */
  fileName?: string;
  /**
   * Rollup stats options
   */
  stats?: StatsOptions;
  /**
   * Custom file writer
   * @default - fs.write(FILENAME, JSON.stringify(STATS, null, 2));
   */
  write?: RollupStatsWrite;
};

type RollupStatsOptionsOrOutputOptions =
  | RollupStatsOptions
  | ((outputOptions: OutputOptions) => RollupStatsOptions);

function rollupStats(options: RollupStatsOptionsOrOutputOptions = {}): Plugin {
  return {
    name: PLUGIN_NAME,
    async generateBundle(context, bundle) {
      const resolvedOptions =
        typeof options === 'function' ? options(context) : options;
      const {
        fileName,
        stats: statsOptions,
        write = rollupStatsWrite,
      } = resolvedOptions || {};

      const resolvedFileName = fileName || DEFAULT_FILE_NAME;
      const filepath = path.isAbsolute(resolvedFileName)
        ? resolvedFileName
        : path.join(context.dir || process.cwd(), resolvedFileName);

      const stats = extractRollupStats(bundle, statsOptions);

      try {
        const res = await write(filepath, stats);
        const outputSize = Buffer.byteLength(res.content, 'utf-8');

        this.info(
          `Stats saved to ${res.filepath} (${formatFileSize(outputSize)})`
        );
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : JSON.stringify(error);

        // Log error, but do not throw to allow the compilation to continue
        this.warn(message);
      }
    },
  } satisfies Plugin;
}

export default rollupStats;
