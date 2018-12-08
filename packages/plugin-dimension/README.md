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
