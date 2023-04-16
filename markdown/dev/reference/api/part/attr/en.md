---
title: Part.attr()
---

This `Part.attr()` method can be used to add attributes to the Part object.
It calls `this.attributes.add()` under the hood, and returns the Part object.

If the third parameter is set to `true` it will call `this.attributes.set()`
instead, thereby overwriting the value of the attribute.

## Signature

```js

Part Part.attr( 
  string name,
  mixed value,
  bool overwrite = false
)

```

<Tip compact>This method is chainable as it returns the `Part` object</Tip>

## Example

<Example caption=" Example of the Part.attr() method">

```js

({ part, points, Point, Path, paths }) => {

points.A = new Point(0,0)
points.B = new Point(0,40)
points.C = new Point(100,40)

paths.line = new Path()
  .move(points.B)
  .line(points.C)
  .line(points.A)
  .line(points.B)
  .close()
  .addText('I have been flipped!', 'left')

part.attr('transform', 'scale(1,-1) translate(0,-40)') 

return part
}

```

</Example>

