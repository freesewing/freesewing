---
title: plugin-logo
---

Published as [@freesewing/plugin-logo][1], this plugin provides [the logo
macro](/reference/macros/logo) which adds FreeSewing's logo to your
design.

## Installation

```sh
npm install @freesewing/plugin-logo
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { logoPlugin } from '@freesewing/plugin-logo'
// or
import { pluginLogo } from '@freesewing/plugin-logo'
```

## Notes

The logo plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-logo
