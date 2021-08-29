---
title: bundle
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-bundle.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-bundle)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-bundle](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-bundle.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-bundle)


The bundle plugin bundles the most common FreeSewing build-time plugins:

 1. [plugin-cutonfold](/reference/plugins/cutonfold) : Add cut-on-fold indicators to your patterns 
 2. [plugin-dimension](/reference/plugins/dimension) : Add dimensions to your (paperless) patterns 
 3. [plugin-grainline](/reference/plugins/grainline) : Add grainline indicators to your patterns 
 4. [plugin-logo](/reference/plugins/logo) : Add a scalebox to your patterns
 5. [plugin-scalebox](/reference/plugins/scalebox) : Add pretty titles to your pattern parts 
 6. [plugin-title](/reference/plugins/title) : Add pretty titles to your pattern parts 
 7. [plugin-round](/reference/plugins/round) : Rounds corners
 8. [plugin-sprinkle](/reference/plugins/sprinkle) : Add multiple snippets to your pattern

Almost all patterns use these plugins, so it made sense to bundle them.

## Installation

```bash
npm install @freesewing/plugin-bundle
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";

const Pattern = new freesewing.Design(config, plugins);
```

