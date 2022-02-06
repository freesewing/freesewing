---
title: Part.getId()
---

A part's `getId()` method will return an integer the can be used as an
for ID Points/Paths/Snippets. This method will ensure the ID is unique by
keeping an internal incremental counter of the IDs that have been used.
It is typically used when programatically adding points, paths, or snippets.

## Part.getId() signature

```js
int part.getId(prefix='')
```

This methiod takes an optional parameter that will be used as a prefix for the ID.

## Part.getId() example

```js
export default function (part) {
  const { Point, points } = part.shorthand()

  for (let i=0;i<10;i++) {
    const id= part.getId()
    points[id] = new Point(i*10, i*10)
  }

  // You would do more useful stuff before returning
  return part
}
```


