---
title: grainline
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins) &nbsp; [![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-grainline.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-grainline) &nbsp; [![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256) &nbsp; [![Open issues tagged pkg:plugin-grainline](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-grainline.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-grainline)

The **grainline** plugin provides [the grainline macro](/reference/macros/grainline/):

<Example part="plugin_grainline" caption="An example of the grainline macro" design={false} />

```js
let { Point, points, macro } = part.shorthand();

points.grainlineFrom = new Point(10, 10);
points.grainlineTo = new Point(100, 10);

macro("grainline", {
  from: points.grainlineFrom,
  to: points.grainlineTo
});
```

<Tip>

The grainline plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-grainline
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import grainline from "@freesewing/plugin-grainline";
import config from "../config";

const Pattern = new freesewing.Design(config, grainline);
```

Now you can use [the grainline macro](/reference/macros/grainline) in your parts.
