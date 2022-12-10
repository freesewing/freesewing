---
title: gore
---

The `gore` macro facilitates the drafting of [gores][1] to create spherical or other roundish objects. They are are typically used in hats.
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
  String prefix='',
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
| `gores`       |         | number     | The number of gores into which the sphere is divided |
| `extraLength` |         | number     | The length of the straight section after a complete semisphere |
| `hidden`      | `true`  | boolean    | Whether or not to hide the generated path |
| `class`       |         | boolean    | Any classes to add to the generated path |
| `prefix`      |         | string     | A prefix to apply to the names of the generated path and points |

## Result

| Generated Element | Description |
|------|-------------|
| `paths.${prefix}seam` | The Path for the gore |
| `points.${prefix}p1` | Point for the gore tip |
| `points.${prefix}p2` | Point between the tip and side corner |
| `points.${prefix}p3` | Point for the gore side corner |
| `points.${prefix}Cp1` | Control Point used to create the curved path |
| `points.${prefix}Cp2` | Control Point used to create the curved path |

[1]: https://en.wikipedia.org/wiki/Gore_\(segment\)

[2]: /reference/api/point
