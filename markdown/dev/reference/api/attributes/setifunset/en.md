---
title: Attributes.setIfUnset()
---

The `Attributes.setIfUnset()` method sets the attribute identified by `key` to
value `value` but only if it's currently unset (`undefined`).

## Signature

```js
Attributes attributes.setIfUnset(string key, string value)
```

## Example

```js
const attr = new Attributes()
  .setIfUnset('class', 'classA')
  .setIfUnset('class', 'classB')

const class = attr.get('class')
// class now holds: "classA"
```

## Notes

This will never overwrite any value and thus is a safe way to set attributes
