---
title: banner
---

The `banner` macro allows you to add repeating text along a path.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('banner', {
  String id='banner',
  String className='',
  Number dy=1,
  Number repeat=10,
  Number spaces=12,
  Path path,
  String text,
  Boolean force = false,
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
| `id`         | `banner`   | `string`   | The id of this macro instance |
| `path`       |            | `Path`     | The Path to add the text on |
| `repeat`     | `10`       | `number`   | The number of repetitions |
| `spaces`     | `12`       | `number`   | The number of spaces to place between repetitions |
| `text`       |            | `string`   | The text to place repeat along the path |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

Under the hood, this macro will:

- Add `data-text`, `data-text-dy`, and `data-text-class` Attributes to the path to generate the text.

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

