---
title: style
---

A string that will be rendered as the style section of the SVG document.

The style attribute is where plugins will add additional snippets.

```svg
<style type="text/css">
  /* svg.style will be inserted */
</style>
```

<Warning>

###### Add, but don't overwrite

When adding your own styles, it's important not to
overwrite this property, but rather add your own.

In other words, do this:

```js
svg.style += myStyles;
```

and don't do this:

```js
svg.style = myStyles;
```

</Warning>
