---
title: plugin-round
---

Published as [@freesewing/plugin-round][1], this plugin provides [the round
macro](/reference/macros/round) which helps you create rounded corners on your
designs.

## Installation

```sh
npm install @freesewing/plugin-round
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

```js
import { roundPlugin } from '@freesewing/plugin-round'
// or
import { pluginRound } from '@freesewing/plugin-round'
```

## Notes

The `round` macro is intended for rounding 90° angles.
It does not support rounding other angles/corners.

The round plugin is part of our [core-plugins bundle](/reference/plugins/core)

[1]: https://www.npmjs.com/package/@freesewing/plugin-round
