---
title: Part options
---

The `options` property on the part configuration object 
list the part's options:

```js
const part = {
  name: 'example.front',
  options: {
    chestEase: { pct: 12, min: 0, max: 25 },
  },
  draft: ({ part }) => part
}
```

## The use case for options

One of the things that sets FreeSewing apart is that sewing patterns are not
static. Each pattern is generated on the spot to accommodate the input
provided by the user. Input that typically includes their measurements.

This _made-to-measure_ approach is sort of _our thing_ at FreeSewing,
but why stop there?
There's a lot of things that can be left up to the user and taken into
consideration when drafting the pattern. Things like how many buttons to use,
whether or not to include pockets, shape of the collar, and so on. The only
limit really is the creativity of the designer.

The `options` section in a part's configuration is what makes this
possible.

## Types of options

These are the types of options supported by the FreeSewing core library:

1. [**boolean** options][bool] are for yes/no choices
2. [**constant** options][const] are used as [feature flags](https://en.wikipedia.org/wiki/Feature_toggle) or to hard-code certain values yet still allow them to be changed when the part is extended
3. [**counter** options][count] are for integer values
4. [**degree** options][deg] are for degrees
5. [**list** options][list] are for a list of possible choices
6. [**millimeter** options][mm] are supported but not recommended (see warning below)
7. [**percentage** options][pct] are for percentages (and can optionally be [**snapped percentage** options][snapped])

<Tip>

In parametric design, percentage options are by far the most common.
They also have the most features and flexibility.

</Tip>

<Warning>

While our core library supports millimeter (`mm`) options, 
we do not allow them in designs contributed to FreeSewing.org 
as they are a _red flag_ for poor parametric design.

If you believe you need `mm` options, look into [snapped
percentage options][snapped] instead.

</Warning>

[bool]: /reference/api/part/config/options/bool
[const]: /reference/api/part/config/options/const
[count]: /reference/api/part/config/options/counter
[deg]: /reference/api/part/config/options/deg
[list]: /reference/api/part/config/options/list
[pct]: /reference/api/part/config/options/pct
[snapped]: /reference/api/part/config/options/pct/snap
[mm]: /reference/api/part/config/options/pct/mm
