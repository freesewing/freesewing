---
title: vd
---

The `vd` macro adds a *vertical dimension* to your pattern.\
It is provided by the [dimension plugin](/reference/plugins/dimension/).

<Example part="point_dy">
An example of a vertical dimension
</Example>

```js
macro('vd', {
  from: points.from,
  to: points.to,
  x: 25
})
```

| Property        | Default | Type                | Description |
|----------------:|---------|---------------------|-------------|
| `from`          |         | [Point](/reference/api/point) | The startpoint of the dimension |
| `to`            |         | [Point](/reference/api/point) | The endpoint of the dimension |
| `x`             |         | Number              | The X-value at which to draw the dimension |
| `text`          | Vertical distance | Number    | The text to go on the dimension if not the from-to vertical distance |
| `id`            | auto-assigned | String | A custom ID under wich paths and points will be created |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`  | `false` | Boolean             | Whether to not draw an end marker |

<Note>

Setting a custom ID will:

-   Allow removal of the dimension with [the `rmd` macro](/reference/macros/rmd)
-   Prevent removal of the dimension with [the `rmad` macro](/reference/macros/rmad/)

</Note>
