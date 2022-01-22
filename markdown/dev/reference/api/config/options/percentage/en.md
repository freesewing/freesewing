---
title: percentage
---

Percentage options are the bread and butter of freesewing.
Almost all your options will most likely be percentage options as
they ensure that your pattern will scale regardless of size.

Percentage options come in two varieties:

- Plain percentage options
- Snapped percentage options

For both varieties, the following is good to keep in mind:

<Note>

###### Percentage options will be divided by 100 when loaded

You specify percentages in your config file. For example, `50` means 50%.
When your configuration is loaded, those percentages will be divided by 100. 

So a percentage of `50` in your config file will be `0.5` when you read out that option in your pattern.

###### Percentage options are not limited to the range 0-100

The minimum and maximum (and default) percentages are not restricted to the range from `0%` to `100%`.
A percentage option that spans from `-25%` to `135%` is just as valid.

</Note>

## Plain percentage options

A plain percentage option allows a user to specify a relative value (a percentage) which is
then used to produce an absolute value in mm based on one or more measurements.

A plain percentage option should be an object with these properties:

 - `pct` : The default percentage
 - `min` : The minimum percentage that's allowed
 - `max` : The maximum percentage that's allowed

```js
options: {
  acrossBackFactor: { 
    pct:  97, 
    min:  93, 
    max: 100 
  }
}
```

## Snapped percentage options

A snapped percentage option should be an object with these properties:

 - `pct` : The default percentage
 - `min` : The minimum percentage that's allowed
 - `max` : The maximum percentage that's allowed
 - `snap`: See below
 - `toAbs`: See below

```js
options: {
  acrossBackFactor: { 
    pct:  97, 
    min:  93, 
    max: 100 
    snap: 5,
    toAbs: (val, { measurements }) => measurements.head * val
  }
}
```

### How snapped percentage options work

In a so-called _snapped percentage option_ the absolute (i.e. not relative) value
of the option is snapped to discreet values ("snap points"). To make that happen,
the following happens under the hood:

- Use `toAbs()` to calculate an absolute value for the option
- See whether that approaches one of the absolute values provided by `snap` 
- If so, use the snapped value
- If not, use the absolute value unchanged

If you're head's spinning, here's an image that will hopefully clarify things a bit:

![A visual guide to how snapped percentage options work](snap.png)

The gradient box represents the range of any given measurement, 
from dolls all the way on the left, to giants all the way on the right.
The sort of middle green-colored region is what the designer had in mind 
when designing the pattern, and they have set up snap points for values 
that they feel make sense.

The region of influence of any given snap point will extend 50% towards its 
neighbor on both sides (indicated by the dashed lines).This means that the 
region of snap points is continuous, once you're in, you're going to be 
snapped to one of the snap points.

However, when you venture out into the area where the designer did not 
configure any snap points, the absolute value will be used as-is, without
snapping, just as it would in a normal percentage option.

This system results in the best of both worlds:

- Things like elastic widths and so on can be configured to be fixed values, 
  of common elastic widths for example
- The absolute value will still scale up and down, but will snap to the closest 
  fixed value when appropriate.
- When the input measurements go somewhere the designer did not anticipate, 
  the option will just behave as a regular `pct` option


### What does it take?

To make all this work, we need to clarify what we want to happen.
Specifically, we need to:

- Configure the `snap` property to define what values to snap to
- Pass a method to the `toAbs` property that will calculate the absolute value of the option

#### Configure the `snap` property to define what values to snap to

There are three different scenarios:

##### snap is a number

In this case, the **absolute value** of the option will be *snapped* to a 
multiple of this value. 

An example:

```js
myOption: {
  pct:5,
  min: 0
  max: 35,
  snap: 7
}
```

The absolute value of this option will be set to a multiple of `7` 
(so one of `7`, `14`, `21`, `28`, `35`, ...)

<Note>

