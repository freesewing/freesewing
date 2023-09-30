---
title: preSample
---

The `preSample` hook runs just before your pattern is sampled.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('preSample', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `preSample` hook is rarely used, but it's there if you need it.

It is triggered just before the start of either:

- the [Pattern.sampleOption()](/reference/api/pattern/sampleoption) method
- the [Pattern.sampleMeasurement()](/reference/api/pattern/samplemeasurement) method
- the [Pattern.sampleModels()](/reference/api/pattern/samplemodels) method

