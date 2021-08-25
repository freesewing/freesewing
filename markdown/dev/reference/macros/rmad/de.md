---
title: ld
---

Adds a *linear dimension* to your pattern.

| Property        | Default         | Type                          | Description                                                        |
| --------------- | --------------- | ----------------------------- | ------------------------------------------------------------------ |
| `from`          |                 | [Point](/reference/api/point) | The startpoint of the dimension                                    |
| `to`            |                 | [Point](/reference/api/point) | The endpoint of the dimension                                      |
| `d`             | 0               | Number                        | The offset at which to draw the dimension                          |
| `text`          | Linear distance | Number                        | The text to go on the dimension if not the from-to linear distance |
| `noStartMarker` | `false`         | Boolean                       | Whether to not draw a start marker                                 |
| `noEndMarker`   | `false`         | Boolean                       | Whether to not draw an end marker                                  |

<Note>

The `ld` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>



