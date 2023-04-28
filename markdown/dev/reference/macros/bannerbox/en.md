---
title: bannerbox
---

The `bannerbox` macro allows you to add a box with repeating text on it.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('bannerbox', {
  String textClassName='text-xs fill-note',
  String boxClassName='stroke-xs stroke-note lashed',
  Point topLeft=new Point(0,0),
  Point bottomRight=new Point(100,100),
  String text='',
  Number margin=15,
  Number dy=4,
  Number repeat=10,
  Number spaces=12,
})
```
  
## Example

<Example caption="Example of the bannerbox macro">
```js
({ Point, points, Path, paths, macro, part }) => {

  macro('bannerbox', {
    title: 'a bannerbox example',
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default                        | Type     | Description |
|----------------:|--------------------------------|----------|-------------|
| `textClassName` | `text-xs fill-note`            | `string` | CSS classes to apply to the text |
| `boxClassName`  | `stroke-xs stroke-note lashed` | `string` | CSS classes to apply to the box path |
| `topLeft`       | `new Point(0,0)`               | `Point`  | Top top-left corner of the box |
| `bottomRight`   | `new Point(100,100)`           | `Point`  | Top top-left corner of the box |
| `text`          |  ``                            | `string` | The text to place repeat along the box path |
| `margin`        | `15`                           | `number` | Controls the margin the box will apply |
| `dy`            | `4`        | `number`   | Controls how far the text will be located above the path |
| `repeat`        | `10`       | `number`   | The number of text repetitions. See [banner macro][banner] |
| `spaces`        | `12`       | `number`   | The number of spaces to place between repetitions. See [banner macro][banner] |

## Notes

Under the hood, this macro will [the banner macro][banner] to place the text on the box path.

[banner]: /reference/macros/banner
