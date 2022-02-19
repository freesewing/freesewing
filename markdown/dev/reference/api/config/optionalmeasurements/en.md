---
title: optionalMeasurements
---

The `optionalMeasurements` key in the pattern configuration file allows
you to configure measurments that are optional to draft the pattern.

## Structure

An array of strings where the strings are the names of the optional
measurements.

## Example

```js
optionalMeasurements: [
  'highBust'
]
```

<Note>

###### Why would you want optional measurements?

This is often used in combination with [the bust plugin](/reference/plugins/bust/) to
allow a pattern to be drafted to the `highBust` measurement rather than the
`chest` measurement, thereby providing better fit for people with breasts.

</Note>
