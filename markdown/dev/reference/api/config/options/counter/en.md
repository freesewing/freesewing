---
title: counter
---

For a given number of things, use a counter option.
Counters are for integers only. Things like number of buttons and so on.

## Structure

Your counter option should be a plain object with these properties:

-   `count` : The default integer value
-   `min` : The minimal integer value that's allowed
-   `max` : The maximum integer value that's allowed
-   `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

## Example

```js
options: {
  butttons: { 
    count: 7, 
    min:   4,
    max:  12 
  }
}
```
