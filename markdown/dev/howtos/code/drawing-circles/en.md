---
title: Drawing circles
---

Real circles are rarely used in pattern design, and they are not part of the
SVG path specification, but rather a different SVG element.

Still, if you want a circle, you can draw one by calling
[`Point.addCircle()`](/reference/api/point/addcircle):

<Example caption="An example of adding a path" tutorial>
```design/src/part.mjs
function draftPart = ({ 
  Point,
  points,
  Path,
  paths,
  part 
}) {

  points.anchor = new Point(0,0)
  // highlight-start
    .addCircle(5, 'lining dotted')
    .addCircle(10, 'note dashed ')
    .addCircle(15, 'facing lashed')
    .addCircle(20, 'interfacing')
  // highlight-end

  // Prevent clipping
  paths.demo = new Path()
    .move(new Point(-20,-20))
    .move(new Point(20,20))

  return part
}
```
</Example>

<Warning>
Circles are not taken into account when calculating the part's boundary.
</Warning>

<Comment by="joost">
##### How multiple circles are implemented

When you add the same attribute multiple times, they are typically joined together
when rendering. For example multiple calls to add a `class` attribute will end up being 
rendered as `class="class1 class2 class3` which makes a lot of sense.

But when we're placing multiple circles on the same point, that raises a bit of a problem.
For example in this code:

```js
point.a = new Point(0,0)
  .addCircle(10, 'lining')
  .addCircle(20, 'fabric')
```

Based on the rules of attributes, this would render a single circle with `r="10 20" 
class="lining fabric"`. Which does not make a lot of sense and is invalid SVG
as `r` only takes one value.

So the render engine will do some extra work here to check that there are multiple
circles added, and will render a circle element for each, with the `r` and `class`
values of their respective calls.

While this is probably what you'd intuitively expect, it is somewhat inconsistent with how
other attributes are rendered, so I felt it was best to point it out explicitly.

</Comment>

