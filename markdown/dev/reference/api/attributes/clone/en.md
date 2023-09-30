---
title: Attributes.clone()
---

The `Attributes.clone()` method returns a new Attributes object that is a deep
copy of this one.

## Signature

```js
Attributes attributes.clone()
```

## Example

```js
const attr = new Attributes()
  .add('class', 'classA')
  .add('class', 'classB')

const cloned = attr.clone()
```

