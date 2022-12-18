---
title: plugin-dimension
---

Published as [@freesewing/plugin-dimension][1], this plugin provides the
following macros:

- [hd](/reference/macros/hd) : Adds a horizontal dimension
- [vd](/reference/macros/vd) : Adds a vertical dimension
- [ld](/reference/macros/ld) : Adds a linear dimension
- [pd](/reference/macros/pd) : Adds a dimension along a path
- [rmd](/reference/macros/rmd) : Removes a dimension
- [rmad](/reference/macros/rmad) : Removes all dimensions with a default prefix

## Installation

```sh
npm install @freesewing/plugin-dimension
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { dimensionPlugin } from '@freesewing/plugin-dimension'
// or
import { pluginDimension } from '@freesewing/plugin-dimension'
```

## Notes

The dimension plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-dimension
