---
title: Point.asRenderProps()
---

The `Point.asRenderProps()` method will return the data stored in the
point as a serializable Javascript object. This method is typically
not invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/core/pattern/getrenderprops).

## Signature

```js
Object point.asRenderProps()
```

## Returned object properties

This returns Javascript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `attributes` | The result of [Path.attributes.asRenderProps()](/reference/api/attribute/asrenderprops) |
| `x` | A number indicating the X-Coordinate of the point |
| `y` | A number indicating the Y-Coordinate of the point |
