---
title: Using attributes
---

Points, Paths, and Snippets all have [attributes](/reference/api/attributes/)
that you can use to influence how they behave.

Under the hood, text, CSS classes, and even circles are all set in attributes.
There are plenty of higher-level helper methods available, but knowing how to
manipulate attributes is useful in case you want to accomplish something for
which there is no higher-level helper method.

## Example

Let's use an example to see the different ways we can assign a CSS class:

<Example caption="Various ways to set attributes on a point">
```mjs
({ points, Point, paths, Path, part }) => {
  /*
   * Via the high-level Point.addText method
   */
  points.a = new Point(0,0)
    .addText('I am bold and colorful', 'bold fill-note')

  /*
   * Via the lower-level Point.attr method
   */
  points.b = new Point(0,10)
    .attr('data-text', 'I am bold and colorful')
    .attr('data-text-class', 'bold fill-lining')

  /*
   * Via low-level access to the attributes property
   */
  points.c = new Point(0,20)
  points.c.attributes.add('data-text', 'I am bold and colorful')
  points.c.attributes.add('data-text-class', 'bold fill-contrast')

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-10,-5))
    .move(new Point(80,25))

  return part
  }
```
</Example>

So, attributes can be set via low-level access even though there are helpers
methods available for them.

## Common scenarios

A common scenario is to apply [CSS classes](/reference/css) to style a path:

```js
paths.example.attributes.add('class', 'lining dashed');
```

Because it's so common to set attributes, Points, Paths and Snippets all have
the `attr()` helper method.

Not only is less more, the method is also _chainable_, which allows you to do this:

```js
points.message = new Point(0,0)
  .attr("data-text", "Hello world!")
  .attr("data-text-class", "note");
```

<Note>

In this example, we're using attributes to add text to our pattern.
The [adding-text](/howtos/code/adding-text) documentation explains this in detail.

</Note>

## Custom attributes

There are some custom attributes that FreeSewing uses to modify the appearance
of Points, Paths, and Snippets.

### Points

The custom attributes that can be added to Points:

| Attribute | Description |
|----------:|-------------|
| `data-text` | Text to display at the point |
| `data-text-class` | [CSS classes](/reference/css) to apply to the text to provide styling |
| `data-text-lineheight` | Line height for the text, in mm |
| `data-circle` | Radius of the circle to display at the point |
| `data-circle-class` | [CSS classes](/reference/css) to apply to the circle to provide styling |

<Related>
See [Drawing circles](/howtos/code/drawing-circles) for more information
and other ways to draw circles.

See [Adding text](/howtos/code/adding-text) for other ways to add text
to points.
</Related>

### Paths

The custom attributes that can be added to Paths:

| Attribute | Description |
|----------:|-------------|
| `data-text` | Text to display along the path |
| `data-text-class` | [CSS classes](/reference/css) to apply to the text to provide styling |

<Related>
See [Adding text](/howtos/code/adding-text) for other ways to add text
to paths.
</Related>

### Snippets

The custom attributes that can be added to Snippets:

| Attribute | Description |
|----------:|-------------|
| `data-rotate` | Number of degrees to rotate the snippet |
| `data-scale` | Scaling factor to apply to the snippet. Either a single number or an array of 2 numbers for separate X and Y scaling factors |

<Tip>

When rendering an SVG document, FreeSewing will output all your attributes.
This gives you the
possibility to use any valid SVG attribute to control the appearance.

This is also why we use the _data-_ prefix for those attributes that have
special meaning within FreeSewing, such as `data-text`. Adding a `text` attribute
would result in invalid SVG as there is no such thing as a text attribute. But `data-text`
is fine because the `data-` prefix indicates it is a [custom attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/data-*).

</Tip>
