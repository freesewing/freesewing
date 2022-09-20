---
title: Design 
order: 10
---

The `Design` named export in FreeSewing's core library serves a single purpose:
To create new pattern designs.

## Design constructor

```js
import { Design } from "@freesewing/core"

const Sorcha = new Design({ 
  // design configuration here
})
```

This constructor creates a new pattern design.
It takes a single argument, an object holding the design's configuration.

## Design configuration


Since a design's configuration is managed at the part level,
the Design constructor only expects a `parts` attribute that should
hold an array of parts to include in the Design.

```js
const Sorcha = new Design({ 
  parts: [ front, back, sleeve ],
})
```

<Tip>A Design in FreeSewing is little more than a container for various Parts</Tip>

Optionally, you can also pass it a `data` attrbute 
to hold any custom data you'd like to add to your Design.

Any `data` you add to the Design constructor will be added
to [the Store](/reference/api/store).

```js
const Sorcha = new Design({ 
  parts: [ front, back, sleeve ],
  data: {
    // Your custom data here
  }
})
```

<Tip>

This Design constructor is a _super-constructor_. 
It will return a constructor method that will a pattern based on your design.

</Tip>
