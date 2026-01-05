import type { OutputBundle } from 'rollup';
import { describe, test, expect } from 'vitest';
import deepFreeze from 'deep-freeze-strict';

import extract from '../../src/extract';
import * as rollupStats from './fixtures/rollup-stats';

describe('extract', () => {
  test('should extract rollup stats', () => {
    expect(extract(deepFreeze(rollupStats.stats as OutputBundle))).toMatchSnapshot();
  });

  test('should extract rollup stats with sources', () => {
    expect(extract(deepFreeze(rollupStats.stats as OutputBundle), { source: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with maps', () => {
    expect(extract(deepFreeze(rollupStats.stats as OutputBundle), { map: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded assets', () => {
    expect(extract(deepFreeze(rollupStats.stats as OutputBundle), { excludeAssets : /vendors/ })).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded modules', () => {
    expect(extract(deepFreeze(rollupStats.stats as OutputBundle), { excludeModules : /utils.js/ })).toMatchSnapshot();
  });
});
