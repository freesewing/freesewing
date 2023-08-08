---
title: A part's draft method
order: 150
---

Time to turn our attention to the draft method of our part.
Inside our `design/src/bib.mjs` file, this is what it currently looks like:

```design/src/bib.mjs
function draftBib ({
  // Uncomment below to destructure what you need
  /*
   * Content constructors
   */
  //Path,    // A Path constructor to create new paths
  //Point,   // A Point constructor to create new points
  //Snippet, // A Snippet constructor to create new snippets
  /*
   * Content constainers
   */
  //paths,    // Add a Path to your part by adding it to this object
  //points,   // Add a Points to your part by adding it to this object
  //snippets, // Add a Snippet to your part by adding it to this object
  /*
   * Access to settings
   */
  //absoluteOptions, // Access to settings.absoluteOptions
  //complete,        // Access to settings.complete
  //measurements,    // Access to settings.measurements
  //options,         // Access to settings.options
  //paperless,       // Access to settings.paperless
  //sa,              // Access to settings.sa
  //scale,           // Access to settings.scale
  /*
   * Access to utilities
   */
  //getId,     //See the getId documentation
  //hide,      //See the hide documentation
  //log,       //See the logging documentation
  //macro,     //See the macros documentation
  //setHidden, //See the setHidden documentation
  //store,     //See the store documentation
  //unhide,    //See the unhide documentation
  //units,     //See the units documentation
  ///utils,     //See the utils documentation
  /*
   * Return value
   */
  part, // Your draft method must return this
}) {

  // Work your magic here
  return part
}
```

This is an empty skeleton for a draft method. A draft method should always
return the part object, and that's effectively the only thing it currently
does.

## Destructuring the function parameter

If you're not familiar with the `({ part })` syntax you see above, this is a
technique called *parameter destructuring* or more generally, [object
destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

The draft method receives only 1 parameter: An object that holds everything we
need to draft our method.  Destructuring is a way to *pull things out of the
object into their own variable*. It saves us a bunch of typing as these two are
equivalent:

<Tabs tabs="Without destructuring, With destructuring">
<Tab>
```design/src/bib.mjs
function draftBib(props) {

  return props.part

}
```
</Tab>
<Tab>
```design/src/bib.mjs
function draftBib({ part }) {

  return part
}
```
</Tab>
</Tabs>

As we'll make our way through this tutorial, we'll need more and more stuff, so
we'll be pulling it out of the object passed to the draft method via
*destructuring*.

<Note>

If you're new to JavaScript, and don't intuitively _get this_, stick with it. It will become second nature soon enough.

</Note>

## Destructuring what we need to start drawing our bib

Change the function to look like this:

```design/src/bib.mjs
function draftBib({
  // highlight-start
  Path,
  Point,
  paths,
  points,
  // highlight-end
  part,
}) {

  return part
}
```

That's bunch of new lines, but each of one gives us something we'll use in this
tutorial.

For a complete list of what you can access via destructuring like this, refer
to [the draft method reference documentation](/reference/api/part/draft).
Here's a brief summary of the things we've added above:

- `Path`: The Path constructor, allows us to create new Paths
- `Point`: The Point constructor, allows us to create new Points
- `points`: A container object to hold the part's points
- `paths`: A container object to hold the part's paths

Long story short: These will make it possible for us to draw points and paths easily.

So let's go ahead and do that.
