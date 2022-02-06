---
title: "@freesewing/plugin-flip"
---

The **@freesewing/plugin-flip** plugin provides [the flip 
macro](/reference/apis/macros/flip/) which flips (mirrors) 
an entire part vertically around the Y-axis.
It's typically used to create a right and left pattern part from 
the same basis.

## Installation

```bash
npm install @freesewing/plugin-flip
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import flip from "@freesewing/plugin-flip";
import config from "../config";

const Pattern = new freesewing.Design(config, flip);
```

Now you can use [the flip macro](/reference/api/macros/flip) in your parts.
