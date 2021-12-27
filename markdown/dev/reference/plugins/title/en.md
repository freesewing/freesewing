---
title: "@freesewing/plugin-title"
---

The **@freesewing/plugin-title** plugin provides [the 
title macro](/reference/api/macros/title/) which facilitates adding part titles
to your desings.

<Example part="plugin_title">An example of the title macro</Example>

<Tip>

The title plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-title
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import title from "@freesewing/plugin-title";
import config from "../config";

const Pattern = new freesewing.Design(config, title);
```

Now you can use the [title](/reference/api/macros/title/) macro in your parts.

