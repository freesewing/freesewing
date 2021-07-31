---
title: logo
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-logo.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-logo)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-logo](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-logo.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-logo)

The **logo** plugin provides [the logo snippet](/reference/snippets/):

<Example part="plugin_logo" caption="An example of the logo snippet" design={false} />

```js
let { Point, snippets, Snippet } = part.shorthand();

snippets.logo = new Snippet("logo", new Point(50, 30));
```

<Tip>

The logo plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-logo
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import logo from "@freesewing/plugin-logo";
import config from "../config";

const Pattern = new freesewing.Design(config, logo);
```

