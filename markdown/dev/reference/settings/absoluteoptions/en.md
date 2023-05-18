---
title: absoluteOptions
---

The `absoluteOptions` setting holds the values for snapped percentage options.

<Tip>

The `absoluteOptions` setting is not intended to be set directly.
Instead, using _snapped percentage options_ will automatically cause
the option values to be generated.
You can access these values through the destructured `absoluteOptions`
property.

Please see the
[snapped percentage options reference](/reference/api/part/config/options/pct/snap)
for more details.

</Tip>

## Signature

```js
const settings = {
  Object absoluteOptions={}
}
```

## Example

```js
export const part = {
  name: 'example.part',
  measurements: [ 'waist' ],
  options: {
    width: {
      pct: 5, min: 1 max: 25, snap: 7,
      toAbs: (pct, { measurements }) => measurements.waist * pct,
    }
  },
  draft: ({ absoluteOptions }
  ) => {
    const garmentWidth = absoluteOptions.width * 1.1
  }
}
```
