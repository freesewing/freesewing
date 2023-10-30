---
title: miniScale
---

The `miniscale` macro adds a mini _scale box_ to your pattern. This box allows
users to verify their pattern is printed to scale.
The white inside of the box provides a metric scale, and the black outside
of the box provides an imperial scale.

A miniscale is the mini version of [the scalebox macro](/reference/macros/scalebox/).

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('miniscale', {
  Point at,
  Number rotate,
  Boolean force = false,
})
```

## Example

<Example caption="An example of the miniscale macro">
```js
({ Point, macro, part }) => {

  macro('miniscale', {
    at: new Point(0,0),
  })

  return part
}
```
</Example>

## Configuration

| Property    | Default | Type                | Description |
|------------:|---------|---------------------|-------------|
| `at`        |         | [Point](/reference/api/point) | The point to anchor the _scale box_ on |
| `rotate`    | 0       | Number              | Rotation in degrees |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.
