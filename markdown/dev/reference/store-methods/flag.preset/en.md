---
title: flag.preset()
---

The `flag.preset()` method is a way to flag a pre-defined flag object.
There are currently two such pre-defined flags provided by the annotations-plugin:

- `expandIsOn`
- `expandIsOff`

They inform the user about the effect of the `expand` setting on the pattern, when `expand`
is on or off respectively.

## Signature

```js
undefined Store.flag.preset(string preset)
```

Since these methods are not part of FreeSewing's core API, what you pass to this method does depend on your own implemntation.
The example above is from our implementation, which uses the following properties:

## Configuration

| Property   | Type                | Description |
| ----------:| ------------------- | ----------- |
| `preset`   | String              | The ID of an existing preset |

## Example

```js
({ store, expand,  part }) => {
  store.flag.preset(expand
    ? 'expandIsOn'
    : 'expandIsOff'
  )

  return part
}
```

