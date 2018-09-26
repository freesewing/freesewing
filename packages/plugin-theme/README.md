<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-theme"><img src="https://badgen.net/travis/freesewing/plugin-theme/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-theme"><img src="https://badgen.net/npm/v/@freesewing/plugin-theme" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-theme"><img src="https://badgen.net/npm/license/@freesewing/plugin-theme" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-theme"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-theme/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3270&bid=27577"><img src="https://deepscan.io/api/projects/3270/branches/27577/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-theme

A freesewing plugin that styles your patterns. This plugin also provides the `notch` and `bnotch` snippets.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import theme from '@freesewing/plugin-theme'

pattern.with(theme);
```

In the browser, this plugin will register as `freesewing.plugins.theme`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-theme"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.theme);
</script>
```

## Install

To install, run:

```sh
npm install @freesewing/plugin-theme
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
