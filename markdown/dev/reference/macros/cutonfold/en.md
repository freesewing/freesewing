---
title: cutonfold
---

The `cutonfold` macro adds a _cut on fold_ indicator to your pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('cutonfold', {
  Point from,
  Boolean grainline=false,
  Number margin=5,
  Number offset=15,
  String prefix='',
  Point to,
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
| `to`        |         | [Point](/reference/api/point) | The endpoint of the _cut on fold_ indicator |
| `margin`    | 5       | [Point](/reference/api/point) | The distance in % to keep from the start/end edge |
| `offset`    | 15      | Number              | The distance in mm to offset from the line from start to end |
| `prefix`    |         | String              | A prefix to apply to the names of the generated path and points |
| `grainline` | `false` | Boolean             | Whether this cutonfold indicator is also the grainline |

## Result

| Generated Element | Description |
|------|-------------|
| `paths.cutonfold${prefix}` | The Path for the _cut on fold_ indicator |
| `points.cutonfoldFrom${prefix}` | Point used to create the path |
| `points.cutonfoldVia1${prefix}` | Point used to create the path |
| `points.cutonfoldVia2${prefix}` | Point used to create the path |
| `points.cutonfoldTo${prefix}` | Point used to create the path |

## Notes

### It's safe to use a corner of your pattern part for this

Since this is typically used on corners, the generated cut-on-fold indicator
will not go all the way to the `to` and `from` points.

### Removing the cut on fold indicator

If you inherit a part with a cut on fold indicator and you'd like to remove it,
you can do so by passing `false` to the macro:

```js
macro('cutonfold', false)
```
