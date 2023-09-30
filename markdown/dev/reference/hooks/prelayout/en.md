---
title: preLayout
---

The `preLayout` lifecycle hook runs just before the pattern layout is
calculated.

This is a good place to do any business that might change the layout but relies on all the parts having been drafted

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('preLayout', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `postLayout` hook is rarely used, but it's there if you need it.
