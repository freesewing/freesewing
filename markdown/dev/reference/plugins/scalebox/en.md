---
title: plugin-scalebox
---

Published as [@freesewing/plugin-scalebox][1], this plugin provides the
[scalebox](/reference/macros/scalebox) and
[miniscale](/reference/macros/miniscale) macros which add a (mini) scalebox
to your design, so users can verify that the pattern is printed at the correct
scale.

## Installation

```sh
npm install @freesewing/plugin-scalebox
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { scaleboxPlugin } from '@freesewing/plugin-scalebox'
// or
import { pluginScalebox } from '@freesewing/plugin-scalebox'
```

## Notes

This plugin by default includes FreeSewing branding, but you can
override that when calling the `scalebox` macro in case you want to
generate your own branded designs.

The scalebox plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-scalebox
