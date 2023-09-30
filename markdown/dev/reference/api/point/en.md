---
title: Point
---

A Point object represents a point on a 2D plane with an X and Y axis.

## Signature

```js
Point new Point(Number x, Number y)
```

The point constructor takes two arguments:

- `x` : The X-coordinate of the point
- `y` : The Y-coordinate of the point

## Properties

Point objects come with the following properties:

- `x` : The X-coordinate of the point
- `y` : The Y-coordinate of the point
- `attributes` : An [Attributes](/reference/api/attributes) instance holding the point's attributes

<Related>
See [Using Attributes](/howtos/code/attributes)
for information about custom Attributes that can be used with Points.
</Related>

## Example

<Example caption="Example of the Point constructor">
```js
({ Point, points, part }) => {
  points.example = new Point(0,0)
    .addCircle(10)

  return part
}
```
</Example>

## Methods

A Point object exposes the following methods:

<ReadMore list />
