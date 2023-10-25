---
title: Pattern
---

The `Pattern` object in FreeSewing's core library holds all data and logic of a pattern.
It is the parametric blueprint that when instantiated with a user's settings
can draft a bespoke sewing pattern.

## Creating a Pattern

A Pattern in FreeSewing is an instantiated Design:

```js
import { Florence } from "@freesewing/florence"

const pattern = new Florence()
```

You probably want to create a pattern using your own [settings](/reference/settings):

```js
import { Florence } from "@freesewing/florence"

const pattern = new Florence({
  paperless: true,
  measurements: {
    head: 390,
  }
})
```

## Multisets in FreeSewing

You can pass the Pattern constructor an array of multiple settings objects:

```js
import { Florence } from "@freesewing/florence"

const pattern = new Florence([
  {
    measurements: {
      head: 390,
    }
  },
  {
    measurements: {
      head: 420,
    }
  },
])
```

We refer to these *multiple sets of settings* as **multisets**.
It is what powers FreeSewing's [sampling capabilities](/reference/api/pattern/sample) but
it also allows you to draft some pattern parts with one set of measurements, and other parts
with another set. For example if you have an asymmetric model to fit.

<Note>

##### Core always keeps a set of settings

Multisets is an advanced feature of FreeSewing, and for the most part you can forget about it
until the day you want to use it.

However, it's good to keep in mind that under the hood, FreeSewing will always use a set of settings.
It just so happens that in most cases, there will be only one settings object in the set.

</Note>

## Pattern attributes

- `Pattern.activePart`: Holds the id of the active part (while drafting)
- `Pattern.activeSet`: Holds the id of the active set (while drafting)
- `Pattern.config`: Holds the resolved pattern's configuration
- `Pattern.designConfig`: Holds the design's configuration before resolution
- `Pattern.parts`: Holds the parts used in the pattern
- `Pattern.plugins`: Holds the plugins used in the pattern
- `Pattern.settings`: Holds the settings used for the pattern
- `Pattern.stacks`: Holds the stacks used in the pattern
- `Pattern.store`: Holds the pattern-wide Store
- `Pattern.setStores`: Holds an array of stores, one for each set of settings.

## Pattern methods

<ReadMore list />
