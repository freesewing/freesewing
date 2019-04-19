> **Note**: This is part of version 2 of FreeSewing.  
> It is a work in progress, and not ready for prime-time yet
> 
> For all questions, please come say hellp in [our chatroom on Gitter](https://gitter.im/).

<p align="center"><a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a></p>
<p>FreeSewing is a free and open source library for made-to-measure sewing patterns</p>
<p align="center"><a href="https://gitter.im/freesewing/freesewing" title="Chat with us on Gitter"><img src="https://badgen.net/badge/Gitter/Chat%20with%20us/CA0547?icon=gitter" alt="Chat with us on Gitter"/></a><a href="https://twitter.com/freesewing_org" title="Follow @freesewing_org on Twitter"><img src="https://badgen.net/badge/Twitter/@freesewing_org/1DA1F2?icon=twitter" alt="Follow @freesewing_org on Twitter"/></a><a href="https://github.com/freesewing" title="FreeSewing on GitHub"><img src="https://badgen.net/badge/GitHub/freesewing/269F42?icon=github" alt="FreeSewing on GitHub"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://badgen.net/badge/License/MIT/blue" alt="License: MIT"/></a><a href="https://freesewing.org/patrons/join" title="Become a FreeSewing Patron"><img src="https://badgen.net/badge/Become%20a/Patron/purple" alt="Become a FreeSewing Patron"/></a><a href="https://freesewing.org/" title="FreeSewing.org"><img src="https://badgen.net/badge/FreeSewing/.org/3DA639" alt="FreeSewing.org"/></a><a href="https://freesewing.dev/" title="FreeSewing.dev"><img src="https://badgen.net/badge/FreeSewing/.dev/3DA639" alt="FreeSewing.dev"/></a></p>

# @freesewing&#x2F;plugin-dimension

A FreeSewing plugin to add dimensions to your (paperless) pattern

<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/plugin-dimension"><img src="https://badgen.net/travis/freesewing/plugin-dimension/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-dimension"><img src="https://badgen.net/npm/v/@freesewing/plugin-dimension" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/plugin-dimension"><img src="https://badgen.net/npm/license/@freesewing/plugin-dimension" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/plugin-dimension"><img src="https://badgen.net/codecov/c/github/freesewing/plugin-dimension/master" alt="Code coverage"></a>
  <a href="https://deepscan.io/dashboard#view=project&pid=3262&bid=27571"><img src="https://deepscan.io/api/projects/3262/branches/27571/badge/grade.svg" alt="DeepScan grade"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# plugin-dimension

A [freesewing](https://github.com/freesewing/freesewing) 
plugin to add dimensions to your (paperless) patterns.

## Install

Install this plugin from NPM: 

```sh
npm install @freesewing/plugins-dimension --save
```

## Loading the plugin

To load this plugin, add it to your instantiated pattern:

```js
import pattern from '@freesewing/pattern-brian'
import theme from '@freesewing/plugin-theme'
import dimension from '@freesewing/plugin-dimension'

pattern.with(theme).with(dimension);
```

You now have the following macros available:

Name      | Description                                        
----------|-----------------------------------------------------
`hd`      | Adds a horizontal dimension
`vd`      | Adds a vertical dimension 
`ld`      | Adds a linear dimension 
`pd`      | Adds a dimension that follows a path
 
You can use them as such:

```sh
macro('<name>', {<options>});
```

## Parameters

As all freesewing plugins, all options needs to be passed as a single object.

### hd

```js
part.macro('hd', {
  from: points.cbNeck
, to: points.cbHips,
  y: points.cbHips + 15
});
```
 - `from` : A point object 
 - `to` : A point object
 - `y` : The y-value at which to place the dimension

### vd

```js
part.macro('vd', {
  from: points.cbNeck
, to: points.cbHips,
  x: points.cbHips + 15
});
```
 - `from` : A point object 
 - `to` : A point object
 - `x` : The x-value at which to place the dimension

As all freesewing macros, bundle these parameters into a single object.

### ld

```js
part.macro('ld', {
  from: points.cbNeck
, to: points.cbHips,
  d: 15
});
```
 - `from` : A point object 
 - `to` : A point object
 - `d` : The distance by which to offset the dimension from the line between from and to

As all freesewing macros, bundle these parameters into a single object.

### pd

```js
part.macro('pd', {
  path: new path().move(points.cbNeck).curve(points.cbNeckCp1, points.cbNeckCp2,  points.cbHips),
  d: 15
});
```
 - `path` : A path object 
 - `d` : The distance by which to offset the dimension from the path

As all freesewing macros, bundle these parameters into a single object.

## Example

Below is an example of different dimensions.

![Example of the dimension plugin](https://github.com/freesewing/plugin-dimension/raw/master/img/example.png)

## Where to get help

Questions? Stuck? The [freesewing chat room on Gitter](https://gitter.im/freesewing/freesewing)
is the best place to ask for help.


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
