---
title: plugin-mirror
---

Published as [@freesewing/plugin-mirror][1], this plugin provides [the mirror
macro](/reference/macros/mirror) which facilitates mirroring a number of
points and/or paths around a given mirror line.

## Installation

```sh
npm install @freesewing/plugin-mirror
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { mirrorPlugin } from '@freesewing/plugin-mirror'
// or
import { pluginMirror } from '@freesewing/plugin-mirror'
```

## Notes

The mirror plugin is part of our [core-plugins bundle](/reference/plugins/core)

[1]: https://www.npmjs.com/package/@freesewing/plugin-mirror
