---
title: "@freesewing/plugin-grainline"
---

The **@freesewing/plugin-grainline** plugin provides [the grainline 
macro](/reference/macros/grainline/) which adds a *grainline* indicator
to your design.

<Example part="plugin_grainline">An example of the grainline macro</Example>

<Tip>

The grainline plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-grainline
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import grainline from "@freesewing/plugin-grainline";
import config from "../config";

const Pattern = new freesewing.Design(config, grainline);
```

Now you can use [the grainline macro](/reference/api/macros/grainline) in your parts.
