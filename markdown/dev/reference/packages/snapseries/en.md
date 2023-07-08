---
title: snapseries
---

Published as [@freesewing/models][1], this package provides series
of common sizes for elastics and zippers and series of common intervals
to be used with snapped percentage options.

## Exports

All exports are plain objects with `metric` and `imperial` properties
that can be used as the `snap` property for snapped percentage options.

Some exports have `metric` and `imperial` properties that are
arrays of numbers.
These exports and their properties are:

- `elastics`: Arrays of common elastic widths
- `zippers`: Arrays of common zipper lengths

Other exports have `metric` and `imperial` properties that are
numbers to allow options to be _snapped_ to multiples of the value.
These exports and properties are:

- `smallSteps`: Intervals of 1 mm or 1/32 inch
- `steps`: Intervals of 5 mm or 1/8 inch
- `bigSteps`: Intervals of 10 mm or 1/2 inch

## Installation

```sh
npm install @freesewing/snapseries
```

## Example

In NodeJS:
```js
import { elastics } from @freesewing/snapseries

myOption: {
  pct: 10,
  min: 5
  max: 35,
  snap: elasitcs,
}
```

## Units

All measurements are in mm.

<Related>

Please see
[Snapped percentage options](/reference/api/part/config/options/pct/snap)
to learn more about how snapped percentage options are used.

</Related>

[1]: https://www.npmjs.com/package/@freesewing/snapseries
