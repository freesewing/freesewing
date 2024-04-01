---
title: Creating a part
order: 20
---

Much like garments themselves, patterns are made up of _parts_.
Most patterns will have multiple parts. A sleeve, a back part, the collar, and
so on. The pattern you create today is very simple, and only has one part: the bib.

<Tip>

It's a good idea to keep each part in its own file. You don't *have to* do
this, but it's a good habit to get into. 

</Tip>

## bib.mjs

I am going to use the **From scratch** template. So the files I want to edit live 
in `design/from-scratch`.

Our part lives in `design/from-scratch/src/bib.mjs`, and it currently looks like this:

```src/bib.mjs
function draftBib({ part }) {
  return part
}

export const bib = {
  name: 'fromscratch.bib',
  draft: draftBib,
}
```

## The part object

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


### The part name

```src/bib.mjs
  name: 'fromscratch.bib',
```

A part's `name` should be unique in a design. I used `fromscratch.bib` as the
name, because that makes sense.

<Warning>

I **strongly** recommend that you apply the same `designName.partName` naming scheme in all your parts.
This avoids naming conflicts when mixing parts from various designs to create a new design.

</Warning>

### The part's draft method

```src/bib.mjs
  draft: draftBib,
```

The second mandatory key on the part object is `draft` which should hold the method that drafts the part.

In the example above, it refers to the `draftBib` function that was defined at the top of the same `bib.mjs` file.

For now this function doesn't do much, but that will change soon enough.

<Note>
This structure of putting the draft method at the top of the file and
the part object at the bottom is a bit of a convention in FreeSewing.
</Note>

We'll take a deeper look at our part's draft method soon. For now, let's look at adding measurements to our part.
