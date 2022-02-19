---
title: Part dependencies
for: developers
about: Shows you how to create dependencies between pattern parts
---

Part dependencies are set in the [pattern configuration](/reference/config), and
control the order in which parts are drawn. FreeSewing will make sure
that before drafting a part, it will first draft all its dependencies.

Let's look at an example:

```js
dependencies: {
  front: "base",
  back: "base",
  sleeve: ["front", "back"]
}
```

This could be from a T-shirt pattern where the `front` and `back` patterns are very similar,
so they both are inheriting a `base` part.
In addition, the `sleeve` part needs to be drafted after the `front` and `back` part because
in `front` and `back` we store the length of the armhole seam in the [store](/reference/api/store) and
we need that info to fit the sleevecap to the armhole.

Now if a user requests to draft only the `sleeve` part, FreeSewing will still draft:

-   First the `base` part
-   Then the `front` and `back` parts
-   Finally the `sleeve` part

but it will only render the `sleeve` part, as that's the only thing the user requested.

<Note>

For inheriting parts, please refer to [part inheritance](/howtos/code/inject/).

</Note>
