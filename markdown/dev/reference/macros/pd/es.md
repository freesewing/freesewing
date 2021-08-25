---
title: pd
---

Adds a *path dimension* to your pattern.

| Property        | Default     | Type                        | Description                                                   |
| --------------- | ----------- | --------------------------- | ------------------------------------------------------------- |
| `path`          |             | [Path](/reference/api/path) | The path to draw the dimension along                          |
| `offset`        | 0           | Number                      | The offset at which to draw the dimension                     |
| `text`          | Path length | Number                      | The text to go on the dimension if not the length of the path |
| `noStartMarker` | `false`     | Boolean                     | Whether to not draw a start marker                            |
| `noEndMarker`   | `false`     | Boolean                     | Whether to not draw an end marker                             |

<Note>

The `pd` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>



