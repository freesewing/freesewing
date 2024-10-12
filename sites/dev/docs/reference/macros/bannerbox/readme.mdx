---
title: bannerBox
---

The `bannerbox` macro allows you to add a box with repeating text on it.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('bannerbox', {
  String id='bannerbox',
  String textClassName='text-xs fill-note',
  String boxClassName='stroke-xs stroke-note lashed',
  Point topLeft=new Point(0,0),
  Point bottomRight=new Point(100,100),
  String text='',
  Number margin=15,
  Number dy=4,
  Number repeat=99,
  Number spaces=12,
  Boolean force = false,
})
```

## Example

<Example caption="Example of the bannerbox macro">
```js
({ Point, points, Path, paths, macro, part }) => {

  macro('bannerbox', {
    text: 'a bannerbox example',
    topLeft: new Point(0,0),
    bottomRight: new Point(80, 30)
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default                        | Type     | Description |
|----------------:|--------------------------------|----------|-------------|
| `bottomRight`   | `new Point(100,100)`           | `Point`  | Top top-left corner of the box |
| `boxClassName`  | `stroke-xs stroke-note lashed` | `string` | CSS classes to apply to the box path |
| `dy`            | `4`        | `number`   | Controls how far the text will be located above the path |
| `id`            | `bannerbox`        | `string`   | The ID of this macro instance |
| `margin`        | `15`                           | `number` | Controls the margin the box will apply |
| `repeat`        | `99`       | `number`   | The number of text repetitions. See [banner macro][banner] |
| `spaces`        | `12`       | `number`   | The number of spaces to place between repetitions. See [banner macro][banner] |
| `text`          |  ``                            | `string` | The text to place repeat along the box path |
| `textClassName` | `text-xs fill-note`            | `string` | CSS classes to apply to the text |
| `topLeft`       | `new Point(0,0)`               | `Point`  | Top top-left corner of the box |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

Under the hood, this macro will [the banner macro][banner] to place the text on the box path.

The banner box will be larger than the box formed by the coordinates
provided to the macro,
The sides will be offset by approximately 1.4 times the `margin`.

If the total length of the text (based on `text`, `repeat`, and `spaces`)
is less than the length of the box path, the text will simply end,
leaving some of the box without text.
If the total length of text is greater than the length of the box path,
the remaining text will be truncated.
For this reason, using a `repeat` value greater than what is normally
needed might be a best practice to ensure that text completely surrounds
the bannerbox, even if the pattern is scaled down, allowing more text to
fit around the box.

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

[banner]: /reference/macros/banner
