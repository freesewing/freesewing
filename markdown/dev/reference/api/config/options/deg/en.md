---
title: degrees
---

For angles, use a degree option.

## Structure

Your degree option should be a plain object with these properties:

 - `deg` : The default value in degrees
 - `min` : The minimul that's allowed
 - `max` : The maximum that's allowed
 - `hide` <small>(optional)</small> : A method to [control the optional display of the option][hide]

[hide]: /reference/api/config/options#optionally-hide-options-by-configuring-a-hide-method

## Example

```js
options: {
  collarAngle: { 
    deg:  85, 
    min:  60 
    max: 130 
  }
}
```
