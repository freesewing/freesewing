---
title: plugin-svgattr
---

Published as [@freesewing/plugin-svgattr][1], this plugin takes an object of
key-value pairs and adds them ass attributes to your SVG document on render.

## Installation

```sh
npm install @freesewing/plugin-svgattr
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

## Notes

You should pass a second argument which holds key-value pairs of the attributes
you want to add to the SVG tag.

The svgattr plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-svgattr
