---
title: flip
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-flip.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-flip)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-flip](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-flip.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-flip)

The **flip** plugin provides [the flip macro](/reference/macros/flip/) which flips (mirrors) an entire part vertically around the Y-axis.

```js
let { macro } = part.shorthand();

macro("flip");
```

## Installation

```bash
npm install @freesewing/plugin-flip
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import flip from "@freesewing/plugin-flip";
import config from "../config";

const Pattern = new freesewing.Design(config, flip);
```

Now you can use [the flip macro](/reference/macros/flip) in your parts.
