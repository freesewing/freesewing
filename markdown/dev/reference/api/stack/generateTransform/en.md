---
title: Stack.generateTransform()
---

The `Stack.generateTransform()` method generates SVG transforms for the stack,
sets them as attributes, and returns the original stack.


## Stack.generateTransform() signature

```js
Stack stack.generateTransforms(Object transforms)
```

The `Stack.generateTransforms()` method takes a single argument,
an object with the following properties containing the transforms
to apply:

| Property | Type |Description |
|----------|------|------------|
| `move`   | Object | `move.x` and `move.y` are coordinates to which the stack should be translated
| `rotate` | Number | The number of degrees to rate the stack around its center |
| `flipX`  | Boolean | Whether to flip the stack along the X axis |
| `flipY`  | Boolean | Whether to flip the stack along the Y axis |

<Note>This method is chainable as it returns the Stack object</Note>
