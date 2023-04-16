---
title: Part.attr()
---

This `Part.attr()` method can be used to add attributes to the Part object.
It calls `this.attributes.add()` under the hood, and returns the Part object.

If the third parameter is set to `true` it will call `this.attributes.set()`
instead, thereby overwriting the value of the attribute.

## Signature

```js

Part Part.attr( 
  string name,
  mixed value,
  bool overwrite = false
)

```

<Tip compact>This method is chainable as it returns the `Part` object</Tip>

## Example

<Example caption=" Example of the Part.attr() method">

```js

({ Point, points, Path, paths, part }) => {

 const part = {
  name: 'examples.attribute',
  draft: ({ attribute, part }
) =>  part.attr()
}

}

```

</Example>

