---
title: svgattr
---

[![Run-time plugin](https://img.shields.io/badge/Type-run--time-lime.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-svgattr.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-svgattr)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-svgattr](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-svgattr.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-svgattr)

The **svgattr** plugin takes an object of key-value pairs and adds them to the SVG tag on render.

It uses the [`preRender`](/plugins#preRender) hook to do so.

## Installation

```bash
npm install @freesewing/plugin-svgattr
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import Aaron from "@freesewing/aaron";
import i18n from "@freesewing/plugin-i18n";
import translations from "@freesewing/i18n";

const myAaron = new Aaron()
  .use(i18nPlugin, { class: "freesewing draft" });
```

You should pass a second argument which holds key-value pairs of the attributes you want to add to the SVG tag.


