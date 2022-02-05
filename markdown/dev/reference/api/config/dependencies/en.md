---
title: dependencies
---

The `dependencies` key in the pattern configuration file allow you to configure
dependencies between different parts of your pattern.
For example, you may only be able to draft the sleeve after having drafted the 
part that contains the armhole the sleeve should fit in.

Dependencies control the order in which parts get drafted, but are also used
when users requests to [only draft some parts of a 
pattern](/reference/api/settings/only).
Behind the scenes, FreeSewing will draft all dependencies, and make sure to not
render them if they were not requested.

## Structure

A plain object of `key`-`value` pairs that controls the order in which pattern 
parts will get drafted.
The value can either be a string, or an array of strings.
Those strings should be part names.

You read the configuration as: `key` depends on `value`.

## Example

```js
dependencies: {
  front: "back",
  sleeveplacket: ["sleeve", "cuff"]
}
```

In this example:

- The `front` part depends on the `back` part
- The `sleeveplacket` part depends on the `sleeve` and `cuff` parts.

<Tip>

See [Part dependencies](/advanced/dependencies) for more in-depth information on dependencies.

</Tip>

