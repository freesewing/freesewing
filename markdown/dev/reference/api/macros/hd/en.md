---
title: hd
---

The `hd` macro adds a *horizontal dimension* to your pattern.  
It is provided by the [dimension plugin](/reference/plugins/dimension/).

<Example part="point_dx">
An example of a horizontal dimension
</Example>

```js
macro('hd', {
  from: points.from,
  to: points.to,
  y: 25
})
```

| Property        | Default  | Type                | Description | 
|----------------:|----------|---------------------|-------------|
| `from`          |          | [Point](/reference/api/point) | The startpoint of the dimension |
| `to`            |          | [Point](/reference/api/point) | The endpoint of the dimension |
| `y`             |          | Number              | The Y-value at which to draw the dimension |
| `id`            | auto-assigned | String | A custom ID under wich paths and points will be created |
| `text`          | Horizontal distance | Number   | The text to go on the dimension if not the from-to horizontal distance |
| `noStartMarker` | `false`  | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false`  | Boolean             | Whether to not draw an end marker |

<Note>

Setting a custom ID will:

 - Allow removal of the dimension with [the `rmd` macro](/reference/macros/rmd)
 - Prevent removal of the dimension with [the `rmad` macro](/reference/macros/rmad/) 

</Note>

