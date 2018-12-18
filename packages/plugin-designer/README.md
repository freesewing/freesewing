<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-designer"><img src="https://badgen.net/travis/freesewing/plugin-designer/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-designer"><img src="https://badgen.net/npm/v/@freesewing/plugin-designer" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-designer"><img src="https://badgen.net/npm/license/@freesewing/plugin-designer" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-designer"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-designer/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&tid=2114&pid=3256&bid=27566"><img src="https://deepscan.io/api/teams/2114/projects/3256/branches/27566/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-designer

A freesewing plugin to facilitate pattern design.

This plugin will add markers to your pattern for all points, it will illustrate
Bezier curve handlers, and inject JavaScript
to log information about points to the browser console when your hover over them.

In addition, it will log the entire pattern object to the console so you can inspect it.

If you want to design patterns, you may want to use this plugin while doing so.

## Install

On node.js:

```sh
npm install @freesewing/plugin-designer
```

in the browser, simply include this script:

```html
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-designer"></script>
```

## Loading this plugin

To load this plugin, add it to your instantiated pattern.

On node.js:

```js
import pattern from "@freesewing/pattern-brian"
import designer from "@freesewing/plugin-designer"

pattern.with(designer);
```

In the browser, this plugin will register as `freesewing.plugins.designer`.

Since it's a run-time plugin, you need to load it into your pattern:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/plugin-designer"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian
  .with(freesewing.plugins.cutonfold);
</script>
```

## Example

Below is a screenshot of a part of the pattern and the browser console.

You can see the extra markers on the pattern, and the info in the console.

![Example of the designer plugin](https://github.com/freesewing/plugin-designer/raw/master/img/example.png)

### Parameters

 - `to`: A point object at the start of the cut-on-fold indicator
 - `from`: A point object at the end of the cut-on-fold indicator
        
As all freesewing macros, bundle these parameters into a single object.

## Build

To build this plugin, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-designer/blob/master/LICENSE)
for details.
