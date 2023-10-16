
# Plugins

 1)  [plugin-cutonfold](https://github.com/freesewing/plugin-cutonfold) : Add cut-on-fold indicators to your patterns 
 2)  [plugin-dimension](https://github.com/freesewing/plugin-dimension) : Add dimensions to your (paperless) patterns 
 3)  [plugin-grainline](https://github.com/freesewing/plugin-grainline) : Add grainline indicators to your patterns 
 4)  [plugin-logo](https://github.com/freesewing/plugin-logo) : Add a scalebox to your patterns
 5)  [plugin-scalebox](https://github.com/freesewing/plugin-scalebox) : Add pretty titles to your pattern parts 
 6)  [plugin-title](https://github.com/freesewing/plugin-title) : Add pretty titles to your pattern parts 
 7)  [plugin-round](https://github.com/freesewing/plugin-title) : Rounds corners
 8)  [plugin-sprinkle](https://github.com/freesewing/plugin-sprinkle) : Add multiple snippets to your pattern

Note that these are all **build-time plugins**. In other words, plugins used by developers/pattern designers,
rather than run-time plugins that are used when generating patterns.

Without exception, all freesewing patterns use all these plugins, so it made sense to bundle them.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'

let pattern = new freesewing.Pattern().with(plugins);
```
