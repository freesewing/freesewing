---
title: banner
---

The `banner` macro allows you to add repeating text along a path.
It is provided by the [banner plugin](/reference/plugins/banner).

## Signature

```js
macro('banner', {
  Path path,
  String text,
  Number dy=1,
  Number spaces=12,
  Number repeat=10,
})
```
  
## Example

<Example caption="Example of the banner macro">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.from = new Point(0,0)
  points.to = new Point(320,0)
  
  paths.banner = new Path()
    .move(points.from)
    .line(points.to)
    .move(new Point(0,-10)) // Prevent clipping
  
  macro('banner', {
    path: paths.banner,
    text: 'banner',
  })

  return part
}
```
</Example>

## Configuration

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `path`       |            | `Path`     | The Path to add the text on |
| `text`       |            | `text`     | The text to place repeat along the path |
| `dy`         | `1`        | `number`   | Controls how far the text will be located above the path |
| `spaces`     | `12`       | `number`   | The number of spaces to place between repetitions |
| `repeat`     | `10`       | `number`   | The number of repetitions |

## Notes

Under the hood, this macro will:

- Add `data-text`, `data-text-dy`, and `data-text-class` Attributes to the path to generate the text.
