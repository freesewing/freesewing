---
title: measurements
---

The `measurements` key in the pattern configuration file allows you to configure
the measurments that are required to draft the pattern.

## Structure

An array of strings where the strings are the names of the measurements
required to draft this pattern.

## Example

```js
measurements: [
  "bicepsCircumference",
  "centerBackNeckToWaist"
]
```

<Note>

###### Don't just make up names

See [freesewing models](https://freesewing.dev/reference/packages/models)
for a list of measurement names already used in freesewing patterns.
It is a [best practice](/guides/best-practices/reuse-measurements/) to stick to these names.

</Note>

<Related>

This configuration is for **required measurements** only.
There is a also a way to configure [optional
measurements](/reference/api/config/optionalmeasurements)

</Related>
