---
title: Attributes
---

An Attributes object holds attributes for a variety of other objects.

## Signature

```js
Attributes new Attributes()
```

The Attributes constructor takes no arguments.

## Methods
An Attributes object exposes the following methods:

<ReadMore list />

## Notes

Attributes are attached to [`Point`](/reference/api/point),
[`Path`](/reference/api/path), and [`Snippet`](/reference/api/snippet) objects,
as well as the internal [`Svg`](/reference/api/svg) object.

All of these have an instantiated Attributes object in their `attributes`
property, as well as a number of (chainable) helper methods to manipulate the
attributes. You will typically use these higher-level method and thus are
unlikely to interact with an Attributes object directly.
