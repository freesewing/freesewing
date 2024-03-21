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

## Notes

Individual attributes with a `key` containing the string `noclone` will not
be cloned and will be omitted from the new Attributes object.
