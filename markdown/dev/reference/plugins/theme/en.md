---
title: plugin-theme
---

Published as [@freesewing/plugin-theme][1], this plugin provides CSS for
your SVG document when rendering to SVG.

## Installation

```sh
npm install @freesewing/plugin-theme
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

## Notes

This plugin will inject CSS in the SVG document when rendering to SVG.

If you use other ways to render your pattern (using `Pattern.getRenderProps()`)
you will need to apply your own styles.

The theme plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-theme

