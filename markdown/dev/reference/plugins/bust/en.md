---
title: plugin-bust
---

Published as [@freesewing/plugin-bust][1], this plugin helps you adapt menswear
patterns for people with breasts.  If you are designing a womenswear pattern,
you won't need this plugin. But if you're adapting a menswear pattern for
breasts or merely want to accommodate both people with and without breasts,
this plugin can help you accomplish that.

## Installation

```bash
npm install @freesewing/plugin-bust
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { bustPlugin } from '@freesewing/plugin-bust'
// or
import { pluginBust } from '@freesewing/plugin-bust'
```

To import the plugin and condition method for conditional loading:
```js
import { withCondition } from '@freesewing/plugin-bust'
```

## Notes

### Understanding the use-case for this plugin

Almost all menswear patterns use the chest circumference to draft the garment.

As a person with breasts, using your (full) chest circumference will give you
bad fit.  Instead, it's better to use your high bust measurement as chest
circumference, and then create extra room for the breasts.

This is the same technique that's used in a full-bust adjustment to fit a
womenswear pattern for a person with above-average sized breasts.

This plugin helps you by:

- Storing the chest circumference in `measurements.bust`
- Changing `measurments.chest` to the value of
  `measurements.highBust`

### Use when extending breastless patterns into a with-breasts version

One way this plugin is used is to extend a menswear pattern into a womenswear
pattern.  In this case, the plugin will always be loaded since the pattern
assumes breasts will be present.

This way you can extend a menswear pattern and have it drafted with the high
bust measurement as chest measurement, after which you can create room for the
breasts.

You can see this in practice in our [Carlita][2] design, which extends the
menswear [Carlton][3] design.

<Related compact>
To learn more about extending a design, see [Part
inheritance](/howtos/code/from/)
</Related>

### Use when creating gender-neutral designs

To create a truly gender-neutral design — one that will adapt to breasts only
if they are present — you can use this plugin, but you'll also need a few other
things:

- You'll need to include and mark the bust measurements, including `highBust`,
as [optional
  measurements](/reference/api/part/config/measurements#optionalmeasurements)
- You'll need to [conditionally load this
  plugin](/reference/api/part/config/plugins#conditional-plugins)
- You'll need to create your design such that, when appropriate,
it is able to produce the condition to cause the plugin to load

You can see an example of this in [our Teagan design][4].

### Condition for loading `withCondition`

For convenience, `plugin-bust` provides a `withCondition` named export
that is a conditional plugin, an `Object` consisting of the plugin
along with a condition method.

The condition is met if both:
1. `options.draftForHighBust` is set to `true`
2. `measurements.highBust` is set

You can use `withCondition` to conditionally load `plugin-bust`,
or you are free to instead create and use your own condition method
to pass along with the plugin.

[1]: https://www.npmjs.com/package/@freesewing/plugin-bust

[2]: https://github.com/freesewing/freesewing/blob/develop/designs/carlita/src/index.mjs#L25

[3]: https://github.com/freesewing/freesewing/blob/develop/designs/carlton

[4]: https://github.com/freesewing/freesewing/blob/develop/designs/teagan/src/index.mjs
