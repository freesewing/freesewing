---
title: Snippet.asRenderProps()
---

The `Snippet.asRenderProps()` method will return the data stored in the
snippet as a serializable Javascript object. This method is typically
not invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/core/pattern/getrenderprops).

## Signature

```js
Object snippet.asRenderProps()
```

## Returned object properties

This returns Javascript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `attributes` | The result of [Path.attributes.asRenderProps()](/reference/api/attribute/asrenderprops) |
| `def` | The ID of the snippet's reference in the `defs` section of the SVG (the snippet code) |
| `anchor` | The [Point](/reference/api/point) on which the snippet is anchored, or rather its [`Point.asRenderProps()`](/reference/api/point/asrenderprops) result |

