---
title: round
---

Rounds a corner. Note that this is only intended for 90 degree corners.

| Property | Default | Type                          | Description                                                    |
| -------- | ------- | ----------------------------- | -------------------------------------------------------------- |
| `from`   |         | [Point](/reference/api/point) | The startpoint towards the corner to round                     |
| `to`     |         | [Point](/reference/api/point) | The endpoint away from the corner to round                     |
| `via`    |         | [Point](/reference/api/point) | The corner to round                                            |
| `radius` | Maximum | Number                        | The radius in mm in not the maximum                            |
| `prefix` |         | String                        | A prefix to give to the points and paths created by this macro |
| `render` | `false` | Boolean                       | Whether to render the path created by this macro               |
| `class`  |         | String                        | Class(es) to assign to the path created by this macro          |

<Note>

The `round` macro is provided by the [round plugin](/reference/plugins/round).

</Note>



