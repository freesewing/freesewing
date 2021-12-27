---
title: "@freesewing/plugin-scalebox"
---

The **@freesewing/plugin-scalebox** plugin provides [the 
scalebox macro](/reference/api/macros/scalebox/) with facilitates
adding a scalebox to your design, so users can verify that the pattern
is printed at the correct scale.

<Example part="plugin_scalebox">An example of the scalebox</Example>

<Note>

##### FreeSewing branding can be overruled at runtime

This plugin by default includes FreeSewing branding, but you can
override that when calling the scalebox macro in case you want to
generate your own branded designs.

</Note>

<Tip>

The scalebox plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-scalebox
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import scalebox from "@freesewing/plugin-scalebox";
import config from "../config";

const Pattern = new freesewing.Design(config, scalebox);
```

Now you can use the [scalebox](/reference/api/macros/scalebox/) macro in your parts.
