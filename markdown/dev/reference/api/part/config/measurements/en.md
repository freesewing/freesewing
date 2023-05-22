---
title: Part measurements
---

The `measurements` and `optionalMeasurements` properties on the
part configuration object list the part's required and optional
measurements respectively.

<Tip>You should only include what's required by the part itself, not its dependencies</Tip>

## measurements

The `measurements` property should hold the names of the measurements
that are required to draft the current part.

```js
const part = {
  name: 'example.front',
  measurements: [ 'head', 'chest' ],
  draft: ({ part }) => part
}
```

## optionalMeasurements

The `optionalMeasurements` property should hold the names of the measurements
that are optional to draft the current part.

```js
import { pluginBust } from '@freesewing/plugin-bust'

const part = {
  name: 'example.front',
  plugins: [ pluginBust ],
  measurements: [ 'head', 'chest' ],
  optionalMeasurements: [ 'highBust' ],
  draft: ({ part }) => part
}
```

<Tip>

Although they are specified via the part configuration `optionalMeasurements`
property, optional measurements are accessed via the 'measurements'
settings property.

(There is no `optionalMeasurements` settings property.)`

</Tip>
