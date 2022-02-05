---
title: list
---

Use a list option when you want to offer an array of choices.

## Structure

Your list option should be a plain object with these properties:

 - `dflt` : The default for this option
 - `list` : An array of available values options
 - `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

## Example

```js
options: {
  cuffStyle: { 
    dflt: "angledBarrelCuff",
    list: [
      "roundedBarrelCuff",
      "angledBarrelCuff"
      "straightBarrelCuff"
      "roundedFrenchCuff"
      "angledFrenchCuff"
      "straightFrenchCuff"
    ]
  }
}
```
