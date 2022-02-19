---
title: Drawing circles
for: developers
about: Shows how you can add circles to your pattern
---

Real circles are rarely used in pattern design, and they are not part of the SVG path specification,
but rather a different SVG element.

Still, if you want a circle, you can draw one by setting a Point's `data-circle` attribute
to the radius of the circle you want to draw.

In addition, all attributes that have a `data-circle-` prefix will apply to the circle, rather than the point.

<Example pattern="rendertest" options_only="circles">
Circles
</Example>
