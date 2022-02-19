---
title: "@freesewing/plugin-bartack"
---

The **@freesewing/plugin-bartack** plugin provides
[the bartack macro](/reference/api/macros/bartack).
This macro allows you to add bartacks — a set of
tight zig-zag stitches used to enforce a seam — to your design.

## Example

<Example part="plugin_bartack">Example of the bartack macro provided by this plugin</Example>

## Installation

```sh
npm install @freesewing/plugin-bartack
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import bartack from "@freesewing/plugin-bartack";
import config from "../config";

const Pattern = new freesewing.Design(config, bartack);
```

Now you can use the
[bartack](/reference/api/macros/bartack/),
[bartackAlong](/reference/api/macros/bartackalong/), and
[bartackFractionAlong](/reference/api/macros/bartackfractionalong/) macros in your parts.