In a case like this, the value will **always** be snapped, 
because the snap points will be distributed equally across the entire range 
of all possible inputs.

</Note>

##### snap is an array of numbers

This will snap the **absolute value** of the option to one of the numbers in the
array/list if it is in the region of influence.

An example:

```js
myOption: {
  pct:5,
  min: 0
  max: 35,
  snap: [7, 12, 21, 34, 53, 64 ]
}
```

In this case, if the absolute value returned by `toAbs` is in the region of influence (in
this example between 4.5 and 69.5), the nearest snap point will be used. If instead it is
outside the region of influence, it will be used unchanged.

##### snap is an object with `metric` and `imperial` properties that each hold an array of numbers

This will work the same as an array of numbers, but it allows you to supply a 
different array/list for users drawing metric, or imperial patterns. 

An example config:

```js
myOption: {
  pct:5,
  min: 0
  max: 35,
  snap: {
    metric: [7, 12, 21, 34, 53, 64 ],
    imperial: [25.4, 50.8, 76.3 ],
  }
}
```

In this case, the value of [settings.units](/api/settings/units) will determine which
list of snap points to use. If the absolute value returned by `toAbs` is in the region of
influence, the nearest snap point will be used. If instead it is outside the region of
influence, it will be used unchanged.

#### Pass a method to the `toAbs` property that will calculate the absolute value of the option

Our snap configuration depends on the **absolute value** of the option.
But we only receive the percentage value as input. It's up to us to come up
with the logic to turn that into its absolute value.

For this, `pct` options take the `toAbs` property that is a function with 
the following signature:

```js
function toAbs(pctValue, settings) {
  // return absolute value here
}
```
The first parameter is the percentage value provided by the user (for example
`0.5` for `50%`),
the second is the pattern's settings object which (among other things) 
holds the measurements.

In the most common scenario, your option is a simple fraction of a measurement 
(head circumference in the example below), so with object destructuring 
and fat-arrow notation, you can write it a bit terser like this:

```js
toAbs: (val, { measurements }) => measurements.head * val
```

As this scenario is so common, `@freesewing/core` now exports a `pctBasedOn` method 
that you can spread into your option config.

Here's an example from our Paco pattern:

First import the method:

```js
import { pctBasedOn } from '@freesewing/core'
```

Then use it in your option with the name of the measurement the option depends on:

```js
ankleElastic: {
   pct: 5, min: 1, max: 13,
   snap: {
     metric: [ 5, 10, 12, 20, 25, 30, 40, 50, 80 ],
     imperial: [ 6.35, 9.525, 12.7, 15.24, 19.05, 25.4, 30.48, 50.8, 76.2],
   },
   ...pctBasedOn('waistToFloor')
 },
```

<Note>

##### This does more under the hood for future use

This will not only add an `toAbs()` method to your option that calculates the 
absolute value based on the measurement you specify. It will also add a `fromAbs()` 
method that does the inverse: return the `pct` value required to achieve a certain 
absolute value.

This ability to set a percentage option to whatever is required for a given absolute
value is on our roadmap, so by using this method you are future-proofing your code.

</Note>

### How to use this in your pattern code

This is all well and good, but how do you use this?

Well, just like you can get the `options` object from our shorthand call, 
you can now get the `absoluteOptions` object that holds absolute values 
for those options with snaps configured.

In our paco example, what used to be:

```js
store.set('ankleElastic', measurements.waistToFloor * options.ankleElastic)
```

is now:

```js
store.set('ankleElastic', absoluteOptions.ankleElastic)
```

<Note>

There's really no added value in setting this in the store as `absoluteOptions` 
is available everywhere, but we've changed as little as possible in the example
to clarify the difference.

</Note>

### When to use this in your pattern code

Don't go rushing out turning every `pct` option into a snapped percentage option. 
This makes sense in scenarios where you would be tempted to reach for a `mm` option. 
Elastic width, waistband width, button size, other things that come in certain 
sizes, you get the idea.

