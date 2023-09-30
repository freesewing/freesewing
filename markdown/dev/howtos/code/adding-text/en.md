---
title: Adding text
---

SVG is pretty great, but its text handling leaves much to be desired.

To abstract away the intricacies of adding text to an SVG document, FreeSewing
provides the [Point.addText()](/reference/api/point/addtext) and
[Path.addText()](/reference/api/path/addtext) methods to let you add text to
points and paths.

<Example caption="An example of adding text" tutorial>
```design/src/part.mjs
function draftPart = ({ 
  Point,
  points,
  Path, 
  paths,
  part 
}) {

  points.demo = new Point(70,10)
  // highlight-start
    .addText('Text on a point', 'center')
  // highlight-end

  paths.demo = new Path()
    .move(new Point(0,0))
    .line(new Point(100, 40))
    .addClass('note dotted stroke-sm')
  // highlight-start
    .addText('Text on a path', 'center')
  // highlight-end


  return part
}
```
</Example>
