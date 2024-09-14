---
title: Path.asRenderProps()
---

The `Path.asRenderProps()` method will return the data stored in the
path as a serializable JavaScript object. This method is typically
not invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/api/pattern/getrenderprops).

## Signature

```js
Object path.asRenderProps()
```

## Returned object properties

This returns JavaScript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `attributes` | The result of [Path.attributes.asRenderProps()](/reference/api/attributes/asrenderprops) |
| `hidden` | A boolean indicating whether the path is hidden or not |
| `name` | The path name |
| `ops` | An array of drawing operations |
| `height` | A number indicating the path height in `mm` |
| `width` | A number indicating the path width in `mm` |
| `topLeft` | The [Point](/reference/api/point) at the top left of the part, or rather its [`Point.asRenderProps()`](/reference/api/point/asrenderprops) result |
| `bottomRight` | The [Point](/reference/api/point) at the bottom right of the part, or rather its [`Point.asRenderProps()`](/reference/api/point/asrenderprops) result |
| `d` | The path's pathstring for rendering as SVG |

