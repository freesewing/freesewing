---
title: flag.info()
---

This flags information at the `info` level.

Info that is flagged is stored in the store under `plugins.plugin-annotations.flags.info`.
The core library does nothing with this info, it is merely stored, much like logs are.

However, in our own UI on FreeSewing.org, we use this mechanism to allow
designer to flag information to the user, and even suggest changes to the
pattern configuration.


## Signature

```js
undefined Store.flag.info({
  title: 'flag:expandIsOn.t',
  desc: 'flag:expandIsOn.d',
  suggest: {
    text: 'flag:disable',
    icon: 'expand',
    update: {
      settings: ['expand', null],
    },
  },
})
```

Since these methods are not part of FreeSewing's core API, what you pass to this method does depend on your own implementation.
The example above is from our implementation, which uses the following properties:

## Configuration

| Property   | Type                | Description |
| ----------:| ------------------- | ----------- |
| `id`       | String              | An ID for this flag message. If none is provided, `title` will be used |
| `title`    | String              | The title of the message |
| `desc`     | String              | The description of the message |
| `suggest.text`  | String              | Text to go on the button to implement the suggested configuration change |
| `suggest.icon`  | String              | Icon name to go on the button to implement the suggested configuration change |
| `suggest.update` | Object             | Object describing the changes to apply to the configuration if the user accepts the suggestion |

Note that the `suggest` object is optional. Without it, it will merely display a message to the user.
However, when a suggest key is present, a button will be created that the user can click to accept the suggested changes.

## Example

```js
({ store, part }) => {
  store.flag.info({
    msg: `aaron:cutNeckBinding`,
    notes: ['flag:saUnused', 'flag:partHiddenByExpand'],
    replace: {
      width: units(w),
      length: units(l),
    },
    suggest: {
      text: 'flag:show',
      icon: 'expand',
      update: {
        settings: ['expand', 1],
      },
    },
  })

  return part
}
```

