---
title: banner
---

The `banner` macro allows you to add repeating text along a path.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('banner', {
  String className='',
  Number dy=1,
  Number repeat=10,
  Number spaces=12,
  Path path,
  String text,
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
| `className`  | ``         | `string`   | Any additional CSS classes to apply to the text |
| `dy`         | `1`        | `number`   | Controls how far the text will be located above the path |
| `path`       |            | `Path`     | The Path to add the text on |
| `repeat`     | `10`       | `number`   | The number of repetitions |
| `spaces`     | `12`       | `number`   | The number of spaces to place between repetitions |
| `text`       |            | `string`   | The text to place repeat along the path |

## Notes

Under the hood, this macro will:

- Add `data-text`, `data-text-dy`, and `data-text-class` Attributes to the path to generate the text.
