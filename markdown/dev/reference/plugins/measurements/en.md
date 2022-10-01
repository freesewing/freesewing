---
title: plugin-measurements
---

Published as [@freesewing/plugin-measurements][1], this plugin will
provide a number of extra measurements to your pattern insofar as
they can be deduced from the measurements that are provided.

It will add the following measurements:

- `seatFront` (if both `seat` and `seatBack` are provided)
- `seatBackArc` (if both `seat` and `seatBack` are provided)
- `seatFrontArc` (if both `seat` and `seatBack` are provided)
- `waistFront` (if both `waist` and `waistBack` are provided)
- `waistBackArc` (if both `waist` and `waistBack` are provided)
- `waistFrontArc` (if both `waist` and `waistBack` are provided)
- `crossSeamBack` (if both `crossSeam` and `crossSeamFront` are available)

## Installation

```sh
npm install @freesewing/plugin-measurements
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

## Notes

The measurements plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-measurements
