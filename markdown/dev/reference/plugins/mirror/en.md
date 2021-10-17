---
title: mirror
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-mirror.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-mirror)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-mirror](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-mirror.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-mirror)

The [@freesewing/plugin-mirror](/reference/packages/plugin-mirror) packages provides a plugin to help mirror points and/or paths around a given mirror line.

## Installation

```bash
npm install @freesewing/plugin-mirror
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import mirror from "@freesewing/plugin-mirror";
import config from "../config";

const Pattern = new freesewing.Design(config, mirror);
```

Now you can use [the mirror macro](/reference/macros/mirror) in your parts.


