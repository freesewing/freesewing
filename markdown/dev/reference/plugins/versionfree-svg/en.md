---
title: plugin-versionfree-svg
---

Published as [@freesewing/plugin-versionfree-svg][1], this plugin suppresses
the inclusion of the FreeSewing version number in SVG output.
This allows you to more easily check for differences in the
output of different pattern versions of the same design.
Without the plugin, false positives could be seen simply due to
differing FreeSewing version numbers.

## Installation

```sh
npm install @freesewing/plugin-versionfree-svg
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { versionfreeSvgPlugin } from '@freesewing/plugin-versionfree-svg'
// or
import { pluginVersionfreeSvg } from '@freesewing/plugin-versionfree-svg'
```

[1]: https://www.npmjs.com/package/@freesewing/plugin-versionfree-svg
