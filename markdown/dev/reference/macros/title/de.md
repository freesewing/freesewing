---
title: title
---

Bulk-adds snippets to your pattern.

| Property   | Default | Type                          | Description                                                                                                                              |
| ---------- |:-------:| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `at`       |         | [Point](/reference/api/point) | The point at which to insert the title                                                                                                   |
| `nr`       |         | String                        | The number of the pattern part                                                                                                           |
| `title`    |         | String                        | The name of the pattern part. If title is not set or is an empty string, this won't be rendered, and the version will go beneath the nr. |
| `prefix`   |         | String                        | A prefix to add to the created points. This allow for more than 1 title per part, as long as you give them a different prefix.           |
| `append`   | `false` | Boolean                       | Set this to `true` to append the `nr` to any text already set in Point `at`'s attributes, rather than overwrite it                       |
| `rotation` |    0    | Number                        | An optional rotation in degrees                                                                                                          |
| `scale`    |    1    | Number                        | An optional scaling factor                                                                                                               |

<Note>

The `title` macro is provided by the [title plugin](/reference/plugins/title).

</Note>



