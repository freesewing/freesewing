---
title: bartack
---

The `bartack` macro allows you to add a _bartack_ marker to your sewing
pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('banner', {
  String id='bartack',
  Point anchor,
  Number angle=0,
  Number density=3,
  Number length=15,
  String prefix='',
  String suffix='',
  Number width=3,
  Boolean force = false,
})
```

## Example

<Example caption="Example of the bartack macro">
```js
({ macro, Point, part }) => {

  macro('bartack', {
    anchor: new Point(0,0),
    length: 25
  })

  return part
}
```
</Example>

## Configuration

| Property     | Default    | Type       | Description |
|-------------:|------------|------------|-------------|
| `anchor`     |            | `Point`    | The point to start the bartack from |
| `angle`      | `0`        | `number`   | The angle under which to draw the bartack |
| `density`    | `3`        | `number`   | Controls how close the stitches are together |
| `id`         | `bartack`  | `string`   | The ID of this macro instance |
| `length`     | `15`       | `number`   | Length of the bartack |
| `prefix`     |            | `string`   | A prefix to apply to the name of the generated path |
| `suffix`     |            | `string`   | A suffix to apply to the name of the generated path |
| `width`      | `3`        | `number`   | Width of the bartack |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

