---
title: postSample
---

The `postSample` hook runs just after your pattern is sampled.

## Signature

```js
null hook(Pattern pattern)
```

## Example

```js
pattern.on('postSample', pattern => {
  // Mutate the pattern object here
}
```

## Notes

The `postSample` hook is rarely used, but it's there if you need it.

It is triggered just before the end of either:

- the [Pattern.sampleOption()](/reference/api/pattern/sampleoption) method
- the [Pattern.sampleMeasurement()](/reference/api/pattern/samplemeasurement) method
- the [Pattern.sampleModels()](/reference/api/pattern/samplemodels) method

