<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-validate"><img src="https://badgen.net/travis/freesewing/plugin-validate/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-validate"><img src="https://badgen.net/npm/v/@freesewing/plugin-validate" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-validate"><img src="https://badgen.net/npm/license/@freesewing/plugin-validate" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-validate"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-validate/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3286&bid=28006"><img src="https://deepscan.io/api/projects/3286/branches/28006/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-validate

A freesewing plugin that validates your pattern and input. It will check for:

 - Missing measurements that are required by the pattern
 - Missing X or Y coordinates in points
 - Points that aren't points or don't have proper attributes
 - Paths that don't do anything (no ops)
 - Paths that use points that aren't valid points
 - Text that will cause problems for translation

On any of these, this plugin will throw an error.
As such, it's not meant to be used in production, but rather during pattern
development, to spot issues in your code.

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

## License: MIT

See [the license file](https://github.com/freesewing/plugin-validate/blob/master/LICENSE)
for details.
