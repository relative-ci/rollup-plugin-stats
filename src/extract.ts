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

export type Stats = OutputBundle;

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
      let assetStats = structuredClone(bundleEntryStats) as AssetStats;

      // Skip asset source if options source is false
      if (!source) {
        assetStats = omit(assetStats, ['source']); 
      }

      output[bundleEntryFilepath] = assetStats;

      return;
    }

    if (bundleEntryStats.type === "chunk") {
      let chunkStats = structuredClone(bundleEntryStats) as ChunkStats;

      // Skip chunk source if options source is false
      if (!source) {
        chunkStats = omit(chunkStats, ['code']);
      }

      // Extract chunk modules stats
      const chunkModulesStats: ChunkStats['modules'] = {};

      Object.entries(chunkStats.modules).forEach(([bundleModuleFilepath, bundleModuleStats]) => {
        // Skip module extraction if the filepath matches the exclude modules pattern
        if (checkExcludeFilepath(bundleModuleFilepath, excludeModules)) {
          return;
        }

        let moduleStats = structuredClone(bundleModuleStats) as ModuleStats;

        // Skip module source if options source is false
        if (!source) {
          moduleStats = omit(moduleStats, ['code']);
        }

        chunkModulesStats[bundleModuleFilepath] = moduleStats;
      });

      chunkStats.modules = chunkModulesStats;

      output[bundleEntryFilepath] = chunkStats;

      return;
    }
  });
  
  return output;
}
