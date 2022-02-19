---
title: Part inheritance
for: developers
about: Shows how you can use one part of your pattern as the basis for another
---

Part inheritance within your own pattern is handled via the `inject` settings in
the [pattern configuration](/reference/config/). Here is a simple example:

```js
inject: {
  front: "base",
  back: "base",

}
```

The `front` and `back` parts will be *injected* with the `base` part. As a result, both
the `front` and `back` parts will be instantiated with a cloned copy of all the points, paths,
and snippets of the `base` part.

This is a common design pattern where one part builds on another. In our example, we can imagine
a T-shirt pattern where the front and back are rather similar, apart from the neckline.
So rather than repeating ourselves, we draft a `base` part and inject that in the `front` and
`back` parts.

Using `inject` will cause FreeSewing to always draft the injected part prior to
drafting the part it gets injected to. It will, in other words, influece the draft order.

<Note>

For inheriting parts from other patterns, please refer to [Design inheritance](/howtos/code/inheritance/).

</Note>
