---
title: grainline
---

The `grainline` macro adds a _grainline_ indicator to your pattern.  
It is provided by the [grainline plugin](/reference/plugins/grainline/).

## Signature

```js
macro('grainline', {
  Point from,
  Point to,
  String text=grainline,
})
```

## Example

<Example caption="Example of the grainline indicator added by this macro">
```js
({ Point, macro, part }) => {

  macro('grainline', {
    from: new Point(0,0),
    to: new Point(100,0),
  })

  return part
}
```
</Example>


## Configuration

| Property    | Default     | Type       | Description                                  |
|------------:|-------------|------------|----------------------------------------------|
| `from`      |             | [Point][1] | The startpoint of the _grainline_ indicator  |
| `to`        |             | [Point][1] | The endpoint of the _grainline_ indicator    |
| `text`      | 'grainline' | string     | The text to put on the _grainline_ indicator |

[1]: /reference/api/point

## Notes

### Removing the grainline indicator

If you inherit a part with a grainline indicator and you'd like to remove it,
you can do so by passing `false` to the macro:

```js
macro('grainline', false)
```
