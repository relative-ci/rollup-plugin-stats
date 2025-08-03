import type { OutputAsset, OutputBundle, OutputChunk, RenderedModule } from 'rollup';
import { omit } from './utils/omit';
import { type ExcludeFilepathPatterns, checkExcludeFilepath } from './utils/check-exclude-filepath';

export type AssetStats = Omit<OutputAsset, 'source'> & {
  source?: OutputAsset['source'];
};

export type ModuleStats = Omit<RenderedModule, 'code'> & {
  code?: RenderedModule['code'] | null;
}

export type ChunkStats = Omit<OutputChunk, 'code' | 'modules'> & {
  code?: OutputChunk['code'];
  modules: Record<string, ModuleStats>;
};

export type Stats = Record<string, AssetStats | ChunkStats>;

export type StatsOptions = {
  /**
   * Output asset/module sources
   * @default false 
   */
  source?: boolean;
  /**
   * Exclude matching assets
   */
  excludeAssets?: ExcludeFilepathPatterns;
  /**
   * Exclude matching modules
   */
  excludeModules?: ExcludeFilepathPatterns;
}

export default function extractRollupStats(bundle: OutputBundle, options: StatsOptions = {}): Stats {
  const { source = false, excludeAssets, excludeModules } = options;

  const output: Stats = {};

  Object.entries(bundle).forEach(([bundleEntryFilepath, bundleEntryStats]) => {
    // Skip extraction if the entry filepath matches the exclude assets pattern
    if (checkExcludeFilepath(bundleEntryFilepath, excludeAssets)) {
      return;
    }

    if (bundleEntryStats.type === "asset") {
      const assteStatsOmitKeys = [];

      // Skip asset source if options.source is false
      if (!source) {
        assteStatsOmitKeys.push('source'); 
      }

      output[bundleEntryFilepath] = shallowCloneStatsObject<AssetStats>(
        bundleEntryStats,
        assteStatsOmitKeys,
      );

      return;
    }

    if (bundleEntryStats.type === "chunk") {
      const chunkStatsOmitKeys = [];

      // Skip chunk source if options.source is false
      if (!source) {
        chunkStatsOmitKeys.push('code');
      }

      const chunkStats = shallowCloneStatsObject<ChunkStats>(bundleEntryStats, chunkStatsOmitKeys);


      // Extract chunk modules stats
      const chunkModulesStats: ChunkStats['modules'] = {};

      Object.entries(chunkStats.modules).forEach(([bundleModuleFilepath, bundleModuleStats]) => {
        // Skip module extraction if the filepath matches the exclude modules pattern
        if (checkExcludeFilepath(bundleModuleFilepath, excludeModules)) {
          return;
        }

        const moduleStatsOmitKeys = [];

        // Skip module source if options.source is false
        if (!source) {
          moduleStatsOmitKeys.push('code');
        }

        chunkModulesStats[bundleModuleFilepath] = shallowCloneStatsObject<ModuleStats>(
          bundleModuleStats,
          moduleStatsOmitKeys,
        );
      });

      chunkStats.modules = chunkModulesStats;

      output[bundleEntryFilepath] = chunkStats;

      return;
    }
  });
  
  return output;
}

/**
 * Shallow clone stats object before any processing to
 * 1. resolve getters
 * 2. prevent changes to the stats object
 *
 * @NOTE structuredClone is not supported by rolldown-vite: https://github.com/vitejs/rolldown-vite/issues/128
 */
function shallowCloneStatsObject<TResult>(data: object, omitKeys: Array<string>) {
  return omit(data, omitKeys) as TResult;
}
