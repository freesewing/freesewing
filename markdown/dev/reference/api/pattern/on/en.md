---
title: Pattern.on()
---

A pattern's `on()` method allows you to attach a function to one of the
pattern's [lifecycle hooks](/reference/hooks/). It takes the
lifecycle hook's name as the first argument and the function as the second.
This method will then be triggered by the lifecycle hook.

<Note>Since FreeSewing v2.19, this method is chainable as it returns the Pattern object</Note>

## Pattern.on() signature

```js
Pattern pattern.on(string hook, function method)
```

<Tip>

Refer to [the Lifecycle hooks documentation](/reference/hooks/) for a list
of all avaialble lifecycle hooks, as well as the signature of the function you
should pass it.

</Tip>

## Pattern.on() example

```js
pattern.on('preRender', function(svg) {
  svg.style += "svg { background: yellow;}";
})
```

Your pattern now has a yellow background.

<Tip>

The [plugin guide](/guides/plugins/) contains more info on how you can use hooks

</Tip>
