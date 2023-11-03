---
title: Defs.render()
---

Renders the added Defs as a string suitable for inclusion in an SVG document `defs` element.

## Signature

```js
String defs.render()
```

This function is called by [svg.render()](/reference/api/svg/render) internally.
Its output will look something like this:

```()
<g id="button" transform="scale(1)">
  <circle cx="0" cy="0" r="3.4" class="mark"></circle>
  <circle cx="-1" cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1" cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1" cy="1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="-1" cy="1" r="0.5" class="no-stroke fill-mark"></circle>
</g>
<g id="buttonhole" transform="scale(1)">
  <path class="mark" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z"></path>
</g>
```
