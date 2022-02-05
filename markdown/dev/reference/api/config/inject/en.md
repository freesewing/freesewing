---
title: inject
---

The `inject` key in the pattern configuration file allow you to configure
the rules for injecting one part into another.
By *injecting* we mean that rather than starting out with a fresh part, 
you'll get a part that has the points, paths, and snippets of the injected part.

## Structure

A plain object of key/value pairs of parts. 
The `value` part will be injected in the `key` part.

## Example

```js
inject: {
  front: "back"
}
```

In this example, the `back` part will be injected in the `front` part.
In doing so, the `front` part will start out as a copy of the `back` part.

<Tip>

See [the Howto on Part inheritance](/howtos/code/inject) for a hands-on example.

</Tip>
