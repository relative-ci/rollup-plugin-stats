import { describe, test, expect } from 'vitest';
import deepFreeze from 'deep-freeze-strict';

import extract from '../../src/extract';
import * as rollupStats from './fixtures/rollup-stats';

describe('extract', () => {
  test('should extract rollup stats', () => {
    expect(extract(deepFreeze(rollupStats.stats))).toMatchSnapshot();
  });

  test('should extract rollup stats with sources', () => {
    expect(extract(deepFreeze(rollupStats.stats), { source: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with maps', () => {
    expect(extract(deepFreeze(rollupStats.stats), { map: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded assets', () => {
    expect(extract(deepFreeze(rollupStats.stats), { excludeAssets : /vendors/ })).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded modules', () => {
    expect(extract(deepFreeze(rollupStats.stats), { excludeModules : /utils.js/ })).toMatchSnapshot();
  });
});
