import { describe, test, expect } from 'vitest';
import { rollup } from 'rollup';

import rollupConfig from './rollup.config';

describe('package test', () => {
  test('should output bundle stats JSON file when options is an object', async () => {
    const bundle = await rollup(rollupConfig[0]);
    const res = await bundle.generate(rollupConfig[0].output);
    expect(res.output[1]).toMatchObject({
      fileName: 'stats.json',
    });
  });
});
