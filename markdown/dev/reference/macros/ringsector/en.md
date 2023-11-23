---
title: ringSector
---

The `ringsector` macro drafts a ring sector, which is like a part of a donut
with an inside and outside radius. It is particularly useful for drafting
curved waistbands, circle skirts, and so on.

It is provided by the [ringsector plugin](/reference/plugins/ringsector).

<Note>
##### Not a core-plugins macro

The `ringsector` macro is not provided by the [core-plugins](/reference/plugins/core),
so you need to load the [ringsector plugin](/reference/plugins/ringsector) explicitly
if you want to use it.
</Note>

## Signature

```js
macro('ringsector', {
  String id='ringsector',
  Point center = new Point(0,0),
  Number angle,
  Number insideRadius,
  Number outsideRadius,
  Boolean rotate = false,
})
```

## Example

<Example caption="Example of a ring sector drafted by this macro">
```js
({ Point, macro, Path, paths, part }) => {

  macro('ringsector', {
    angle: 60,
    insideRadius: 30,
    outsideRadius: 45,
  })

  return part
}
```
</Example>

## Configuration

| Property       | Default           | Type                | Description |
|---------------:|-------------------|------------|-------------|
| `id`           | `ringsector`      | String     | The id to use in auto-generate macro points and paths |
| `center`       | `new Point(0,0)`  | [Point][1] | The center point of the ring sector |
| `angle`        |                   | Number     | The angle the ring sector should cover |
| `insideRadius` |                   | Number     | The inside radius of the ring sector |
| `outsideRadius` |                  | Number     | The outside radius of the ring sector |
| `rotate`       | `false`           | Boolean    | Whether or not to rotate the ringsector so one of its sides is vertical (see [example below](#example-when-rotatetrue)) |

[1]: /reference/api/point

## Notes

The `ringsector` macro creates a `path` that can be used as a seam path for a part. If doing so, the left side of the path assumes a `cutOnFold`, as the `sa` is not offset here like it is along the rest of the `path`.

### Example when rotate=true

<Example caption="Example of a ring sector drafted by this macro when rotate is truthy">
```js
({ Point, macro, Path, paths, part }) => {

  macro('ringsector', {
    angle: 60,
    insideRadius: 30,
    outsideRadius: 45,
    rotate: true,
  })

  return part
}
```
</Example>

