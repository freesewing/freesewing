---
title: boolean
---

For options where the choice is either `true` or `false`, **on** or **off**,
or **yes** or **no**, use a boolean option.

## Structure

A boolean option is a plain object with these properties:

-   `bool` : Either `true` or `false` which will be the default
-   `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

## Example

```js
options: {
  withLining: { 
    bool: true 
  }
}
```
