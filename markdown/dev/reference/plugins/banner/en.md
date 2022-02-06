---
title: "@freesewing/plugin-banner"
---

The **@freesewing/plugin-banner** plugin provides 
[the banner macro](/reference/api/macros/banner).
This macro allows you to add repeating text along a path.

## Example

<Example part="plugin_banner">Example of the banner macro provided by this plugin</Example>

## Installation

```sh
npm install @freesewing/plugin-banner
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import banner from "@freesewing/plugin-banner";
import config from "../config";

const Pattern = new freesewing.Design(config, banner);
```

Now you can use the 
[banner](/reference/api/macros/banner/) macros in your parts.


