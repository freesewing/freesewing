---
title: utils.pctBasedOn()
---

The `utils.pctBasedOn()` function is a helper function to be used when
configuring [snapped percentage
options](/reference/api/part/config/options/pct/snap). 


## Signature

```js
object utils.pctBasedOn(String measurement)
```

## Example

```js
const options = {
  example: {
    pct: 12,
    min: 5,
    max: 18,
    snap: 3,
    ...pctBasedOn('chest')
  }
}
```

## Notes

This will return an object with `toAbs` and `fromAbs` properties that calculate
the option's absolute and relative values based on a measurement. Refer to
[snapped percentage options](/reference/api/part/config/options/pct/snap) for
more details.
