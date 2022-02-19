---
title: Using hooks without a plugin
order: 85
---

You can attach a method to a hook at run-time without the need for a plugin
using the [Pattern.on()](/reference/api/pattern/on) method.

The method takes the hook name as its first argument, and the hook method as its second.

Below is an example:

```js
pattern.on('preRender', function(svg) {
  svg.style += "svg { background: yellow;}";
});
```

Congratulations, you've just made your pattern yellow.
