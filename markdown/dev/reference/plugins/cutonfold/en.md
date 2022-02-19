---
title: "@freesewing/plugin-cutonfold"
---

The **@freesewing/plugin-cutonfold** plugin provides
[the cutonfold macro](/reference/api/macros/cutonfold) which adds a cut-on-fold
indicator to your design.

<Example part="plugin_cutonfold">

An example of the cutonfold macro

</Example>

<Tip>

The cutonfold plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-cutonfold
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import cutonfold from "@freesewing/plugin-cutonfold";
import config from "../config";

const Pattern = new freesewing.Design(config, cutonfold);
```

Now you can use [the cutonfold macro](/reference/api/macros/cutonfold/) in your parts.
