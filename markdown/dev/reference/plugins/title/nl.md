---
title: title
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins) &nbsp; [![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-title.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-title) &nbsp; [![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256) &nbsp; [![Open issues tagged pkg:plugin-title](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-title.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-title)

The **title** plugin provides [the title macro](/reference/macros/title/):

<Example part="plugin_title" caption="An example of the title macro" design={false} />

```js
let { Point, points, macro } = part.shorthand();

points.title = new Point(90, 45);

macro("title", {
  at: points.title,
  nr: 4,
  title: "sleeve"
});
```

<Tip>

The title plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-title
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import title from "@freesewing/plugin-title";
import config from "../config";

const Pattern = new freesewing.Design(config, title);
```

Now you can use [the title macro](/reference/macros/title/) in your parts.

