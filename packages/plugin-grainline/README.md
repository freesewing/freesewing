<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-grainline

A freesewing plugin to add grainline indicators to your patterns.

## Install

On node.js:

```sh
npm install @freesewing/plugin-grainline
```

in the browser, simply include this script:

```html
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-grainline"></script>
```

## Loading this plugin

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import grainline from '@freesewing/plugin-grainline'

pattern.with(grainline);
```

In the browser, this plugin will register as `freesewing.plugins.grainline`.
Since it's a build-time plugin, it will be loaded by the pattern.

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-grainline"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian;
</script>
```

## Usage

This plugin provides the `grainline` macro.

> The macro method is available from the `shorthand()` method on an instantiated pattern part.

```js
macro('grainline', {
  from: points.cbNeck
  , to: points.cbHips
});
  ```

### Parameters

 - `to`: A point object at the start of the grainline indicator
 - `from`: A point object at the end of the grainline indicator
        
As all freesewing macros, bundle these parameters into a single object.

## Example

![Example of the output provided by this plugin](https://github.com/freesewing/plugin-grainline/raw/master/img/example.png)


## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
