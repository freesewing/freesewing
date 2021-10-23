---
title: sprinkle
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-sprinkle.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-sprinkle)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-sprinkle](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-sprinkle.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-sprinkle)

The **sprinkle** plugin provides [the sprinkle macro](/reference/macros/sprinkle/):

<Example part="plugin_sprinkle" caption="An example of the sprinkle macro" design={false} />

```js
let { Point, points, macro } = part.shorthand();

points.a = new Point(10, 10);
points.b = new Point(20, 15);
points.c = new Point(30, 10);
points.d = new Point(40, 15);
points.e = new Point(50, 10);
points.f = new Point(60, 15);
points.g = new Point(70, 10);
points.h = new Point(80, 15);
points.i = new Point(90, 10);

macro("sprinkle", {
  snippet: "button",
  on: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
});
```

<Tip>

The sprinkle plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-sprinkle
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import sprinkle from "@freesewing/plugin-sprinkle";
import config from "../config";

const Pattern = new freesewing.Design(config, sprinkle);
```

Now you can use [the sprinkle macro](/reference/macros/sprinkle/) in your parts.
