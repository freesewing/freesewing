---
title: Svg.defs
---

The `Svg.defs` property holds a string that will be rendered as [the defs
section](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs) of the
SVG document.

## Signature

```svg
<defs>
  /* svg.defs will be inserted */
</defs>
```

## Notes

The defs attribute is where plugins will add additional snippets.

When adding your own defs, it's important not to
overwrite this property, but rather add your own.

In other words, do this:

```js
svg.defs += myDefs
```

and don't do this:

```js
svg.defs = myDefs
```
