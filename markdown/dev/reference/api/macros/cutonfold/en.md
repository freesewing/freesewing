---
title: cutonfold
---

The `cutonfold` macro adds a _cut on fold_ indicator to your pattern.\
It is provided by the [cutonfold plugin](/reference/plugins/cutonfold).

<Example part="plugin_cutonfold">
Example of the cut on fold indicator added by this macro
</Example>

```js
macro('cutonfold', {
  from: points.cofLeft,
  to: points.cofRight,
  grainline: true
})
```

| Property    | Default | Type                | Description |
|------------:|---------|---------------------|-------------|
| `from`      |         | [Point](/reference/api/point) | The startpoint of the _cut on fold_ indicator |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the _cut on fold_ indicator |
| `margin`    | 5       | [Point](/reference/api/point) | The distance in % to keep from the start/end edge |
| `offset`    | 15      | Number              | The distance in mm to offset from the line from start to end |
| `grainline` | `false` | Boolean             | Whether this cutonfold indicator is also the grainline |

<Note>

###### It's safe to use a corner of your pattern part for this

Since this is typically used on corners, the generated cut-on-fold indicator
will not go all the way to the `to` and `from` points.

</Note>

## Removing the cut on fold indicator

If you inherit a part with a cut on fold indicator and you'd like to remove it,
you can do so by passing `false` to the macro:

```js
macro('cutonfold', false)
```
