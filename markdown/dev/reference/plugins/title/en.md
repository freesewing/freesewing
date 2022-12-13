---
title: plugin-title
---

Published as [@freesewing/plugin-title][1], this plugin provides [the title
macro](/reference/macros/title) which facilitates adding part titles to
your designs.

## Installation

```sh
npm install @freesewing/plugin-title
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { titlePlugin } from '@freesewing/plugin-title'
// or
import { pluginTitle } from '@freesewing/plugin-title'
```

## Notes

The title plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-title
