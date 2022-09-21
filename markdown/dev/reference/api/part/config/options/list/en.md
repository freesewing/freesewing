---
title: List options
---

Use a list option when you want to offer an array of choices.

## Structure

Your list option should be a plain object with these properties:

- `dflt` : The default for this option
- `list` : An array of available values options

<Tip>

Like all options that are configured through an object, you can 
add more properties to the options' object to implement functionality on
top of what's provided by the core library.

Refer to [extending options](/reference/api/part/config/options/extend) for
more details.

</Tip>

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

