---
title: gore
---

The `gore` macro facilitates the drafting of [gores][1] which are typically
used in hats.
It is provided by the [gore plugin](/reference/plugins/grainline/).

## Signature

```js
macro('gore', { 
  Point from,
  Number radius,
  Number gores,
  Number extraLength,
  Boolean hidden=true,
  String class='',
)
```

## Example

<Example caption="Example of the gore macro">
```js
({ Point, macro, part }) => {

  macro('gore', { 
    from: new Point(0,0),
    radius: 100,
    gores: 6,
    extraLength: 20,
    hidden: false,
    class: 'fabric',
  })
  
  return part
}
```
</Example>

## Configuration

| Property      | Default | Type       | Description                                  |
|--------------:|---------|------------|----------------------------------------------|
| `from`        |         | [Point][2] | The point to start drafting the gore from |
| `radius`      |         | number     | The radius of the sphere the gores should cover |
| `gores`       |         | number     | The text to put on the _grainline_ indicator |
| `extraLength` |         | number     | The length of the straight section after a complete semisphere |
| `hidden`      | `true`  | boolean    | Whether or not to hide the generated path |
| `class`       |         | boolean    | Any classes to add to the generated path |

[1]: https://en.wikipedia.org/wiki/Gore_\(segment\)

[2]: /reference/api/point
