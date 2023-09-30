---
title: Design 
---

The `Design` named export in FreeSewing's core library is a constructor that
creates new pattern designs.

## Signature

```js
Pattern Design({
  array parts,
  object data
})
```

## Example

```js
const Sorcha = new Design({ 
  // design configuration here
})
```

This constructor creates a new pattern design.
It takes a single argument, an object holding the design's configuration.

## Design configuration

Since a design's configuration is managed at the part level,
the Design configuration object only requires a `parts` property that should
hold an array of parts to include in the Design.

```js
const Sorcha = new Design({ 
  parts: [ front, back, sleeve ],
})
```

<Tip>A Design in FreeSewing is little more than a container for various Parts</Tip>

Optionally, you can also pass it a `data` attribute
to hold any custom data you'd like to add to your Design.

Any `data` you add to the Design constructor will be added
to [the Store](/reference/api/store).

```js
const Sorcha = new Design({ 
  parts: [ front, back, sleeve ],
  data: {
    version: 3,
    price: 12,
    currency: 'euro'
  }
})
```

## Notes


The Design constructor is a _super-constructor_. 
It will return a constructor method that will a pattern based on your design.

## Properties

In addition to the returned constructor method, an instantiated Design object
also provides the following properties:

### Design.designConfig

This holds the design configuration as passed to the Design constructor.

### Design.patternConfig

Holds the resolved pattern configuration based on the configuration passed to the Design constructor.

