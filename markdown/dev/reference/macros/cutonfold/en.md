---
title: cutOnFold
---

The `cutonfold` macro adds a _cut on fold_ indicator to your pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('cutonfold', {
  String id="cutonfold",
  Point from,
  Boolean grainline=false,
  Number margin=5,
  Number offset=15,
  String prefix='',
  Point to,
  Boolean force = false,
})
```

## Example

<Example caption="Example of the cut on fold indicator added by this macro">
```js
({ Point, macro, Path, paths, part }) => {

  macro('cutonfold', {
    from: new Point(0,0),
    to: new Point(100,0),
    grainline: true
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-10,-20))
    .move(new Point(110,0))

  return part
}
```
</Example>

## Configuration

| Property    | Default | Type                | Description |
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint of the _cut on fold_ indicator |
| `id`        | `cutonfold` | `string` | The ID of this macro instance |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the _cut on fold_ indicator |
| `margin`    | 5       | [Point](/reference/api/point) | The distance in % to keep from the start/end edge |
| `offset`    | 15      | Number              | The distance in mm to offset from the line from start to end |
| `prefix`    | 'cutonfold' | String              | A prefix to apply to the names of the generated path and points |
| `grainline` | `false` | Boolean             | Whether this cutonfold indicator is also the grainline |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

### It's safe to use a corner of your pattern part for this

Since this is typically used on corners, the generated cut-on-fold indicator
will not go all the way to the `to` and `from` points.

