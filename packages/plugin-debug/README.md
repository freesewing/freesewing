<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-debug"><img src="https://badgen.net/travis/freesewing/plugin-debug/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-debug"><img src="https://badgen.net/npm/v/@freesewing/plugin-debug" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-debug"><img src="https://badgen.net/npm/license/@freesewing/plugin-debug" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-debug"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-debug/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3255&bid=27565"><img src="https://deepscan.io/api/projects/3255/branches/27565/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-debug

A freesewing plugin to log debug information to the console.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import debug from '@freesewing/plugin-debug'

pattern.with(debug);
```

In the browser, this plugin will register as `freesewing.plugins.debug`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-debug"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.debug);
</script>
```

## Install

To install, run:

```sh
npm install @freesewing/plugin-debug
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
