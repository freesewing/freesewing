---
title: Store
---

A **Store** object holds a simple key/value store with methods for storing and
retrieving data.  

## Signature

```js
Store Store.extend(Array methods=[])
```

The constructor takes a single argument, an Array of methods to add to the
store. Each entry in the array should be an array itself holding a path in
dot notation and a method. See below for an example.

## Example

```js
function myCustomMethod() {
 // Do something clever
}

const store = new Store([
  ["path.to.the.method", myCustomMethod ]
])
```  

With the configuration above, you can call `store.path.to.the.method()` and it
will run `myCustomMethod()`.

## Methods

A Store object exposes the following methods and properties:

<ReadMore list />

## Notes

A store is typically used to share information between parts. For example
the length of the neck opening in one part can be used to calculate the
length for the collar in another part.

Click below to learn more about:

- [How Stores work](/guides/patterns/store)
