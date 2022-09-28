---
title: Percentage options
---

Percentage options are the bread and butter of freesewing.
Almost all your options will most likely be percentage options as
they ensure that your part will scale regardless of size.

## Structure

Your percentage option should be a plain object with these properties:

- `pct` : The default percentage
- `min` : The minimum percentage that's allowed
- `max` : The maximum percentage that's allowed

<Note>

###### Percentage options will be divided by 100 when loaded

You specify percentages in your config file. For example, `50` means 50%.
When your configuration is loaded, those percentages will be divided by 100.

So a percentage of `50` in your config file will be `0.5` when you read out that option in your part.

###### Percentage options are not limited to the range 0-100

The minimum and maximum (and default) percentages are not restricted to the range from `0%` to `100%`.
A percentage option that spans from `-25%` to `135%` is just as valid.

</Note>

<Tip>

Like all options that are configured through an object, you can 
add more properties to the options' object to implement functionality on
top of what's provided by the core library.

Refer to [extending options](/reference/api/part/config/options/extend) for
more details.

</Tip>

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

Percentage options have more advanced features that are supported by the core library.
You can unlock those features by adding the following properties to your option:

- `fromAbs`: A method to [determine the percentage based on a value in millimeter][fromabs]
- `toAbs`: A method to [return the option value in millimeter][toabs]
- `snap`: The configuration to control [snapping of percentage options][snap]

[fromabs]: /reference/api/config/options/pct/fromabs
[toabs]: /reference/api/config/options/pct/toabs
[snap]: /reference/api/config/options/pct/snap

Refer to the relevant documentation for more details:

<ReadMore />
