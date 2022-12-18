---
title: plugin-grainline
---

Published as [@freesewing/plugin-grainline][1], this plugin provides [the
grainline macro](/reference/macros/grainline) which adds a _grainline_
indicator to your design.

## Installation

```sh
npm install @freesewing/plugin-grainline
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { grainlinePlugin } from '@freesewing/plugin-grainline'
// or
import { pluginGrainline } from '@freesewing/plugin-grainline'
```

## Notes

The grainline plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-grainline
