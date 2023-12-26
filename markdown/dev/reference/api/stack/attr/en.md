---
title: Stack.attr()
---

The `Stack.attr()` method adds an attribute to the stack
and returns the original stack.
Setting the third parameter to `true` will replace the value of the
attribute instead of adding it.

## Stack.attr() signature

```js
Stack stack.attr(
  string name,
  mixed value,
  bool overwrite = false
```

If the third parameter is set to `true` it will call
`this.attributes.set()` instead,
thereby overwriting the value of the attribute.

<Note>This method is chainable as it returns the Stack object</Note>
