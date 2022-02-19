---
title: Structure of a part
order: 150
---

Let's get rid of the example box first.
Open `src/bib.js` and make sure it looks like this:

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

This is an empty skeleton for a pattern part. Anytime you want to create a new part,
this is a good starting point.

Let's quickly go over the different sections.
Even if there's not much going on yet, it's always good to understand what's going on.

## The draft method

```js
export default function(part) {

  // ...
  
  return part
}

```

This is the boilerplate of our `draftBib` method. It takes the part as an argument, and returns it.

<Note>

If you're new to JavaScript, and don't intuitively *get this*, stick with it. It will become second nature soon enough.

</Note>

## Using shorthand

```js
let {
  Point,
  points,
  Path,
  paths,
} = part.shorthand()
```

This is FreeSewing's **shorthand** method. It returns an object with a bunch of handy helpers
and you use JavaScript's *object destructuring* to only get what you need.

The example above makes the following variables available:

-   `Point`: The Point constructor
-   `points`: A reference to the part's points
-   `Path`: The Path constructor
-   `paths`: A reference to the part's paths

These will make it possible for you to draw points and paths easily.

The following three variables are also needed to create a full-fledged FreeSewing pattern; their function and usage will
be covered in detail [later on in this tutorial](/tutorials/pattern-design/completing-your-pattern/):

-   `complete`: create a *complete* pattern (or not)
-   `sa`: include *seam allowance* (or not)
-   `paperless`: allow the pattern to be *paperless*

For now, we only need these so that the pattern skeleton compiles properly.

<Note>

This will all become clear, but if you're curious, the API docs have all the details
on [the Part.shorthand() method](/reference/api/part/#shorthand).

</Note>

## Part boilerplate

```js
// Complete?
if (complete) {
  if (sa) {
  }
  // Paperless?
  if (paperless) {
  }
}
```

This is some more boilerplate that makes sure we respect the `complete`, `sa`, and `paperless` settings.

For now, you don't need to worry about this. Let's just start designing our bib.
