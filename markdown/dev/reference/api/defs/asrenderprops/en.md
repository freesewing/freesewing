---
title: Defs.asRenderProps()
---

Returns the Defs as render props, suitable for front-end rendering.

## Signature

```js
Object defs.asRenderProps()
```

The object returned by this method will have a `list` property that
holds all the defs, as well as a `asSvg` property that holds the result
of [Defs.render()](/reference/api/defs/render):

```js
{
  list: {
    button: `<g id="button" transform="scale(1)">
  <circle cx="0" cy="0" r="3.4" class="mark"></circle>
  <circle cx="-1" cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1" cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1" cy="1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="-1" cy="1" r="0.5" class="no-stroke fill-mark"></circle>
</g>`,
  buttonhole: `<g id="buttonhole" transform="scale(1)">
  <path class="mark" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z"></path>
</g>`,
  },
  forSvg: `
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
`
}
```
