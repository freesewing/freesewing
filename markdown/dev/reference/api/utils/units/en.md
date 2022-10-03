---
title: utils.units()
---

The `utils.units()` function converts the units `value` you pass it into a
formatted string for the `format` you pass it.

## Signature

```js
string utils.units(float value, string format = 'metric')
```

Format must be either `imperial` or `metric` (the default).

## Notes

A [part's `draft()` function](/reference/api/part/draft) receives a context-aware
`unit()` function that will call this function and pass it the units requested by the user.
