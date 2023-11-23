---
title: scalebox
---

The `scalebox` macro adds a _scale box_ to your pattern. This box allows users
to verify their pattern is printed to scale.
The white inside of the box provides a metric scale, and the black outside
of the box provides an imperial scale.

It is provided by [plugin-annotations](/reference/plugins/annotations), which is
part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Signature

```js
macro('scalebox', {
  String id = 'scalebox',
  Point at,
  String lead,
  Number rotate,
  String text,
  String title,
  Boolean force = false,
})
```

## Example

<Example caption="An example of the scalebox macro">
```js
({ Point, macro, part }) => {

  macro('scalebox', {
    at: new Point(0,0),
    title: 'This is the title',
    number: 666,
  })

  return part
}
```
</Example>

## Configuration

| Property    | Default | Type                | Description |
|------------:|---------|---------------------|-------------|
| `id`        | `scalebox` | `string` | The ID of this macro instance |
| `at`        |         | [Point](/reference/api/point) | The point to anchor the _scale box_ on |
| `lead`      | FreeSewing | String           | The lead text above the title |
| `title`     | _pattern name + version_ | String | The title text |
| `text`      | (\*)    | String              | The text below the title |
| `rotate`    | 0       | Number              | Rotation in degrees |
| `force`      | `false`    | `boolean`  | Set this to `true` to display the macro output even when `complete` is `false` |

(\*) `freesewingIsMadeByJoostDeCockAndContributors \n withTheFinancialSupportOfOurPatrons`

## Notes

This macro takes the `complete` setting into account and won't output anything when both complete and `force` are `false`.
