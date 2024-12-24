import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, test, expect, beforeEach } from 'vitest';
import { rollup } from 'rollup';
import { vol } from 'memfs';

import config, { relativeFileNameConfig, absoluteFileNameConfig } from './rollup.config';

describe('package test', () => {
  beforeEach(() => {
    vol.reset();
  });

  test('should output stats JSON file', async () => {
    const bundle = await rollup(config);
    await bundle.generate(config.output);

    const actual = await fs.readFile(path.join(config.output.dir, 'stats.json'), 'utf8');
    const stats = JSON.parse(actual);
    expect(stats['index.js']).toMatchObject({
      fileName: 'index.js',
    });
  });

  test('should output stats JSON file with custom relative filename', async () => {
    const bundle = await rollup(relativeFileNameConfig);
    await bundle.generate(relativeFileNameConfig.output);

    const actual = await fs.readFile(path.join(relativeFileNameConfig.output.dir, '../artifacts/stats.json'), 'utf8');
    const stats = JSON.parse(actual);

    expect(stats['index.js']).toMatchObject({
      fileName: 'index.js',
    });
  });

  test('should output stats JSON file with custom absolute filename', async () => {
    const bundle = await rollup(absoluteFileNameConfig);
    await bundle.generate(absoluteFileNameConfig.output);

    const actual = await fs.readFile('/tmp/custom-stats.json', 'utf8');
    const stats = JSON.parse(actual);

    expect(stats['index.js']).toMatchObject({
      fileName: 'index.js',
    });
  });
});
