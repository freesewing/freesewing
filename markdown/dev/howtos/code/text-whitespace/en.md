---
title: Handling whitespace in text
---

When [adding text to your pattern](/howtos/code/adding-text) you might
need to add a special type of text: whitespace.

Whitespace in patterns can either be line breaks, or spaces. We'll
show you have to handle both below:

## Adding line breaks to text

To add line breaks to text, you merely have to include them in your text.
When doing so, keep in mind that single-quoted strings in JavaScript
will **not** pick up line breaks.

<Example caption="An example of whitespace in text">
```design/src/part.mjs
function draftPart = ({ 
  Point,
  points,
  Path,
  paths,
  part 
}) {
  points.demo1 = new Point(10,20)
  // highlight-start
    .addText('this\nwill\nwork')
  // highlight-end
  points.demo2 = new Point(40,20)
  // highlight-start
    .addText("this\nwill\nalso\nwork")
  // highlight-end
  points.demo3 = new Point(70,20)
  // highlight-start
    .addText(`And
  this
  will
  also
  work`).attr('data-text-lineheight', 7)
  // highlight-end

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(0,10))
    .move(new Point(90, 70))

  return part
}
```
</Example>

<Tip>
You can control the lineheight by setting the `data-text-lineheight` attribute.
</Tip>

## Adding consecutive spaces to text

Adding a single space between two words is not a problem.
But what if you want to add a couple of spaces in a row?
Both in HTML and SVG they will get collapsed into a single space.

To get around that, use `&#160;` for space.

```mjs
 points.demo = new Point(0, 0) 
  // highlight-start
  .addText('far &#160;&#160;&#160;&#160; apart')
  // highlight-end
}
```

