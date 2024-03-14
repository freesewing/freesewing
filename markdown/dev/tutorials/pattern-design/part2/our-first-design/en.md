---
title: Creating a new design
order: 10
---

The development environment has already setup various designs for us.
Since I am using the **From scratch** template, the files I want to edit live 
in `design/from-scratch`.

The design's main file is `design/from-scratch/src/index.mjs`, and our bib part
will live in `design/from-scratch/src/bib.mjs`. 

This `bib.mjs` file is where will be doing most of the work here in part 2 of this
tutorial. But let's start with the `index.mjs` file as an appetizer, because this
is where a new FreeSewing design is brought to life. It looks like this:

```src/index.mjs
import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { bib } from './bib.mjs'

/*
 * Create the design
 */
const FromScratch = new Design({
  data: {
    name: 'fromScratch',
    version: '0.0.1',
  },
  parts: [bib],
})

export { bib, FromScratch, i18n }
```

Not too intimidating, is it?

## Imports

At the top of the file, we have a bunch of *imports*:

```src/index.mjs
import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { bib } from './bib.mjs'
```

An `import` is how JavaScript loads code from a different file. \
It essentially says: _import **something** from **somewhere**_:

| Something | Somewhere | Description |
| ---------:|:--------- |:----------- |
| `Design` | `@freesewing/core` | Loads the `Design` constructor from FreeSewing's core library |
| `i18n` | `../i18n/index.mjs` | Loads `i18n` from the `index.mjs` file in the `i18n` one level higher (these are the translations) | 
| `bib` | `./bib.mjs` | Loads `bib` from the `bib.mjs` file in the same folder (this is our part) |

As you can see, the *somewhere* can be different things. A local file like in
lines 2 and 3, or a package published on
[NPM](https://www.npmjs.com/package/@freesewing/core), in line 1.

It's nothing for you to worry about too much at this point, but it does help us
understand what's going on at the bottom of our file.

## Exports

The bottom holds a single `export` line:

```src/index.mjs
export { bib, FromScratch, i18n }
```

When we `export` things from our code, we allow others to `import` those things
for re-use in their code. That's how it works.

These are named exports. We are exporting three things:

- `bib` is our part. We are exporting it so people can re-use just this part.
- `FromScratch` is our complete design. Exporting it means people can use it.
- `i18n` are the translations. We are exporting it so people can load them to use with their own translation solution.

If you are not familiar with this syntax, you'll get the hang of it soon enough.

## Design constructor

Finally, the most interesting part of this file is the middle part where we are 
creating a new design:

```src/index.mjs
const FromScratch = new Design({
  data: {
    name: 'fromScratch',
    version: '0.0.1',
  },
  parts: [bib],
})
```

The `Design` that we imported on line 1 is a so-called **constructor**. 
A constructor is a function that can create things out of nothing. Or,
to be more accurate, that you can use with the `new` keyword.

<Tip compact>

It's a convention that constructor names start with an **C**apital letter.
</Tip>

We are passing some info to this `Design` function, but the `data` we are
passing is optional. If we strip that away for a moment, and don't bother 
assigning the result to a variable, we reveal the essence of what it takes to 
create a new FreeSewing design:

```src/index.mjs
new Design({
  parts: [bib],
})
```

In several places in this documentation, I will mention that *a design is not 
much more than a thin wrapper around parts*. But I feel nothing drives
that point home like seeing it in code like this.

To create a new design, we call the `Design` constructor and give it a list
(an array) or parts.

<Related>

Refer to [the design reference documentation](/reference/api/design) for 
all details about what you can pass to the Design constructor.
</Related>

That's it. So let's look at where the real action is next: Our first part.

