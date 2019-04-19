> **Note**: This is part of version 2 of FreeSewing.  
> It is a work in progress, and not ready for prime-time yet
> 
> For all questions, please come say hellp in [our chatroom on Gitter](https://gitter.im/).

<p align="center"><a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a></p>
<p>FreeSewing is a free and open source library for made-to-measure sewing patterns</p>
<p align="center"><a href="https://gitter.im/freesewing/freesewing" title="Chat with us on Gitter"><img src="https://badgen.net/badge/Gitter/Chat%20with%20us/CA0547?icon=gitter" alt="Chat with us on Gitter"/></a><a href="https://twitter.com/freesewing_org" title="Follow @freesewing_org on Twitter"><img src="https://badgen.net/badge/Twitter/@freesewing_org/1DA1F2?icon=twitter" alt="Follow @freesewing_org on Twitter"/></a><a href="https://github.com/freesewing" title="FreeSewing on GitHub"><img src="https://badgen.net/badge/GitHub/freesewing/269F42?icon=github" alt="FreeSewing on GitHub"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://badgen.net/badge/License/MIT/blue" alt="License: MIT"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://freesewing.org/" title="FreeSewing.org"><img src="https://badgen.net/badge/FreeSewing/.org/3DA639" alt="FreeSewing.org"/></a><a href="https://freesewing.dev/" title="FreeSewing.dev"><img src="https://badgen.net/badge/FreeSewing/.dev/3DA639" alt="FreeSewing.dev"/></a></p>

# @freesewing&#x2F;plugin-cutonfold

A FreeSewing plugin to add cut-on-fold indicators on your patterns

<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-cutonfold"><img src="https://badgen.net/travis/freesewing/plugin-cutonfold/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-cutonfold"><img src="https://badgen.net/npm/v/@freesewing/plugin-cutonfold" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-cutonfold"><img src="https://badgen.net/npm/license/@freesewing/plugin-cutonfold" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-cutonfold"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-cutonfold/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3254&bid=27564"><img src="https://deepscan.io/api/projects/3254/branches/27564/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-cutonfold

A freesewing plugin to add cut-on-fold indicators to your patterns.

## Install

On node.js:

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
  from: points.cbNeck,
  to: points.cbHips
});
  ```

### Parameters

 - `to`: A point object at the start of the cut-on-fold indicator
 - `from`: A point object at the end of the cut-on-fold indicator
 - `offset`: Distance in mm that the cut-on-fold line is offset from the line between `from` and `to`.  Default: 50mm.
 - `margin`: Percentange the cut-on-fold line will remain from the `from` and `to` points. Default: 5%.
 - `grainline`: Whether this is also the grainline. Default: `false`
        
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


## About FreeSewing

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/en/freesewing) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/en/plugins) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

The [getting started] section on [freesewing.dev](https://freesewing.dev/) is a good
entrypoint to our documentation, but you'll find a lot more there, including
our [API documentation](https://freesewing.dev/en/freesewing/api),
as well as [examples](https://freesewing.dev/en/freesewing/examples),
and [best practices](https://freesewing.dev/en/do).

If you're a maker, checkout [freesewing.org](https://freesewing/) where you can generate
our sewing patterns adapted to your measurements.

## ♥️ Support FreeSewing: Become a patron ♥️

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.org)
 - 💬 Chat: [gitter.im/freesewing](https://gitter.im/freesewing/freesewing)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)
