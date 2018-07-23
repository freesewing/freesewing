# Models
A set of body measurement data for a range of standard models/sizes.

This is used in freesewing for comparing made-to-measure sewing patterns to a range of standard sizes.

## Install

npm install --save @freesewing/models

## Usage

```js
import { manSize38 } from @freesewing/models
```

which will give you an object with `measurement: value` pairs. 
The example above gives you:

```js
{
  bicepsCircumference:   305,
  centerBackNeckToWaist: 495,
  chestCircumference:    965,
  hipsCircumference:     838,
  naturalWaistToHip:     110,
  neckCircumference:     391,
  shoulderSlope:          49,
  shoulderToShoulder:    444,
  shoulderToWrist:       680,
  wristCircumference:    185
}
```
## Units

All measurements are in mm.

## Available models

 - manSize34
 - manSize36
 - manSize38
 - manSize40
 - manSize42
 - manSize44
