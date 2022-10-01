---
title: preSetDraft
---

The `preSetDraft` lifecycle hook runs just before a set (of settings) is
drafted. It will fire once for each set when calling `Pattern.draft()`.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('preSetDraft', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `preSetDraft` hook is rarely used, but it's there if you need it.
