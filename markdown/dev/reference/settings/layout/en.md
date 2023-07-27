---
title: layout
---

The `layout` setting allows you to control the way pattern parts are
laid out on the pattern. Either automatic, explicit, or not at all.

## Signature

```js
const settings = {
  Boolean|Object layout=true
}
```

There are 3 scenarios:

- layout is truthy: Do layout algorithmically
- layout is falsy: Do not do any layout apart from stacking all parts together
- layout is an object: Layout the parts as detailed in the layout object

## example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new aaron({
  layout: false
})
```

## Notes

### Behavior when layout is truthy

This is the default behaviour. Parts will be laid without overlap in
a space that's a small as possible.

Don't expect miracles here.
It's one of those things humans are far better at than
computers.

### Behavior when layout is falsy

This will cause all parts to be laid out on top of each other.

It is almost certainly not what you want, but having all parts piled
on top of each other in the top left corner can be a good starting
point for a custom layout.

### Behavior when layout is a layout object

This allows you to control the layout by passing a layout object.
This object should be structures as such:

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  layout: {
    width: 600,
    height: 1000,
    stacks: {
      front: {
        move: {
          x: 14,
          y: -202
        }
      },
      back: {
        rotate: 90,
        flipX: true,
        flipY, true
      }
    }
  }
});
```

For each part in the `parts` attribute of our layout object, there are 4 possible attributes:

- move: Expects an object with an `x` and `y` property, and will move the part by `x` along the X-axis and by `y` along the Y-axis
- rotate: Expects a number, and will rotate the part by number degrees around its center point
- flipX: Will flip/mirror the part horizontally
- flipY: Will flip/mirror the part vertically
