---
title: dimension
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-dimension.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-dimension)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-dimension](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-dimension.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-dimension)

The **dimension** plugin provides the following [macros](/plugins#macros):

 - [hd](/reference/macros/hd/) : Adds a horizontal dimension
 - [vd](/reference/macros/vd/) : Adds a vertical dimension
 - [ld](/reference/macros/ld/) : Adds a linear dimension
 - [pd](/reference/macros/pd/) : Adds a dimension along a path
 - [rmd](/reference/macros/rmd/) : Removes a dimension
 - [rmad](/reference/macros/rmad/) : Removes all dimensions with a default prefix

<Example part="plugin_dimension" caption="An example of the different dimensinon macros" design={false} />

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(0, 0);
points.B = new Point(0, 100);
points.C = new Point(50, 100);
points.D = new Point(100, 50);
points.DCp1 = new Point(100, 0);

paths.box = new Path()
  .move(points.A)
  .line(points.B)
  .line(points.C)
  .line(points.D)
  .curve(points.DCp1, points.A, points.A)
  .close();

macro("vd", {
  from: points.A,
  to: points.B,
  x: points.A.x - 15
});

macro("hd", {
  from: points.B,
  to: points.C,
  y: points.B.y + 15
});

macro("ld", {
  from: points.C,
  to: points.D,
  d: -15
});

macro("ld", {
  from: points.C,
  to: points.D,
  d: -30,
  text: "Custom text"
});

macro("pd", {
  path: new Path().move(points.A).curve(points.A, points.DCp1, points.D),
  d: -15
});
```

<Tip>

The dimension plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-dimension
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import dimension from "@freesewing/plugin-dimension";
import config from "../config";

const Pattern = new freesewing.Design(config, dimension);
```

Now you can use the following macros in your parts:

 - [hd](/reference/macros/hd/)
 - [vd](/reference/macros/vd/)
 - [ld](/reference/macros/ld/)
 - [pd](/reference/macros/pd/)
