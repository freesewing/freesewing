---
title: "@freesewing/core API"
---

This is the documentation for FreeSewing's core library, published as `@freesewing/core` on NPM.
It's a complete toolbox for parametric design with a primary focus on
sewing patterns, but can be utilized for a variety of similar 2D design tasks.

## Getting started

To get started, import the library:

```js
import freesewing from '@freesewing/core'
```

<Tip>

This is the reference documentation. For a more hands-on walkthrough,
please refer to our [pattern design tutorial](/tutorials/pattern-design/)

</Tip>

## Properties

The `@freesewing/core` default export is a single object with the following properties:

-   `Design`: The [Design constructor](/reference/api/design/) to create a new design

<Note>

You will typically use the `Design()` constructor.\
The other constructors and utilities below are exported to facilitate unit testing.

</Note>

-   `Path`: The [Path constructor](/reference/api/path) to create a new path
-   `Pattern`: The [Pattern constructor](/reference/api/pattern) to create a new pattern
-   `Point`: The [Point constructor](/reference/api/point) to create a new point
-   `Snippet`: The [Snippet constructor](/reference/api/snippet) to create a new snippet
-   `utils`: A collection of [utilities](/reference/api/utils)
-   `version`: A string containing the `@freesewing/core` version number
