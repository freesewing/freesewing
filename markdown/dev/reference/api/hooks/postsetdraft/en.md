---
title: postSetDraft
---

The `postSetDraft` lifecycle hook runs just after a set (of settings) is
drafted. It will fire once for each set when calling `Pattern.draft()`.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('postSetDraft', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `postSetDraft` hook is rarely used, but it's there if you need it.
