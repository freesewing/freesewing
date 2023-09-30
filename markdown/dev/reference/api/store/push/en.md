---
title: Store.push()
---

The `Store.push()` method adds the parameters you pass it to the array stored under `key`.

If `key` does not hold and Array, the Store will log a warning, but nothing will happen.

## Signature

```js
Store store.push(mixed value1, mixed value2, ...)
```

<Note compact>This method is [variadic](https://en.wikipedia.org/wiki/Variadic_function)</Note>

<Tip compact>This method is chainable as it returns the `Store` object</Tip>

## Example

```js
const store = new Store()
store.set('example', ['Hi there'])
store.push(
 'How are you doing',
 'How are YOU doing'
)
```

