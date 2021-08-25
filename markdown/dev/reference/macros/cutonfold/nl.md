---
title: cutonfold
---

Adds a *cut on fold* indicator to your pattern.

| Property    | Default | Type                          | Description                                                  |
| ----------- | ------- | ----------------------------- | ------------------------------------------------------------ |
| `from`      |         | [Point](/reference/api/point) | The startpoint of the *cut on fold* indicator                |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the *cut on fold* indicator                  |
| `margin`    | 5       | [Point](/reference/api/point) | The distance in % to keep from the start/end edge            |
| `offset`    | 50      | Number                        | The distance in mm to offset from the line from start to end |
| `grainline` | `false` | Boolean                       | Whether this cutonfold indicator is also the grainline       |

<Note>

The `cutonfold` macro is provided by the [cutonfold plugin](/reference/plugins/cutonfold).

</Note>



