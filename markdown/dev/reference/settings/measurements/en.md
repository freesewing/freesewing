---
title: measurements
---

The `measurements` settings should hold an object with the
measurements to draft the pattern for.

## Signature

```js
const settings = {
  Object measurements={
    String measurementName: Number measurementValue,
    ...
  }
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  measurements: {
    biceps: 254,
    chest: 871,
    hpsToWaistBack: 380,
    hips: 847,
    neck: 320,
    shoulderSlope: 13,
    shoulderToShoulder: 399,
    waistToHips: 120,
  }
})
```

## Notes

Measurements should always be specified in millimeter, unless it's an angle
measurement (like `shoulderSlope`) which should be provided in degrees.

<Tip>

The `measurements` settings property is used to hold __all__ measurements,
both regular measurements as well as any optional measurements.

(There is no `optionalMeasurements` settings property.)

</Tip>
