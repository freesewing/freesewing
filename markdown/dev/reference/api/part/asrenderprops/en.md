---
title: Part.asRenderProps()
---


The `Part.asRenderProps()` method will return the data stored in the
part as a serializable Javascript object. This method is typically
not invoked directly but rather called under the hood as a result of
calling [`Pattern.getRenderProps()`](/reference/core/pattern/getrenderprops).

## Signature

```js
Object part.asRenderProps()
```

## Returned object properties

This returns Javascript object has the following properties:

| Name | Description |
| ----:| ----------- |
| `paths` | The part's paths as [Path.asRenderProps()](/reference/api/path/asrenderprops) |
| `points` | The part's points as [Point.asRenderProps()](/reference/api/point/asrenderprops) |
| `snippet` | The part's snippets as [Snippet.asRenderProps()](/reference/api/snippet/asrenderprops) |
| `attributes` | The result of [Part.attributes.asRenderProps()](/reference/api/attribute/asrenderprops) |
| `height` | A number indicating the part height in `mm` |
| `width` | A number indicating the part width in `mm` |
| `topLeft` | The [Point](/reference/api/point) at the top left of the part, or rather its [`Point.asRenderProps()`](/reference/api/point/asrenderprops) result |
| `bottomRight` | The [Point](/reference/api/point) at the bottom right of the part, or rather its [`Point.asRenderProps()`](/reference/api/point/asrenderprops) result |

