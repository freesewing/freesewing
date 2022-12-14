---
title: plugin-svgattr
---

Published as [@freesewing/plugin-svgattr][1], this plugin takes an object of
key-value pairs and adds them as attributes of the `<svg>` tag
of a pattern's SVG document on render.

## Installation

```sh
npm install @freesewing/plugin-svgattr
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { svgAttrPlugin } from '@freesewing/plugin-svgattr'
// or
import { svgattrPlugin } from '@freesewing/plugin-svgattr'
// or
import { pluginSvgAttr } from '@freesewing/plugin-svgattr'
// or
import { pluginSvgattr } from '@freesewing/plugin-svgattr'
```
<Tip>
For convenience, this plugin is exported
under multiple names with variations of capitalization.
</Tip>

## Notes

To provide the attributes for the `<svg>` tag, you will need to pass a
second argument which holds key-value pairs.
It should be an `Object` structured as such:

```js
{
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  // More key-value pairs can follow...
}
```

[1]: https://www.npmjs.com/package/@freesewing/plugin-svgattr
