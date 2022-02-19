---
title: "Store"
components: true
order: 70
---

The **Store** object holds a simple key/value store with
methods for storing and retrieving information.\
A single store per pattern is shared by all pattern parts.

A store is typically used to share information between parts. For example
the length of the neck opening in one part can be used to calculate the
length for the collar in another part.

The `Store` object exposes the following methods:

<ReadMore list />

<Tip>

###### The store is available as shorthand

You can access the store instance from the [Part.shorthand](/reference/api/part/shorthand/) method;

```js
let { store } = part.shorthand();
```

</Tip>
