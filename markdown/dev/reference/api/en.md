---
title: Core API
for: developers
icons: 
  - javascript
  - terms
about: FreeSewing's core API reference documents all available methods and objects
---

```js
import freesewing from '@freesewing/core'
```

The `@freesewing/core` default export is a single object with the following properties:

 - `version`: A string containing the FreeSewing version number
 - `Design()`: A *super-constructor* to create new pattern designs.
 - `Pattern()`: The `Pattern` constructor
 - `Point()`: The `Point` constructor
 - `Path()`: The `Path` constructor
 - `Snippet()`: The `Snippet` constructor
 - `utils`: A collection of utilities
 - `patterns`: FIXME: Explain use-case
 - `plugins`: FIXME: Explain use-case

<Tip>

You will typically only use the `Design()` super-constructor.

The other constructors and utilities are exported to facilitate unit testing.  

</Tip>

