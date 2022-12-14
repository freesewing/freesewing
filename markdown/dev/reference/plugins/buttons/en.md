---
title: plugin-buttons
---

Published as [@freesewing/plugin-buttons][1], this plugin provides the following
[snippets](/reference/snippets):

- [button](/reference/snippets/button)
- [buttonhole](/reference/snippets/buttonhole)
- [buttonhole-start](/reference/snippets/buttonhole-start)
- [buttonhole-end](/reference/snippets/buttonhole-end)
- [snap-stud](/reference/snippets/snap-stud)
- [snap-socket](/reference/snippets/snap-socket)

## Installation

```sh
npm install @freesewing/plugin-buttons
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { buttonsPlugin } from '@freesewing/plugin-buttons'
// or
import { pluginButtons } from '@freesewing/plugin-buttons'
```

## Notes

The buttons plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-buttons
