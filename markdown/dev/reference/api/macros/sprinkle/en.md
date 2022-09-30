---
title: sprinkle
---

The `sprinkle` macro facilitates adding snippets to your pattern in bulk.  
It is by the [sprinkle plugin](/reference/plugins/sprinkle).

## Signature

```js
macro('sprinkle', {
  Array on,
  Number scale,
  Snippet snippet,
  Number rotation,
})
```

## Example

<Example caption="An example of the sprinkle macro">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.a = new Point(0,0)
  points.b = new Point(10,5)
  points.c = new Point(20,0)
  points.d = new Point(30,5)
  points.e = new Point(40,0)
  points.f = new Point(50,5)
  points.g = new Point(60,0)

  macro('sprinkle', {
    snippet: 'button',
    on: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(points.a)
    .move(points.g)

  return part
}
```
</Example>

## Configuration

| Property    | Default | Type             | Description |
|------------:|---------|------------------|-------------|
| `snippet`   |         | String           | Name of the snippet to sprinkle |
| `on`        | `[]`    | Array of strings | An array with **the names** of points to add the snippet on |
| `scale`     | 1       | number           | Scale for the individual snippets |
| `rotate`    | 0       | number           | Rotation for the individual snippets |
