---
title: postLayout
---

The `postLayout` lifecycle hook runs just after the pattern layout is
calculated.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('postLayout', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `postLayout` hook is rarely used, but it's there if you need it.
