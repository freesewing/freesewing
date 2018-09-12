<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>

# Models
A set of body measurement data for a range of standard models/sizes.

This is used in freesewing for comparing made-to-measure sewing patterns to a range of standard sizes.

## Install

npm install --save @freesewing/models

## Usage

In node.js:

```js
import { manSize38 } from @freesewing/models
```

which will give you an object with `measurement: value` pairs. 
The example above gives you:

```js
{
  bicepsCircumference: 305,
  centerBackNeckToWaist: 495,
  chestCircumference: 965,
  headCircumference: 580,
  hipsCircumference: 838,
  hipsToUpperLeg: 202,
  naturalWaistToHip: 110,
  neckCircumference: 391,
  shoulderSlope: 49,
  shoulderToShoulder: 444,
  shoulderToWrist: 680,
  upperLegCircumference: 598,
  wristCircumference: 185
}
```

In the browser, this will register as `freesewing.models`:

```html
<script type="text/javascript" src="https://unpkg.com/freesewing"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/models"></script>
<script type="text/javascript" src="https://unpkg.com/@freesewing/pattern-brian"></script>

<script>
var pattern = freesewing.patterns.brian;
pattern.settings.measurements = freesewing.models.manSize38;
</script>
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

## Build

To build this, run:

```sh
npm run build
```

## License: MIT

See [the license file](https://github.com/freesewing/plugin-theme/blob/master/LICENSE)
for details.

