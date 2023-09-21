---
title: Our first part
order: 120
---

Much like garments themselves, patterns are made up of _parts_.
Most patterns will have multiple parts. A sleeve, a back part, the collar, and
so on. Our pattern is very simple, and only has one part: the bib.

It's a good idea to keep each part in its own file. We don't *have to* do
this, but it's a good habit to get into. When we create more elaborate designs
with multiple parts, keeping each in its own file makes for a more tidy
and approachable code base.

## bib.mjs

The previous step has already set everything up for us. Our design's main file
lives in `design/src/index.mjs`, and our part lives in `design/src/bib.mjs`.

This `bib.mjs` is where we'll do all our work. The file includes a comments to guide you on how to use it. We removed those for clarity in our example. It currently looks like this:

```design/src/bib.mjs
import { pluginBundle } from "@freesewing/plugin-bundle"

function draftBib ({
  part, // Your draft method must return this
})
{
  // Work your magic here
  return part
}
export const bib = {

  name: 'tutorial.bib',
  draft: draftBib,[],
  from: false,
  hide: {
    self: false,
    from: false,
    after: false
  },
  options: {},
  measurements: [],
  optionalMeasurements: [],
  plugins: [ pluginBundle ]
}
```

### The part object

Each part in FreeSewing is an object that describes everything there is to know about the part.

The only mandatory keys on a part object are `name` and `draft`.

<Related>
Refer to [the part reference documentation](/reference/api/part) for 
all details about configuring the part object 
</Related>

#### The part name

```design/src/bib.mjs
  name: 'tutorial.bib',
```

A part's `name` should be unique in a pattern. Apart from that, anything goes.
Although we probably want to give it a sensible name.

As we can see in the example above, we're using `tutorial.bib` as the name.

<Tip>
We **strongly** recommend that you follow this `design.part` naming scheme to avoid
naming conflicts when mixing parts from various designs to create new designs.
</Tip>

#### The part's draft method

```design/src/bib.mjs
  draft: draftBib,
```

The second mandatory key on the part object is `draft` which should hold the method that drafts the part.

In our example above, it refers to the `draftBib` function we defined at the top of the file.
For now this function doesn't do much, but that will change soon enough.

<Note>
This structure of putting the draft method at the top of the file and
the part object at the bottom is a bit of a convention in FreeSewing.
</Note>

## index.mjs

<Tip>
Feel free to skip to [Adding
measurements](/tutorials/pattern-design/adding-measurements) if you're itching
to get started.  Or, read on for an explanation of what's going on in the
`index.mjs` file.
</Tip>

The `index.mjs` file is already complete and we won't be making any changes to
it.  But for those who are curious about what's going on inside `index.mjs`,
we're including a version with comments below:

```design/src/index.mjs
/*
 * Import the `Design` constructor
 * from the FreeSewing core library
 *
 * This Design constructor is a method
 * (also known as a function)
 * that creates a new Design
 */
import { Design } from '@freesewing/core'
/*
 * Import the `bib` part from the bib.mjs file
 * in the same folder as this index.mjs file
 *
 * This is the part we'll be working on
 * in this tutorial
 */
import { bib } from './bib.mjs'

/*
 * Create a new Pattern by passing
 * a configuration object
 * to the Design constructor
 */
const Pattern = new Design({
  /*
   * This `data` key is optional, but we
   * typically add a name and version here
   */
  data: {
      name: "Tutorial",
  },
  /*
   * This `parts` key is the most important thing
   * It holds a list of `parts` for our Design.
   * A Pattern/Design is in the end not much more
   * than a collection of parts.
   */
  parts: [ bib ],
})

/*
 * We are exporting our Pattern
 * (so others can use it)
 * but we also (re-)export our bib part
 * this allows others to re-use it
 * in their own designs
 */
export { bib, Pattern }
```
