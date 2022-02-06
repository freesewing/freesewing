---
title: "@freesewing/plugin-sprinkle"
---

The **@freesewing/plugin-sprinkle** plugin provides [the 
sprinkle macro](/reference/api/macros/sprinkle/) which is a faster way
to add several of the same snippets to your designs (think of it as
*sprinkling* them onto your parts).

<Example part="plugin_sprinkle">An example of the sprinkle macro</Example>

<Tip>

The sprinkle plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-sprinkle
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import sprinkle from "@freesewing/plugin-sprinkle";
import config from "../config";

const Pattern = new freesewing.Design(config, sprinkle);
```

Now you can use the [sprinkle](/reference/api/macros/sprinkle) macro in your parts.
