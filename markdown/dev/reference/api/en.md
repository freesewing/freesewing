---
title: Core API
---

This is the documentation for FreeSewing's core library, published as `@freesewing/core` on NPM.
It's a complete toolbox for parametric design with a primary focus on
sewing patterns, but can be utilized for a variety of similar 2D design tasks.

<Tip>

##### Looking to get started?

You are currently browsing the reference documentation. 
Please refer to our [tutorials](/tutorials) to get started.

</Tip>

## Core API Documentation

<ReadMore recurse />

## Named exports

In general, software published under the FreeSewing namespaces prefers named 
exports over default exports, and the `@freesewing/core` package provides several of them.
I have grouped them below in different categories:

- [Constructors](#constructors)
- [Constants](#constants)
- [Utilities](#utilities)

### Constructors

| Named export | Description |
| ------------ | ------------|
| `Attributes` | The [Attributes](/reference/api/attributes) constructor |
| `Design`     | The [Design](/reference/api/design) constructor |
| `Pattern`    | The [Pattern](/reference/api/pattern) constructor |
| `Point`      | The [Point](/reference/api/point) constructor |
| `Path`       | The [Path](/reference/api/path) constructor |
| `Part`       | The [Part](/reference/api/part) constructor |
| `Snippet`    | The [Snippet](/reference/api/snippet) constructor |
| `Store`      | The [Store](/reference/api/store) constructor |

### Constants

| Named export   | Description |
| -------------- | ------------|
| `cbqc`         | The Cubic Bezier Quarter Circle constant: `0.55191502449351` FIXME: include link |
| `hidePresets`  | Presets you can use to [configure your part `hide` option](/reference/api/part/config/hide). |
| `goldenRatio`  | The golden ratio constant: `1.618034` FIXME: include link |
| `version`      | The version of `@freesewing/core` |


### Utilities

| Named export | Description |
| ------------ | ------------|
| `beamIntersectsCircle`    | See the [beamIntersectsCircle](/reference/api/utils/beamintersectscircle) documentation |
| `beamIntersectsCurve`     | See the [beamIntersectsCurve](/reference/api/utils/beamintersectscurve) documentation |
| `beamIntersectsX`         | See the [beamIntersectsX](/reference/api/utils/beamintersectsx) documentation |
| `beamIntersectsY`         | See the [beamIntersectsY](/reference/api/utils//beamintersectsy) documentation |
| `beamsIntersect`          | See the [beamsIntersect](/reference/api/utils/beamsintersect) documentation |
| `Bezier`                  | A re-export of [the bezier-js dependency](https://www.npmjs.com/package/bezier-js) |
| `capitalize`              | See the [capitalize](/reference/api/utils/capitalize) documentation |
| `circlesIntersect`        | See the [circlesIntersect](/reference/api/utils/circlesintersect) documentation |
| `curveEdge`               | See the [curveEdge](/reference/api/utils/curveedge) documentation |
| `curveIntersectsX`        | See the [curveIntersectsX](/reference/api/utils/curveintersectsx) documentation |
| `curveIntersectsY`        | See the [curveIntersectsY](/reference/api/utils/curveintersectsy) documentation |
| `curvesIntersect`         | See the [curvesIntersect](/reference/api/utils/curvesintersect) documentation |
| `deg2rad`                 | See the [deg2rad](/reference/api/utils/deg2rad) documentation |
| `generateStackTransform`  | See the [generateStackTransform](/reference/api/utils/generatestacktransform) documentation |
| `getTransformedBounds`    | See the [getTransformedBounds](/reference/api/utils/gettransformedbounds) documentation |
| `lineIntersectsCircle`    | See the [lineIntersectsCircle](/reference/api/utils/lineintersectscircle) documentation |
| `lineIntersectsCurve`     | See the [lineIntersectsCurve](/reference/api/utils/lineintersectscurve) documentation |
| `linesIntersect`          | See the [linesIntersect](/reference/api/utils/linesintersect) documentation |
| `mergeIi18n`              | See the [mergeI18n](/reference/api/utils/mergei18n) documentation |
| `mergeOptions`            | See the [mergeOptions](/reference/api/utils/mergeoptions) documentation |
| `pctBasedOn`              | See the [pctBasedOn](/reference/api/utils/pctbasedon) documentation |
| `pointOnBeam`             | See the [pointOnBeam](/reference/api/utils/pointonbeam) documentation |
| `pointOnCurve`            | See the [pointOnCurve](/reference/api/utils/pointoncurve) documentation |
| `pointOnLine`             | See the [pointOnLine](/reference/api/utils/pointonline) documentation |
| `rad2deg`                 | See the [rad2deg](/reference/api/utils/rad2deg) documentation |
| `round`                   | See the [round](/reference/api/utils/round) documentation |
| `splitCurve`              | See the [splitCurve](/reference/api/utils/splitcurve) documentation |
| `stretchToScale`          | See the [stretchToScale](/reference/api/utils/stretchtoscale) documentation |
| `units`                   | See the [units](/reference/api/utils/units) documentation |

