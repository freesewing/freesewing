---
title: millimeter
---

While FreeSewing supports millimeter options, we recommend 
using [percentage options][1] and will not accept 
contributions that use millimeter options.

## Structure

A millimeter option should be a plain object with these properties:

 - `mm` : The default value in millimeter
 - `min` : The minimul that's allowed
 - `max` : The maximum that's allowed
 - `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

## Example

```js
options: {
  elasticWidth: { 
    mm:  35, 
    min:  5, 
    max: 80 
  }
}
```

<Comment by="joost">

##### What's wrong with millimeter options?

Millimeter options do not scale. 
Parametric design is the _raison d'être_ of FreeSewing and that core belief 
that things should seamlessly adapt goes out the window when you use a `mm` 
option because now you have a value that will not change based on the 
input measurements.

You could argue that it's fine because _you can just lower the option_
but that breaks the principle of _sensible defaults_ (aka no surprises). 
The fact that you can sidestep the bullet does not mean you're not creating 
a footgun.

When you need a millimeter option, reach for a [snapped 
percentage option][1] instead.

</Comment>

[1]: /reference/api/config/options/pct
