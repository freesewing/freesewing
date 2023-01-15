---
title: Adding snippets
---

Snippets should be stored in the `snippets` key of the object passed to your part's
draft method. The constructor for snippets is available in the `Snippets` key. You can
destructure them for easy access.

<Example caption="An example of adding a snippet" tutorial>
```design/src/part.mjs
function draftPart = ({ 
  Point,
  Path,
  paths,
  // highlight-start
  Snippet, 
  snippets,
  // highlight-end
  part 
}) {

  // highlight-start
  snippets.logo = new Snippet('logo', new Point(50,50))
    .attr('data-scale', 0.5)
    .attr('data-rotate', 180)
  // highlight-end

  // prevent clipping
  paths.demo = new Path()
    .move(new Point(0,0))
    .move(new Point(100,100))

  return part
}
```
</Example>

You can scale and rotate a snippet by setting the `data-scale` and `data-rotate` attributes respectively.

- **data-scale** : Either a single scale factor, or a set of 2 scale factors
  for the X and Y axis respectively. See [the SVG scale
  transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#Scale)
  for details.
- **data-rotate**: A rotation in degrees. The center of the rotation will be
  the snippet's anchor point

<Tip>

See [Using attributes](/howtos/code/attributes/) for details on how to set attributes.

</Tip>
