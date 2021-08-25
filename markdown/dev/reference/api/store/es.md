---
title: "Store"
components: true
---

## Description

The **Store** object holds a simple key/value store with methods for storing and retrieving information. A single store per pattern is shared by all pattern parts.

A store is typically used to share information between parts. For example the length of the neck opening in one part can be used to calculate the length for the collar in another part.

<Tip>

###### The store is available as shorthand

You can access the store instance from the [Part.shorthand](./part#shorthand) method;

```js
let { store } = part.shorthand();
```

</Tip>

## get()

```js
mixed store.get(string key)
```

Returnes the value stored under `key`.

## set()

```js
void store.set(string key, mixed value)
```

Stores the value of `value` in the store under key `key`.

## setIfUnset()

```js
void store.setIfUnset(string key, mixed value)
```

Stores the value of `value` in the store under key `key`, but only if that key does not already hold a value.
