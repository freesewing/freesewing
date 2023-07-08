---
title: Reporting a percentage option value in millimeter
---

Percentage options are great for parametric design, but not always
very intuitive for the user. For example: Setting the `chestEase`
option to `9%` is not very meaningful unless you happen to know
what that percentage is based on.

To address this common grievance, FreeSewing allows you to add a
`toAbs` method that should return the value of the option in
millimeter.

## Structure

The `toAbs` property should hold a function with the following
signature:

```js
function toAbs(percentage, settings, mergeOptions) {
  // return value in millimeter here
}
```

The first parameter is the percentage value provided by the user (for example
`0.5` for `50%`).

The second parameter holds the pattern's [settings](/reference/settings) object
which holds -- among other things -- the measurements provided by the user.

The third parameter should be the return value of
[utils.mergeOptions()](/reference/api/utils/mergeoptions), which provides an
object with all option values populated. Although this parameter is not
required for simple values based on measurements, it is often required when the
result depends on several options.

## Example

In our example above, let's say that the `chestEase` option is
a simple percentage of the `chest` measurement. Our option
configuration could like like this:

```js
chestEase: {
  pct: 8,
  min: 0,
  max: 20,
  toAbs: function(value, settings) {
    return settings.measurements.chest * value
  }
}
```

With object destructuring and fat-arrow notation,
you can write it a bit terser like this:

```js
toAbs: (val, { measurements }) => measurements.chest * val
```

## Using pctBasedOn for simple measurement fractions

Many percentage options represent a simple fraction of a measurement
(chest circumference in the example above).

As this scenario is so common, `@freesewing/core` exports a `pctBasedOn` method
that will do the work for you:

```js
// First import the method
import { pctBasedOn } from '@freesewing/core'

options: {
  chestEase: {
    pct: 8,
    min: 0,
    max: 20,
    // Pass the measurement name as parameter
    // and spread the return value into your option
    ...pctBasedOn('chest')
  }
}
```

This will not only add an `toAbs()` method to your option -- one that will return
the value in millimeter of whatever percentage the option is set to -- it will
also add a `fromAbs()` method that does the inverse: return the percentage of
any millimeter value passed into it.

See [Setting a value in millimeter as a
percentage option](/reference/api/part/config/options/pct/fromabs) for details.
