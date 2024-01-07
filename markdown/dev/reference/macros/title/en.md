---
title: title
---

The `title` macro adds a title to a pattern part.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('title', {
  String align = 'left',
  Boolean append = false,
  Point at,
  String brand = 'FreeSewing',
  Boolean cutlist = true,
  Number dy = 8,
  Boolean force = false,
  String id = 'title',
  Mixed notes = false,
  String nr,
  Number rotation = 0,
  Number scale = 1,
  String title = 'plugin-annotations:noName',
  classes = {
    String date: 'text-sm fill-current',
    String name: 'fill-note',
    String notes: 'text-md fill-current',
    String nr: 'text-4xl fill-note font-bold',
    String title: 'text-lg fill-current font-bold',
  }
})
```

## Example

<Example caption="An example of the title macro">
```js
({ Point, Path, paths, macro, store, part }) => {

  // This is where name/version/etc. is supposed to be stored
  store.set('data.version', 3)
  store.set('data.name', 'Example')
  store.set('data.for', 'Sorcha')

  macro('title', {
    nr: 8,
    title: 'The Title',
    at: new Point(0,0),
    brand: 'Bazooka Crew',
    notes: [
      "You can use any brand you want",
      "\n",
      "but if you plan to contribute your",
      "\n",
      "design, you should use the default",
      "\n",
      "(btw: These are the notes)"
    ]
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-20,-50))
    .move(new Point(120,55))

  return part
}
```
</Example>

## Configuration

| Property   | Default | Type                | Description |
| ----------:| :-----: | ------------------- | ----------- |
| `align`    | `left`  | String              | Horizontal text alignment. One of `left`, `right`, or `center` |
| `append`   | `false` | Boolean             | Set this to `true` to append the `nr`, rather than overwrite it |
| `at`       |         | [Point](/reference/api/point) | The point at which to insert the title |
| `brand`    | `FreeSewing`  | String | Brand name will prefix the design name |
| `classes.date`  | `text-sm fill-current`  | String | CSS classes for the date |
| `classes.name`  | `fill-note`  | String | CSS classes for the name |
| `classes.notes`  | `text-md fill-current`  | String | CSS classes for the notes |
| `classes.nr`  | `text-4xl fill-note font-bold`  | String | CSS classes for the nr |
| `classes.title`  | `text-lg fill-current font-bold`  | String | CSS classes for the title |
| `cutlist`  | `true`  | Boolean             | Set this to `true` to prepend notes with the cutting instructions |
| `dy`       | `8`     | Number              | SVG-equivalent of line height, controls the vertical spacing between text lines |
| `force`    | `false` | `boolean`           | Set this to `true` to display the macro output even when `complete` is `false` |
| `id`       | `title` | `string` | The ID of this macro instance. See [Removing macros and the role of the macro id](/reference/macros#removing-macros-and-the-role-of-the-macro-id) |
| `notes`    | | String | Any notes to go under the title |
| `nr`       |         | String              | The number of the pattern part |
| `rotation` | `0`     | Number              | Rotation in degrees |
| `scale`    | 1       | Number              | An optional scaling factor to make the title bigger/smaller |
| `title`    | `plugin-annotations:noName` | String | The name of the pattern part |
| `prefix`   |         | String              | A prefix to add to the created points. This allow for more than 1 title per part, as long as you give them a different prefix.|


## Notes

- This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.
- This macro will check the value of `store.version` and `store.name` for the design version and name. These are auto-set by core.
- This macro will check the value of `store.for` for info of who this pattern was generated for. This is something to be done at run-time by your frontend.

