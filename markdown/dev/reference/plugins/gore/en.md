---
title: "@freesewing/plugin-gore"
---

The **@freesewing/plugin-gore** plugin provides
[the gore macro](/reference/api/macros/gore).
This macro allows you to generate [gore
segments](https://en.wikipedia.org/wiki/Gore_\(segment\)) —
2D panels to create a sphehrical shape as used in hats for example —
to your design.

You'll be happy to hear that this plugin handles all the
mathematics for you to create a (part-)sphere in your patterns.

## Installation

```sh
npm install @freesewing/plugin-gore
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import gore from "@freesewing/plugin-gore";
import config from "../config";

const Pattern = new freesewing.Design(config, gore);
```

Now you can use the [gore](/reference/api/macros/gore) macro in your parts.
