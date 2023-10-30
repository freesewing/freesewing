---
title: flip
---

The `flip` macro flips (mirrors) an entire part vertically around either the
X-axis or the Y-axis.

It is provided by the [flip plugin](/reference/plugins/flip).

<Note>
##### Not a core-plugins macro

The `flip` macro is not provided by the [core-plugins](/reference/plugins/core),
so you need to load the [flip plugin](/reference/plugins/flip) explicitly
if you want to use it.
</Note>

## Signature

```js
macro('flip', { String axis=x })
```

## Example

<Example caption="Example of the flip macro">
```js
({ Point, points, Path, paths, Snippet, snippets, macro, part }) => {

  points.a = new Point(0,0)
  points.b = new Point(90,20)
  paths.a = new Path().move(points.a).line(points.b).setClass('dotted note')
  snippets.a = new Snippet(
    'logo', 
    paths.a.shiftFractionAlong(0.5)
  ).attr('data-scale', 0.2)

  macro('flip')
  
  return part
}
```
</Example>

## Configuration

| Property        | Default | Type                | Description |
|----------------:|---------|---------------------|-------------|
| `axis`          | 'x'     | The axis to flip around. Either `x` or `y` |

## Notes

Under the hood, this macro will:

- Go through all Points in your Part, and multiply their (X or Y)-coordinate by -1
- Go through all the Paths in your Part, and for each drawing operation will multiply the (X or Y)-coordinate by -1
- Go through all the Snippets in your Part and multiply the (X or Y)-coordinate of the anchor point by -1
- Add a 'flipped` Attribute to Points and Paths to keep track of the number of times they have been flipped (to avoid issues when multiple flips are performed)
