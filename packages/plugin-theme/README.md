<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# plugin-theme

A (default) theme for freesewing. It provides styling and the `notch` snippet.

## Usage

To add your theme, add it to your instantiated pattern.

On node.js:

```js
import pattern from '@freesewing/pattern-brian'
import theme from '@freesewing/plugin-theme'

pattern.with(theme);
```

In the browser, this theme will register as `freesewing.plugins.theme`:

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

This theme implements the following classes:

![Example of the style provided by this theme](https://github.com/freesewing/plugin-theme/raw/master/img/example.png)

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

Copyright (c) 2018 Joost De Cock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
