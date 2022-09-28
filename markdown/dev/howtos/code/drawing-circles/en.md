---
title: Drawing circles
---

Real circles are rarely used in pattern design, and they are not part of the SVG path specification,
but rather a different SVG element.

Still, if you want a circle, you can draw one by setting a Point's `data-circle` attribute
to the radius of the circle you want to draw.

In addition, all attributes that have a `data-circle-` prefix will apply to the circle, rather than the point.

Practically, you will probably want to use
the [Point.addCircle()](/reference/api/point/adcircle) which does all of this for you behind the scenes:

<Example part="point_addcircle">
Examples of circles drawn on a pattern
</Example>

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
