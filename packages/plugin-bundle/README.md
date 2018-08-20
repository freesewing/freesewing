<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://www.npmjs.com/package/@freesewing/plugin-scalebox"><img src="https://badgen.net/npm/v/@freesewing/plugin-scalebox" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-scalebox"><img src="https://badgen.net/npm/license/@freesewing/plugin-scalebox" alt="License"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-bundle

A freesewing plugin that provides the following plugins in one bundle:


 1)  [plugin-cutonfold](https://github.com/freesewing/plugin-cutonfold) : Add cut-on-fold indicators to your patterns 
 2)  [plugin-dimension](https://github.com/freesewing/plugin-dimension) : Add dimensions to your (paperless) patterns 
 3)  [plugin-grainline](https://github.com/freesewing/plugin-grainline) : Add grainline indicators to your patterns 
 4)  [plugin-logo](https://github.com/freesewing/plugin-logo) : Add our logo to your patterns
 5)  [plugin-title](https://github.com/freesewing/plugin-title) : Add pretty titles to your pattern parts 

Note that these are all **build-time plugins**. In other words, plugins used by developers/pattern designers,
rather than run-time plugins that are used when generating patterns.

Without exception, all freesewing patterns use all these 5 plugins, so it made sense to bundle them.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/brian'
import pluginBundle from '@freesewing/plugin-bundle'

pattern.with(pluginBundle);
```

In the browser, this plugin will register as `freesewing.plugins.bundle`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-bundle"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/brian"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.bundle);
</script>
```

## Install

To install, run:

```sh
npm install @freesewing/plugin-bundle
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
