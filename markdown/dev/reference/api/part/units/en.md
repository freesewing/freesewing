---
title: Part.units()
---

A part's `units()` method will formats a float you pass it, which should
represent a value in mm, into the units requested by the user.
The returned value is to be used in presentation only, as it will be
a string that includes the user's units.

<Tip>

###### This method is available as shorthand

You can access this units method from the [Part.shorthand](#shorthand) method:

```js
let { units } = part.shorthand();
```

</Tip>

## Part.units() signature

```js
string part.units(float number)
```

## Part.units() example

```js
export default function (part) {
  const { raise, units, measurements } = part.shorthand()

  raise.info(`Pattern drafted for a ${units(measurements.chest)} chest`)
}
```
