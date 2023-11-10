---
title: grainline
---

The `grainline` macro adds a _grainline_ indicator to your pattern.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('grainline', {
  Point from,
  Point to,
  String text=grainline,
  Boolean force = false,
})
```

## Example

<Example caption="Example of the grainline indicator added by this macro">
```js
({ Point, macro, Path, paths, part }) => {

  macro('grainline', {
    from: new Point(0,0),
    to: new Point(100,0),
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-20,-10))
    .move(new Point(110, 0))

  return part
}
```
</Example>

## Configuration

| Property    | Default     | Type       | Description                                  |
|------------:|-------------|------------|----------------------------------------------|
| `from`      |             | [Point][1] | The startpoint of the _grainline_ indicator  |
| `to`        |             | [Point][1] | The endpoint of the _grainline_ indicator    |
| `text`      | 'grainline' | string     | The text to put on the _grainline_ indicator |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

[1]: /reference/api/point

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

