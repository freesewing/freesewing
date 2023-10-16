---
title: bartack
---

The `bartack` macro allows you to add a _bartack_ marker to your sewing
pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('banner', {
  Point anchor,
  Number angle=0,
  Number density=3,
  Number length=15,
  String prefix='',
  String suffix='',
  Number width=3,
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
| `length`     | `15`       | `number`   | Length of the bartack |
| `prefix`     |            | `string`   | A prefix to apply to the name of the generated path |
| `suffix`     |            | `string`   | A suffix to apply to the name of the generated path |
| `width`      | `3`        | `number`   | Width of the bartack |

## Result

| Generated Element | Description |
|-------------------|-------------|
| `paths.${prefix}bartack${suffix}` | Path generated for the bartack marker |
