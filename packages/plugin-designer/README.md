<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-designer

A freesewing plugin to facilitate pattern design.

This plugin will add markers to your pattern for all points, it will illustrate
Bezier curve handlers, and inject JavaScript
to log information about points to the browser console when your hover over them.

In addition, it will log the entire pattern object to the console so you can inspect it.

If you want to design patterns, you may want to use this plugin while doing so.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import theme from '@freesewing/plugin-theme'
import designer from '@freesewing/plugin-designer'

pattern.with(theme).with(designer);
```

In the browser, this plugin will register as `freesewing.plugins.designer`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-theme"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-designer"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.theme)
  .with(freesewing.plugins.designer);
</script>
```

## Example

Below is a screenshot of a part of the pattern and the browser console.

You can see the extra markers on the pattern, and the info in the console.

![Example of the designer plugin](https://github.com/freesewing/plugin-designer/raw/master/img/example.png)

## Install

To install, run:

```sh
npm install @freesewing/plugin-designer
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
