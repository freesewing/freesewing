---
title: Stack.asProps()
---

The `Stack.asProps()` method returns a stack object suitable for renderprops.


## Stack.asProps() signature

```js
Object stack.asProps()
```

## Stack.asProps() returned object

The `Stack.asProps()` method returns an object with the following properties:

| Property | Description |
| --------:| ----------- |
| `attributes` | An `Attributes` instance holding the stack's attributes |
| `bottomRight` | A `Point` that is the bottom right of the stack's bounding box |
| `height` | Height of the bounding box of the stack in `mm` |
| `name` | The name of the stack |
| `parts` | An `Array` of the `Part`s in the stack |
| `topLeft` | A `Point` that is the top left of the stack's bounding box |
| `width` | Width of the bounding box of the stack in `mm` |
