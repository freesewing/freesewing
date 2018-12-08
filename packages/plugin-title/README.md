<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-title"><img src="https://badgen.net/travis/freesewing/plugin-title/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-title"><img src="https://badgen.net/npm/v/@freesewing/plugin-title" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-title"><img src="https://badgen.net/npm/license/@freesewing/plugin-title" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-title"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-title/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3299&bid=28273"><img src="https://deepscan.io/api/projects/3299/branches/28273/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-title

A freesewing plugin to add pretty part titles to your pattern.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import title from '@freesewing/plugin-theme'
import title from '@freesewing/plugin-title'

pattern..with(theme).with(title);
```

In the browser, this plugin will register as `freesewing.plugins.title`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-theme"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-title"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.theme)
  .with(freesewing.plugins.title);
</script>
```

## Example

This plugin styles a title like this:

![Example of the title inserted by this plugin](https://github.com/freesewing/plugin-title/raw/master/img/example.png)

## Install

To install, run:

```sh
npm install @freesewing/plugin-title
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
