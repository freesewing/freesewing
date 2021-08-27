---
title: inject
---

```js
inject: {
  front: "back"
}
```

An object of key/value pairs of parts. The `value` part will be injected in the `key` part.

By *injected* we mean rather than starting out with a fresh part, you'll get a part that
has the points, paths, and snippets of the `value` part.

<Tip>

See [the Howto on Part inheritance](/howtos/code/inject) for an example.

</Tip>
