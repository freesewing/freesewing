---
title: "@freesewing/plugin-logo"
---

The **@freesewing/plugin-logo** plugin provides the FreeSewing logo
as [the logo snippet](/reference/api/snippets/logo).
It's a plugin you most likely want to replace with your own version
if you want to generate patterns with your own branding.

<Example part="plugin_logo">An example of the logo snippet</Example>

<Tip>

The logo plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-logo
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import logo from "@freesewing/plugin-logo";
import config from "../config";

const Pattern = new freesewing.Design(config, logo);
```

You can now use the [logo](/reference/api/snippets/logo) snippet in your parts.
