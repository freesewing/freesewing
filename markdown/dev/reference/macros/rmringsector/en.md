---
title: rmringsector
---

The `rmringsector` macro removes the nodes added by [the ringsector macro](/reference/macros/ringsector).
It is the recommended way to remove (the effects of) a `ringsector` macro.

It is provided by the [ringsector plugin](/reference/plugins/ringsector).

<Note>
##### Not a core-plugins macro

The `rmringsector` macro is not provided by the [core-plugins](/reference/plugins/core),
so you need to load the [ringsector plugin](/reference/plugins/ringsector) explicitly
if you want to use it.
</Note>

## Signature

```js
macro('rmringsector', String id = 'ringsector')
```

## Example

<Example caption="Example of a ring sector removed by this macro">
```js
({ Point, macro, Path, paths, part }) => {

  macro('ringsector', {
    angle: 60,
    insideRadius: 30,
    outsideRadius: 45,
  })
  macro('rmringsector')

  return part
}
```
</Example>

## Configuration

| Property | Default      | Type   | Description |
|---------:|--------------|--------|-------------|
| `id`     | `ringsector` | String | The id of the ringsector macro to remove |

## Notes

### Nodes removed by this macro

This macro will remove points and a single path from your part.
Their IDs have been saved in store under:
`parts.{part.name}.macros.@freesewing/plugin-ringsector.ids.{id}`
by the [the ringsector macro](/reference/macros/ringsector).

