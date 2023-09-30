---
title: Pattern.addPart()
---

The `Pattern.addPart()` method allows you to add a part to a pattern.
It has the same effect as passing a part to the Design constructor.

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.addPart() signature

```js
Pattern pattern.addPart(object part)
```

## Pattern.addPart() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"

const extra = {
  name: 'aaron.extra',
  draft: ({ points, Point, paths, Path, part }) => {
    points.msg = new Point(50,15)
      .attr('data-text', "I am an extra part")
    paths.box = new Path()
      .move(new Point(0,0))
      .line(new Point(0,30))
      .line(new Point(100,30))
      .line(new Point(100,0))
      .close(new Point(100,0))
      .addClass('note')

    return part
  }
}

const pattern = new Aaron({
  measurements: cisFemaleAdult34
}).addPart(extra)

const svg = pattern.draft().render()
```
