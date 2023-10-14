---
title: Svg.asRenderProps()
---

The `Svg.asRenderProps()` method will return the data stored in the
svg as a serializable Javascript object. This method is typically
not invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/core/pattern/getrenderprops).

## Signature

```js
Object svg.asRenderProps()
```

## Returned object properties

This returns Javascript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `attributes` | The result of [Path.attributes.asRenderProps()](/reference/api/attribute/asrenderprops) |
| `layout` | A plain object describing the layout of the SVG |
| `body` | A string holding the SVG body |
| `style` | A string holding the SVG style |
| `defs` | A string holding the SVG defs |

