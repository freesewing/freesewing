<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

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
