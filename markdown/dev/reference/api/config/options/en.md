---
title: options
---

The design options stored under the `options` key in the pattern configuration
file give designers flexility to make one pattern with different variations.

## The use case for (design) options

One of the things that sets FreeSewing apart is that sewing patterns are not 
static. Each pattern is generated on the spot to accommodate the input 
provided by the user. Input that typically includes their measurments.

This *made-to-measure* approach is sort of *our thing* at FreeSewing, 
but why stop there?
There's a lot of things that can be left up to the user and taken into 
consideration when drafting the pattern. Things like how many buttons to use,
whether or not to include pockets, shape of the collar, and so on. The only
limit really is the creativity of the designer.

The `options` section in a pattern's configuration file is what makes this 
possible.

## The five option types you should know

There are the five option types that an aspiring pattern designer should be
familiar with:

1. [**boolean** options][bool] are for yes/no choices
1. [**counter** options][count] are for integer values
1. [**degree** options][deg] are for degrees
1. [**list** options][list] are for a list of possible choices
1. [**percentage** options][pct] are for percentages

<Tip>

In parametric design, percentage options are by far the most common.
They also have the most features and flexibility.

</Tip>

<Related>

For the sake of completeness, here are the two other types of options:

6. [**constant** options][const] are used as
[feature flags](https://en.wikipedia.org/wiki/Feature_toggle)
6. [**millimeter** options][const] are **deprecated** (in favor of [snapped 
percentage options][snapped])

</Related>

## Features all five option types share

The five options types listed above (and the millimeter option to be complete)
share the following features:

### Default value

Each option has a default value. If the user does not specify a preference
the default value is what will be used to draft the pattern.

<Note>

How you configure the default value depends on the option type

</Note>


### Optionally hide options by configuring a `hide()` method

<Note>

##### This section applies to frontend integration

When you use FreeSewing patterns via the API -- in a backend NodeJS system
or on the command line for example -- all options can be used.

The conditional display of options is intended for frontend integration.
It is what's used on FreeSewing.org and our development environment alike, but
it is not intended as a way to block access to a given option. It merely hides it.

</Note>

By default options are shown to the user when:

 - They are not a constant option 
 - **and**
 - They are included in an optionGroup

You can further control the optional display of options by adding a method
to the `hide` key under you option, as such:

```js
myOption: {
  pct: 50,
  min: 0,
  max: 100,
  hide: function(settings) {
    if (settings.measurments.chest > 100) return true
    else return false
  }
}
```

Your `hide` method will receive one parameter that holds the run-time confguration
of your pattern, which we typically refer to as [the settings](/reference/api/settings).

It contains among other things all measurements and options chosen by the user.
So you can make a choice whether to show the option or not.

If it's not obvious from the name, your `hide()` method you should:

- Return `true` or a truthy value to hide the option
- Return `false` or a falsy value to show the option 

<Tip>

##### A `hide()` method is always present on your option

If you do not specify a `hide()` method, it will be populated with the default
`hide()` method -- which always returns `false` thus always showing the option.

In other words, the `hide()` option is always there and will always get called
to determine whether an option should be shown or not. 

</Tip>


[bool]: /reference/api/config/options/bool
[const]: /reference/api/config/options/const
[count]: /reference/api/config/options/count
[deg]: /reference/api/config/options/deg
[list]: /reference/api/config/options/list
[pct]: /reference/api/config/options/pct
[snapped]: /reference/api/config/options/pct/snap

