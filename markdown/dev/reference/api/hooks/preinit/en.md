---
title: preInit
---

The `preInit` lifecycle hook runs just before a pattern will be initialized.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('preInit', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `preInit` hook is rarely used, but it's there if you need it.
