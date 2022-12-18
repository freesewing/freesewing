---
title: plugin-banner
---

Published as [@freesewing/plugin-banner][1], this plugin provides [the banner
macro](/reference/macros/banner) which allows you to add repeating text
along a path.

## Installation

```sh
npm install @freesewing/plugin-banner
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { bannerPlugin } from '@freesewing/plugin-banner'
// or
import { pluginBanner } from '@freesewing/plugin-banner'
```

## Notes

The banner plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-banner
