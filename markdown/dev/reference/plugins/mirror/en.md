---
title: "@freesewing/plugin-mirror"
---

The **@freesewing/plugin-mirror** plugin provides [the mirror 
macro](/reference/api/macros/mirror) which facilitates mirroring
a number of points and/or paths around a given mirror line.

<Example part="plugin_mirror">Example of the mirror plugin</Example>

## Installation

```bash
npm install @freesewing/plugin-mirror
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import mirror from "@freesewing/plugin-mirror";
import config from "../config";

const Pattern = new freesewing.Design(config, mirror);
```

You can now use the [mirror](/reference/api/macros/mirror) macro in your parts.


