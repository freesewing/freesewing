---
title: Setting a value in millimeter as a percentage option
---

Percentage options are great for parametric desing, but not always
very intuitive for the user. For example: A user may desire 13 
centimeters (5 inches) of chest ease. But what percentage should
they set the `chestEase` option to to accomplish this?

To address this common grievance, FreeSewing allows you to add a
`fromAbs` method that should take a value in millimeter and
return the percentage the option should be set to to result in this
value.

<Note>

Note that this method will not change the percentage of the option.
It will merely return return a percentage value. It is up to the 
frontend designer to then either set this value, or suggest it to
the user.

</Note>

## Structure

The `fromAbs` property should hold a function with the following 
signature:

```js
function toAbs(millimeter, settings) {
  // return a percentage here (0.5 is 50%)
}
```

The first parameter is the desired value in millimeter (for example
`130` for `13cm`).
The second parameter is the pattern's run-time configuration 
or [settings](/reference/api/settings) which holds -- among other things -- the
measurements provided by the user.


## Example

In our example above, let's say that the `chestEase` option is
a simple percentage of the `chest` measurement. Our option
configuration could like like this:

```js
chestEase: {
  pct: 8,
  min: 0,
  max: 20,
  fromAbs: function(millimeter, settings) {
    return millimeter / settings.measurements.chest
  }
}
```

With object destructuring and fat-arrow notation, 
you can write it a bit terser like this:

```js
fromAbs: (val, { measurements }) => val /measurements.chest
```

## Using pctBasedOn for simple measurement fractions

Many percentage options represent a simple fraction of a measurement 
(chest circumference in the example above).

As this scenario is so common, `@freesewing/core` exports a `pctBasedOn` method 
that will do the work for you:

```js
// First import the method
import { pctBasedOn } from '@freesewing/core'

const config = {
  // ...
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
}
```

This will not only add an `fromAbs()` method to your option -- 
one that will return the percentage of any millimeter value passed into it --
it will also add a `toAbs()` method that does the inverse: return the 
value in millimeter of whatever percentage the option is set to.
See [Reporting a percentage option value in 
millimeter](/reference/api/config/options/pct/toabs) for details.

