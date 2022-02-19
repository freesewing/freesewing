---
title: percentage
---

Percentage options are the bread and butter of freesewing.
Almost all your options will most likely be percentage options as
they ensure that your pattern will scale regardless of size.

## Structure

Your percentage option should be a plain object with these properties:

-   `pct` : The default percentage
-   `min` : The minimum percentage that's allowed
-   `max` : The maximum percentage that's allowed
-   `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]
-   `fromAbs` <small>(optional)</small> : A method to [determine the percentage based on a value in millimeter][fromabs]
-   `toAbs` <small>(optional)</small> : A method to [return the option value in millimeter][toabs]
-   `snap` <small>(optional)</small> : The configuration to control [snapping of percentage options][snap]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

[fromabs]: /reference/api/config/options/pct/fromabs

[toabs]: /reference/api/config/options/pct/toabs

[snap]: /reference/api/config/options/pct/snap

<Note>

###### Percentage options will be divided by 100 when loaded

You specify percentages in your config file. For example, `50` means 50%.
When your configuration is loaded, those percentages will be divided by 100.

So a percentage of `50` in your config file will be `0.5` when you read out that option in your pattern.

###### Percentage options are not limited to the range 0-100

The minimum and maximum (and default) percentages are not restricted to the range from `0%` to `100%`.
A percentage option that spans from `-25%` to `135%` is just as valid.

</Note>

## Example

Below is a simple example:

```js
options: {
  acrossBackFactor: { 
    pct:  97, 
    min:  93, 
    max: 100 
  }
}
```

## Advanced use

Percentage options have a few more tricks up their sleeve:

<ReadMore />
