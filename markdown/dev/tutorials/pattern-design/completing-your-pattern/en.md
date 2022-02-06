---
title: Completing your pattern
order: 260
---

When we started out, we said a good part boilerplate looks like this:

```js
export default function(part) {
  let { Point, points, Path, paths, complete, sa, paperless } = part.shorthand()
  // Design pattern here

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part
}
```

So far, we've kept to the *// Design pattern here* area, but now we're going to work on 
the area under *// Complete?* 

<Note>

###### The point of (non) complete patterns

Users can set the `complete` setting to `false`. When that's the case, you
should draft a base outline of the pattern, rather than a fully detailed pattern.

This has different uses, such as generating patterns to be cut out with a laser cutter.

</Note>

The `complete` setting is `true` by default, but the user can change it.
To access the setting, we merely have to tell `part.shorthand()` that we'd like to access it.

While we're at it, also add `snippets` and `Snippet`, like this:

```js
let {
  Point,
  points,
  Path,
  paths,
  complete,
  sa,
  paperless,
  measurements,
  options,
  macro,
  complete,
  snippets,
  Snippet
} = part.shorthand()
```

## Adding snippets

Snippets are little re-useable things to embellish your pattern with.
Things like buttons or buttonholes, a logo, or snaps:

```js
// Complete?
if (complete) {
  snippets.snapStud = new Snippet("snap-stud", points.snapLeft)
  snippets.snapSocket = new Snippet("snap-socket", points.snapRight)
    .attr("opacity", 0.5)

  if (sa) {
  }
  // Paperless?
  if (paperless) {
  }
}
```

We've added a `snap-stud` and `snap-socket` snippet to the points we had foreseen for that.

Because the socket snippet is at the back of the fabric, we've made it semi-transparent by
setting the `opacity` attribute to `0.5`. Yes, you can do that.

<Tip>

Any attributes you set will be added to the SVG output.

</Tip>

Since we're adding snippets, let's throw a logo on there too:

```js
points.logo = new Point(0, 0)
snippets.logo = new Snippet("logo", points.logo)
```

<Note>

  You can find all possible snippets in [our documentation](/reference/snippets/).
  
</Note>

## Seam allowance

Just like users can choose whether they want a complete pattern or not, they can choose
whether they want to include seam allowance on the pattern or not.

This is why we have this condition:

```js
if (sa) {
}
```

Our bib does not use seam allowance. Instead we'll finish it with bias tape.
So you can simply remove that condition.

However, for future refefence, `sa` is a variable that you can get from `part.shorthand()`
just like `complete`. But instead of `true` or `false` it will hold the amount of seam allowance
in mm. 

Note that you can still do `if (sa)` because zero is *falsy*.

We won't be adding seam allowance, but we will be doing something that is essentially the same.
Rather than draw an outline outside our bib to indicate the seam allowance, we'll draw one within
our bib to mark the bias tape:

```js
paths.bias = paths.seam
  .offset(-5)
  .attr("class", "various dashed")
  .attr("data-text", "finishWithBiasTape")
  .attr("data-text-class", "center fill-various")
```

The `path.offset()` method makes it trivial to add seam allowance, since it will contruct
a path parallel to the given path at the distance you pass it. 9 times out of 10, you'll be using it as `path.offset(sa)`.

Note that we're also using the attributes again, to change the look of the line, and add text to it,
as explained in [Adding text](/concepts/adding-text).

## Scalebox and title

Two more macros and we're done. 

The `title` macro adds a title to our part.
It's not that big a deal here since we only have one part in our pattern.
But patterns typically have many different parts, some of them which might look rather similar.
That's why you should number your parts and give them a name. 

The `title` macro can help you with that:

```js
points.title = points.bottom.shift(-90, 45)
macro("title", {
  at: points.title,
  nr: 1,
  title: "bib"
})
```

The `scalebox` macro prints a box of an exact size.
It is used by people who print the pattern to make sure their print is correctly scaled.

```js
points.scalebox = points.title.shift(-90, 55)
macro("scalebox", { at: points.scalebox })
```

And with that, our pattern is now *complete*:

<Example pattern="tutorial" part="step11">
We used attributes to add color, dashes, text on a path and even opacity
</Example>


We're not done yet though. There's one more thing the user can ask for: a *paperless* pattern.

