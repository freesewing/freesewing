---
title: Creating a part
order: 120
---

Much like garments themselves, patterns are made up of _parts_.
Most patterns will have multiple parts. A sleeve, a back part, the collar, and
so on. The pattern you create today is very simple, and only has one part: the bib.

<Tip>

It's a good idea to keep each part in its own file. You don't *have to* do
this, but it's a good habit to get into. 

</Tip>

## bib.mjs

Since I chose the `tutorial` preset, the development environment is preconfigured for this tutorial.

The design's main file lives in `design/src/index.mjs`, and the bib part lives in `design/src/bib.mjs`.

This `bib.mjs` is where I will be doing most of the work. 
The file that was created includes a lot of comments to provide guidance to those not using this tutorial.
I have removed those comments from the inline examples in this tutorial for clarity in our example.

The `bib.mjs` file currently looks like this:

```design/src/bib.mjs
/*
 * This function drafts the part
 */
function draftBib ({ part }) => {
  return part
}

/*
 * This is the part object
 */
export const bib = {
  name: 'tutorial.bib',
  draft: draftBib,
}
```

### The part object

Each part in FreeSewing is an object that describes the part, and has a `draft`
method to do the actual work of drafting the part.

The only mandatory keys on a part object are `name` and `draft`.

<Related>

Refer to [the part reference documentation](/reference/api/part) for 
all details about configuring the part object 
</Related>

<Note>

A design in FreeSewing is a thin wrapper around a collection of parts.
Each parts stands on its own, and parts from various designs can be combined
to create other designs.
</Note>


#### The part name

```design/src/bib.mjs
  name: 'tutorial.bib',
```

A part's `name` should be unique in a design. I used `tutorial.bib` as the
name, because that makes sense.

<Warning>

I **strongly** recommend that you apply the same `designName.partName` naming scheme in all your parts.
This avoids naming conflicts when mixing parts from various designs to create a new design.

</Warning>

#### The part's draft method

```design/src/bib.mjs
  draft: draftBib,
```

The second mandatory key on the part object is `draft` which should hold the method that drafts the part.

In the example above, it refers to the `draftBib` function that was defined at the top of the same `bib.mjs` file.

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
it. But if you are curious about what's going on inside `index.mjs`,
this is all we need:

```design/src/index.mjs
import { Design } from '@freesewing/core'
import { bib } from './bib.mjs'
import { i18n  } from '../i18n/index.mjs'

const Tutorial = new Design({
  parts: [ bib ],
})

export { bib, Tutorial, i18n }
```

If you are familiar with Javascript, I hope you are happy to see that FreeSewing uses ESM modules, and named exports.

If you are not familiar with Javascript, these `import` statements are how we load code from other files.
There's three of them:

```design/src/index.mjs
import { Design } from '@freesewing/core'
```

This loads the `Design` constructure from FreeSewing's core library.
A constructor is a function that creates something. So the `Design` constructor creates a Design.

```design/src/index.mjs
import { bib } from './bib.mjs'
```

This loads the `bib` part from the `bib.mjs` file in the same folder.
This is what we will be working on.

```design/src/index.mjs
import { i18n } from '../i18n/index.mjs'
```

And this loads something named `i18n` from the `index.mjs` file in the `i18n`
folder that's one level higher. These are the translations. 

I will show you how you can provide translations for your designs towards the
end of this tutorial.

```design/src/index.mjs
const Tutorial = new Design({
  parts: [ bib ],
})
```

This is where the magic happens. We create a new Design by passing the Design
constructure a configuration object.  All it holds is the `parts` key that is
an array of our parts.

Which goes to show that a design isn't much more than a bunch of parts.

```design/src/index.mjs
export { bib, Tutorial, i18n }
```

And then all that's left to do is export things so that people can use them.
These are named exports. We are exporting three things:

- `Tutorial` is our complete design. Exporting it means people can use it.
- `bib` is our part. We are exporting it so people can re-use just this part.
- `i18n` are the translations. We are exporting it so people can load them when using our Tutorial.

<Related>

Refer to [the design reference documentation](/reference/api/design) for 
all details about what you can pass to the Design constructor.
</Related>

