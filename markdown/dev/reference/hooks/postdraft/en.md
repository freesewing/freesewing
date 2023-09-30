---
title: postDraft
---

The `postDraft` lifecycle hook runs just after your pattern is drafted.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('postDraft', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `postDraft` hook is rarely used, but it's there if you need it.
