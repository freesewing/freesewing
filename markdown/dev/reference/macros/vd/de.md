---
title: vd
---

Adds a *vertical dimension* to your pattern.

| Property        | Default           | Type                          | Description                                                          |
| --------------- | ----------------- | ----------------------------- | -------------------------------------------------------------------- |
| `from`          |                   | [Point](/reference/api/point) | The startpoint of the dimension                                      |
| `to`            |                   | [Point](/reference/api/point) | The endpoint of the dimension                                        |
| `x`             |                   | Number                        | The X-value at which to draw the dimension                           |
| `text`          | Vertical distance | Number                        | The text to go on the dimension if not the from-to vertical distance |
| `noStartMarker` | `false`           | Boolean                       | Whether to not draw a start marker                                   |
| `noEndMarker`   | `false`           | Boolean                       | Whether to not draw an end marker                                    |

<Note>

The `vd` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>





