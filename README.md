# rollup-plugin-stats

[![](https://img.shields.io/npm/v/rollup-plugin-stats.svg)](https://www.npmjs.com/package/rollup-plugin-stats)
![](https://img.shields.io/node/v/rollup-plugin-stats.svg)
[![Socket Badge](https://socket.dev/api/badge/npm/package/rollup-plugin-stats)](https://socket.dev/npm/package/rollup-plugin-stats)
[![ci](https://github.com/relative-ci/rollup-plugin-stats/actions/workflows/ci.yml/badge.svg)](https://github.com/relative-ci/rollup-plugin-stats/actions/workflows/ci.yml)

Output Rollup stats JSON file

## Install

```shell
npm install --dev rollup-plugin-stats
```

or

```shell
yarn add --dev rollup-plugin-stats
```

## Configure

### Rollup

```js
// rollup.config.mjs
import { defineConfig } from 'rollup';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  // your rollup config
  plugins: [
    // add it as the last plugin
    stats(),
  ],
});
```

```js
// rollup.config.js
const { defineConfig } = require('rollup');
const stats = require('rollup-plugin-stats');

module.exports = defineConfig({
  // your rollup config
  plugins: [
    // add it as the last plugin
    stats(),
  ],
});
```

### Rolldown

```js
// rolldown.config.js
import { defineConfig } from 'rolldown';
import stats from 'rollup-plugin-stats';

export default defineConfig({
  // your rolldown config
  plugins: [
    // add it as the last plugin
    stats(),
],
});
```

### Options

- `fileName` - the JSON filepath relative to the build folder or absolute(default: `stats.json`)
- `write` - format and write the stats to disk(default: `fs.write(filename, JSON.stringify(stats, null, 2))`)
- `stats` 
    - `source` - output asset/chunk/module source (default `false`)
    - `excludeAssets` - exclude matching assets: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`
    - `excludeModules` - exclude matching modules: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`

## Related projects

### [rollup-plugin-webpack-stats](https://github.com/relative-ci/rollup-plugin-webpack-stats)

Generate rollup stats JSON file with a [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli) webpack [supported structure](https://github.com/relative-ci/bundle-stats/blob/master/packages/plugin-webpack-filter/src/index.ts).

### [bundle-stats](https://github.com/relative-ci/bundle-stats)

Analyze webpack stats(bundle size, assets, modules, packages) and compare the results between different builds. Support for webpack, rspack, vite, rollup.

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=rollup-plugin-stats)

#### Optimize your web app's performance with automated bundle stats analysis and monitoring.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: [Rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=rollup-plugin-stats), or get notified via [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=rollup-plugin-stats), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=rollup-plugin-stats) and [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=rollup-plugin-stats)
- :wrench: Support for **webpack** and beta support for **Vite**/**Rollup**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: **Always free** for **Open Source**

