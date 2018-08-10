<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-validate

A freesewing plugin that checks whether all required measurements are set prior to drafting your pattern.

If a measurement is missing, this will throw an exception, and tell you which measurement is missing.

## Usage

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import validate from '@freesewing/plugin-validate'

pattern.with(validate);
```

In the browser, this plugin will register as `freesewing.plugins.validate`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-validate"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.validate);
</script>
```

## Install

To install, run:

```sh
npm install @freesewing/plugin-validate
```

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-validate/blob/master/LICENSE)
for details.
