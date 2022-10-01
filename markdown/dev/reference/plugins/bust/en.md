---
title: plugin-bust
---

Published as [@freesewing/plugin-bust][1], this plugin helps you adapt menswear
patterns for people with breasts.  If you are designing a womenswear pattern,
you won't need this plugin. But if you're adapting a menswear pattern for
breasts, or merely want to accomodate both people with and without breasts,
this plugin can help you accomplish that.

## Installation

```bash
npm install @freesewing/plugin-bust
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).


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
- Changing `measurments.chestCircumference` to the value of
  `measurements.highBust`

### Use when extending breastless patterns into a with-breasts version

One way this plugin is used is to extend a menswear pattern into a womenswear
pattern.  In this case, the plugin will always be loaded since the pattern
assumes breasts will be present.

This way you can extend a menswear pattern and have it drafted with the high
bust measurement as chest measurment, after which you can create room for the
breasts.

You can see this in practice in our [Carlita][2] pattern, which extends the
menswear [Carlton][3] pattern.

<Related compact>
To learn more about extending a pattern, see [Design
inheritance](/howtos/code/inheritance/)
</Related>

### Use when creating gender-neutral patterns

To create a truly gender-neutral pattern — one that will adapt to breasts only
if they are present — you can use this plugin, but you'll also need a few other
things:

- You'll need to mark the breast measurements as [optional
  measurements](/reference/api/config/optionalmeasurements)
- You'll need to [conditionally load this
  plugin](/guides/plugins/conditionally-loading-build-time-plugins)

You can see an example of this in [our Teagan design][4].

[1]: https://www.npmjs.com/package/@freesewing/plugin-banner

[2]: https://github.com/freesewing/freesewing/blob/develop/designs/carlita/src/index.js#L12

[3]: https://github.com/freesewing/freesewing/blob/develop/designs/carlton

[4]: https://github.com/freesewing/freesewing/blob/develop/designs/teagan/src/index.js

