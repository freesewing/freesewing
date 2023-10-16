---
title: grainline
---

The `grainline` macro adds a _grainline_ indicator to your pattern.
It is provided by the [annotations plugin](/reference/plugins/annotations).

## Signature

```js
macro('grainline', {
  Point from,
  Point to,
  String text=grainline,
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

## Result

| Generated Element | Description |
|-------------------|-------------|
| `paths.grainline` | The Path for the _grainline_ indicator |
| `points.grainlineFrom` | Point used to create the path |
| `points.grainlineTo` | Point used to create the path |

[1]: /reference/api/point

## Notes

### Place outside `complete`

The `grainline` macro should be placed outside of `complete` blocks
in the part's draft method.

This is because it provides information about the part's grainline,
information that is always needed by the cutting layout regardless of
whether `complete` details and graphics are shown on the pattern.

The `grainline` macro will automatically show or hide the grainline
indicator based on the `complete` setting.

### Removing the grainline indicator

If you inherit a part with a grainline indicator and you'd like to remove it,
you can do so by passing `false` to the macro:

```js
macro('grainline', false)
```
