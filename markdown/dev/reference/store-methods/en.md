---
title: Store Methods
---

Store methods are typically provided by plugins and attached to
the store to make them available during the drafting process.

Some of FreeSewing's core library functionality is implemented 
as store methods to allow plugins to override this functinoality.
Examples include log handling and pattern layout algorithm.

All store methods below are either provided by plugins we maintain,
or are the default store methods as provided by the core library.

## Signature

```js
null method(object Store, object config)
```

A store method receives as its first parameter [the Store object](/reference/api/store), and
as second parameter a single configuration object for the method.

## Store methods we maintain

<ReadMore list />

