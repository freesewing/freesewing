---
title: Making your pattern paperless
order:  270
---

Users can request paperless patterns by setting the `paperless` setting to `true`.

We can get that value of the setting from the `part.shorthand()` method.
It will be the last shorthand we will put to use:

```js
let {
  Point,
  points,
  Path,
  paths,
  complete,
  sa,
  paperless, // <- this one here
  measurements,
  options,
  macro,
  snippets,
  Snippet
} = part.shorthand()
```

The idea behind *paperless patterns* is that users don't need to print your
pattern in order to use it. 
Instead, we include dimensions on the pattern that allows them to transfer
the pattern directly onto fabric, or onto an intermediate medium such as tracing paper.

In addition, FreeSewing will automatically render a grid for each pattern part with metric or imperial
markings, depending on the units requested by the user.

While the grid gets added automatically, the dimensions you have to add yourself.
Thankfully, there's macros that can help you with that, specifically:

 - The `hd` macro adds a horizontal dimension
 - The `vd` macro adds a vertical dimension
 - The `ld` macro adds a linear dimension
 - The `pd` macro adds a path dimension that follows a given path

<Note> The documentation, as always, holds [all the information about the macros](/reference/macros/). </Note>

Let's look at the code:

```js
if (paperless) {
  // Add dimensions
  macro("hd", {
    from: points.bottomLeftStart,
    to: points.bottomRightEnd,
    y: points.bottomLeft.y + 15
  })
  macro("vd", {
    from: points.bottomRightStart,
    to: points.bottom,
    x: points.bottomRight.x + 15
  })
  macro("vd", {
    from: points.bottomRightStart,
    to: points.right,
    x: points.bottomRight.x + 30
  })
  macro("vd", {
    from: points.bottomRightStart,
    to: points.tipLeftTopStart,
    x: points.bottomRight.x + 45
  })
  macro("hd", {
    from: points.left,
    to: points.right,
    y: points.left.y + 25
  })
  macro("ld", {
    from: points.tipLeftBottomEnd,
    to: points.tipLeftTopStart,
    d: 15
  })
}
```

There's a lot going on, but it's mostly repetition. To see what that did to your pattern, you have to enable *paperless mode* in your developing environment; you can find the option under *Pattern options* on the right. Let's look at the end result, and discuss:

<Example pattern="tutorial" part="bib" settings_paperless="true">
Your paperless bib
</Example>

We used the `hd` macro to add two horizontal dimensions:

 - One at the bottom for the width of our bib
 - One for the width of the neck opening

The `hd` macro takes a `from` and `to` point as well as a `y` value that says at what Y-value to draw the dimension.

We've also added three `vd` macros for the vertical dimensions on the right.

They also takes a `from` and `to` point, but expect a `x` parameter to indicate at what X-value the dimension should be drawn.

Finally, we added a `ld` macro for the linear dimension at the top that marks the width of our strap.
While most dimensions are horizontal or vertical, sometimes you want a straight line from the `from` to the `to` points like in this case.

The `ld` macro takes a `d` argument (short for delta) that indicates how far the dimension should be offset from the line from the `from` to the `to` point, if at all.

Making your pattern paperless is the icing on the cake. Time to wrap up, go over what we've learned, and give some pointers on where to go from here.

