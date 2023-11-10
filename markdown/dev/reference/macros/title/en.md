---
title: title
---

The `title` macro adds a title to a pattern part.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('title', {
  String id = 'title',
  String align,
  Boolean append,
  Point at,
  Boolean cutlist
  String nr,
  String prefix,
  Number rotation,
  Number scale,
  String title,
  Boolean force = false,
})
```

## Example

<Example caption="An example of the title macro">
```js
({ Point, Path, paths, macro, store, part }) => {

  // This is where name/version/etc. is supposed to be stored
  store.set('data.version', 3)
  store.set('data.name', 'Example')
  store.set('data.for', 'Person')

  macro('title', {
    nr: 9,
    title: 'The title',
    at: new Point(0,0)
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-20,-50))
    .move(new Point(80,35))

  return part
}
```
</Example>

## Configuration

| Property   | Default | Type                | Description |
| ----------:| :-----: | ------------------- | ----------- |
| `align'    | 'left'  | String              | Horizontal text alignment. Valid values: 'left', 'right', 'center' |
| `append`   | `false` | Boolean             | Set this to `true` to append the `nr` to any text already set in Point `at`'s attributes, rather than overwrite it |
| `at`       |         | [Point](/reference/api/point) | The point at which to insert the title |
| `cutlist`  | `true`  | Boolean             | Whether to include cutting instructions |
| `id`       | `title` | `string` | The ID of this macro instance |
| `nr`       |         | String              | The number of the pattern part |
| `title`    |         | String              | The name of the pattern part. If title is not set or is an empty string, this won't be rendered, and the version will go beneath the nr.|
| `prefix`   |         | String              | A prefix to add to the created points. This allow for more than 1 title per part, as long as you give them a different prefix.|
| `rotation` | 0       | Number | An optional rotation in degrees |
| `scale`    | 1       | Number | An optional scaling factor |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.

