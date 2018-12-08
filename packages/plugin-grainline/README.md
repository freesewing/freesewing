<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-grainline"><img src="https://badgen.net/travis/freesewing/plugin-grainline/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-grainline"><img src="https://badgen.net/npm/v/@freesewing/plugin-grainline" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-grainline"><img src="https://badgen.net/npm/license/@freesewing/plugin-grainline" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-grainline"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-grainline/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3254&bid=27564"><img src="https://deepscan.io/api/projects/3254/branches/27564/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>


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
