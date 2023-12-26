---
title: plugin-ringsector
---

Published as [@freesewing/plugin-ringsector][1], this plugin facilitates
drafting a ring sector (like a part of a donut).
It is particularly usefor for drafting curved waistband, circle skirts, and so on.

## Provides

- [The ringsector macro](/reference/macros/ringsector)
- [The rmringsector macro](/reference/macros/rmringsector)

## Installation

```sh
npm install @freesewing/plugin-ringsector
```

## Usage

You should [add it as a part plugin](/reference/api/part/config/plugins).
Refer to the documentation of [the provided macros](#provides) for details on how to use them.

To import the plugin for use:
```js
import { plugin as ringsectorPlugin } from '@freesewing/plugin-ringsector'
```

[1]: https://www.npmjs.com/package/@freesewing/plugin-ringsector
