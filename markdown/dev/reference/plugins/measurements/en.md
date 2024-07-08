---
title: plugin-measurements
---

Published as [@freesewing/plugin-measurements][1], this plugin will
provide a number of extra measurements to your design insofar as
they can be deduced from the measurements that are provided.

It will add the following measurements:

- `seatFront` (if both `seat` and `seatBack` are provided)
- `seatBackArc` (if both `seat` and `seatBack` are provided)
- `seatFrontArc` (if both `seat` and `seatBack` are provided)
- `waistFront` (if both `waist` and `waistBack` are provided)
- `waistBackArc` (if both `waist` and `waistBack` are provided)
- `waistFrontArc` (if both `waist` and `waistBack` are provided)
- `crossSeamBack` (if both `crossSeam` and `crossSeamFront` are provided)

<Related compact>
For more information about these extra measurements, please see
[Measurements from `plugin-measurements`](/reference/measurements#measurements-from-plugin-measurements)
</Related>

## Installation

```sh
npm install @freesewing/plugin-measurements
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { measurementsPlugin } from '@freesewing/plugin-measurements'
// or
import { pluginMeasurements } from '@freesewing/plugin-measurements'
```

## Notes

The measurements plugin is part of our [core-plugins bundle](/reference/plugins/core)

[1]: https://www.npmjs.com/package/@freesewing/plugin-measurements
