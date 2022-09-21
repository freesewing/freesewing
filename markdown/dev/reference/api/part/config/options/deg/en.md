---
title: Degree options
---

For angles, use a degree option.

## Structure

Your degree option should be a plain object with these properties:

- `deg` : The default value in degrees
- `min` : The minimul that's allowed
- `max` : The maximum that's allowed

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
  collarAngle: { 
    deg:  85, 
    min:  60 
    max: 130 
  }
}
```
