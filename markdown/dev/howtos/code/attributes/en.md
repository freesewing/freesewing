---
title: Using attributes
for: developers
about: Show s you have to use attributes on points, paths, and snippets
---

Points, Paths, and Snippets all have [attributes](/reference/api/attributes/) that you can use to
influence how they behave.

A common scenario is to apply CSS classes to style a path:

```js
paths.example.attributes.add('class', 'lining dashed');
```

Because it's so common to set attributes, Points, Paths and Snippets all have
the `attr()` helper method.

Not only is less more, the method is also *chainable*, which allows you to do this:

```js
points.message = new Point(0,0)
  .attr("data-text", "Hello world!")
  .attr("data-text-class", "note");
```

<Note>

In this example, we're using attributes to add text to our pattern.
The [adding-text](/concepts/adding-text) documentation explains this in detail.

</Note>

<Tip>

When rendering, FreeSewing will output all your attributes. This gives you the
possiblity to use any valid attribute to control the appearance.

This is also why we use the *data-* prefix for those attributes that have
special meaning within FreeSewing, such as `data-text`. Adding a `text` attribute
would result in invalid SVG as there is no such thing as a text attribute. But `data-text`
is fine because the `data-` prefix indicates it is a [custom attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/data-*).

</Tip>
