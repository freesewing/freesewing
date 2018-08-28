<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-theme

A freesewing plugin to provide styles for freesewing. This plugin also provides the `notch` snippet.

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

## Example

This plugin adds the following CSS classes to your SVG file:

![Example of the style provided by this theme](https://github.com/freesewing/plugin-theme/raw/master/img/example.png)

In addition, it adds the `notch` and `bnotch` snippets to your SVG file's defs section.

## Install

To install, run:

```sh
npm install @freesewing/plugin-theme
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
