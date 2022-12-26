---
title: Lifecycle hook methods
order: 110
---

FreeSewing plugins can provide hooks, which is a way to hook into the pattern's
lifecycle.

## Signature

To provide one or more hooks, your plugin should have a `hooks` property that
is an object where the keys are the lifecycle hook name and the value holds a
method. When the lifecycle hook is triggered, your method will be called.

```mjs
const myPlugin = {
  name: 'example',
  version: '0.0.1',
  hooks: {
    hookName: function (obj, data = {}) {
    }
  }
}
```

If you want to attach multiple methods to the same lifecycle hook, you can pass
them as an array:

```mjs
const myPlugin = {
  name: 'example',
  version: '0.0.1',
  hooks: {
    hookName: [
      function one (obj, data = {}) { },
      function two (obj, data = {}) { }
    ]
  }
}
```

## Arguments

All lifecycle methods will receive two parameters:

- An object relevant to the lifecycle hook. See the [hooks API reference](/reference/hooks/) for details.
- Data passed when the hook was registered (optional)

## Notes

Refer to the [hooks API reference](/reference/hooks/) for a list of all
available lifecycle hooks.

