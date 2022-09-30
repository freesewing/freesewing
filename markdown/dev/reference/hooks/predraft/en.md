---
title: preDraft
---

The `preDraft` lifecycle hook runs just before your pattern is drafted.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('preDraft', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `preDraft` hook is rarely used, but it's there if you need it.
