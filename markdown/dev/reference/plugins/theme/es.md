---
title: theme
---

[![Run-time plugin](https://img.shields.io/badge/Type-run--time-lime.svg)](/plugins) &nbsp; [![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-theme.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-theme) &nbsp; [![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256) &nbsp; [![Open issues tagged pkg:plugin-theme](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-theme.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-theme)

The **theme** plugin provides CSS styling for SVG output:

<Example pattern="rendertest" part="test" caption="An example of the styles provided by this plugin" design={false} />

It uses the [`preRender`](/plugins#prerender) hook to do so.

<Note>

This plugin only applies to rendered SVG output. If you use our React component to display
patterns, you should style our component or use our [css-theme](/reference/packages/css-theme) package.

</Note>

## Installation

```bash
npm install @freesewing/plugin-theme
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import Aaron from "@freesewing/aaron";
import theme from "@freesewing/plugin-theme";

const myAaron = new Aaron()
  .use(theme);
```

