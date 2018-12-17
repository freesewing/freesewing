<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-i18n"><img src="https://badgen.net/travis/freesewing/plugin-i18n/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-i18n"><img src="https://badgen.net/npm/v/@freesewing/plugin-i18n" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-i18n"><img src="https://badgen.net/npm/license/@freesewing/plugin-i18n" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-i18n"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-i18n/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3254&bid=27564"><img src="https://deepscan.io/api/projects/3254/branches/27564/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>


# plugin-i18n

A freesewing plugin to provide translation to your patterns.

## Install

On node.js:

```sh
npm install @freesewing/plugin-i18n
```

in the browser, simply include the plugin from unpkg:

```html
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-i18n"></script>
```
This plugin will register as `freesewing.plugins.i18n`.

## Loading this plugin and providing translation data

This plugin does not come with translations. You should provide the translations
when registering the plugin.

Perhaps you want to use your own translations, or you can use ours from the
[@freesewing/i18n](https://www.npmjs.com/package/@freesewing/i18n) package.
Note that if you use ours, you only need to add the `plugin` export:

```js
import brian from '@freesewing/brian';
import i18nPlugin from '@freesewing/plugin-grainline';
import { plugin } from '@freesewing/i18n';

const pattern = new Brian().with(i18nPlugin, {
  prefix: "plugin.",
  strings: plugin
});
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
