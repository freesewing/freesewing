<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-cutonfold

A freesewing plugin to add cut-on-fold indicators to your patterns.

## Install

For node.js, run:

```sh
npm install @freesewing/plugin-cutonfold
```

in the browser, simply include this script:

```html
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-cutonfold"></script>
```

## Loading this plugin

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import cutonfold from '@freesewing/plugin-cutonfold'

pattern.with(cutonfold);
```

In the browser, this plugin will register as `freesewing.plugins.cutonfold`.
Since it's a build-time plugin, it will be loaded by the pattern.

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-cutonfold"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian;
</script>
```

## Usage

This plugin provides the `cutonfold` macro.

> The macro method is available from the `shorthand()` method on an instantiated pattern part.

```js
macro('cutonfold', {
  from: points.cbNeck
  , to: points.cbHips
});
  ```

### Parameters

 - `to`: A point object at the start of the cut-on-fold indicator
 - `from`: A point object at the end of the cut-on-fold indicator
        
As all freesewing macros, bundle these parameters into a single object.

## Example

![Example of the output provided by this plugin](https://github.com/freesewing/plugin-cutonfold/raw/master/img/example.png)


## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.
