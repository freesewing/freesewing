---
title: prePartDraft
---

The `prePartDraft` lifecycle hook runs just before a part is drafted.
It will fire once for each part in each set (of settings).

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('prePartDraft', pattern => {
  // Mutate the pattern object here
  // You can use the pattern.activePart 
  // and pattern.activeSet properties to
  // figure out for which part this hook was fired
}
```

## Notes

The `prePartDraft` hook is rarely used, but it's there if you need it.
