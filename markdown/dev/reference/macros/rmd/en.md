---
title: rmd
---

The `rmd` macro removes a dimension.
It is provided by the [annotations plugin](/reference/plugins/annotations).

To be able to use this plugin, you need to give your dimension an id:

## Signature

```js
macro('rmd', { 
  String id
})
```

## Example

<Example caption="An example of the rmd macro">
```js
({ Point, macro, part }) => {

  macro('ld', {
    from: new Point(10, 0),
    to: new Point(40, 0),
    d: 5,
    id: 'da',
  })

  macro('ld', {
    from: new Point(10, 20),
    to: new Point(80, 20),
    d: 5,
    id: 'db',
  })

  macro('rmd', { id: 'db' })

  return part
}
```
</Example>

## Configuration

| Property | Default | Type     | Description |
|----------|---------|----------|-------------|
| `id`     |         | `string` | The id of the dimension to remove |
