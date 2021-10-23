---
title: buttons
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-buttons.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-buttons)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-buttons](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-buttons.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-buttons)

The **buttons** plugin provides the following [snippets](/reference/snippets/):

 - `button`
 - `buttonhole`
 - `buttonhole-start`
 - `buttonhole-end`
 - `snap-stud`
 - `snap-socket`

<Example part="plugin_buttons" caption="An example of the button, buttonhole, buttonhole-start, buttonhole-end, snap-stud, and snap-socket snippets" design={false} />

```js
let { Point, snippets, Snippet } = part.shorthand();

snippets.button = new Snippet('button', new Point(40, 10));
snippets.buttonhole = new Snippet('buttonhole', new Point(80, 10));
```

<Tip>

The buttons plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-buttons
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import buttons from "@freesewing/plugin-buttons";
import config from "../config";

const Pattern = new freesewing.Design(config, buttons);
```

