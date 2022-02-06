---
title: Handling whitespace in text
---

When [adding text to your pattern](/howtos/code/adding-text) you might
need to add a special type of text: whitespace.

Whitespace in patterns can either be line breaks, or spaces. We'll
show you have to handle both below:

## Adding linebreaks to text

To add linebreaks to text, you merely have to include them in your text.
When doing so, keep in mind that single-quoted strings in Javascript
will **not** pick up linebreaks.

```js
points.example1.attr('data-text', 'this\nwill\nnot\nwork')
points.example2.attr('data-text', "this\nwill\nwork")
points.example2.attr('data-text', `this
will
also
work`)
```

<Tip>

You can control the lineheight by setting the `data-text-lineheight` attribute:

```js
points.example2
  .attr('data-text', "this\nwill\nwork")
  .attr('data-text-lineheight', settings.scale * 8)
```

</Tip>

## Adding spaces to text

Adding a single space between two words is not a problem.
But what if you want to add a couple of spaces in a row?
Both in HTML and SVG they will get collapsed into a single space.

To get around that, use `&#160;` for space:

```js
points.example.attr(
  'data-text', 
  "far &#160;&#160;&#160;&#160; apart"
)
```

Whether you're rendering to SVG or React, by using `&#160;` your spaces
will be properly rendered in both environments.


