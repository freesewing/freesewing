---
title: preRender
---

The `preRender` lifecycle hook is triggered just before your pattern is
rendered to SVG.

## Signature

```js
null hook(Svg svg)
```

## Notes

The `preRender` hook is typically used to change the result of the render, for
example by adding CSS to the SVG output.

Like the `postRender` hook, it receives [the SVG object](/api/svg) as its first
parameter.
