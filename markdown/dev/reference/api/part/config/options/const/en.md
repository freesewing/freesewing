---
title: Constant options
---

If your option is a scalar value (like a string or a number),
it will be treated as a constant. Constant options are never
exposed in the frontend, but can still be set when using FreeSewing
via the API.

## Structure

Any option holding a scalar value is a constant option.

## Example

```js
const part = {
  name: 'example.front',
  options: {
    collarFactor: 4.8,
    fitCollar: false,
  },
  draft: ({ part }) => part
}
```

<Tip>

##### Why would you use this?

There are typically two use-cases for constant options:

- Rather than define constants in your code, it's good practice to set
  them in your configuration file. This way, people who use your
  part as a dependency can override them if they would like to.
- A constant option can be used as a feature-flag. Enabling or disabling
  parts of the code beyond the control of the end user, but accessible to
  developers.

</Tip>
