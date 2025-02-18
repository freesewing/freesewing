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
  notes: [
    'sorcha:moreInfo1',
    'sorcha:moreInfo2',
  ],
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
| `notes`    | String or  Array of Strings | More information/notes (see [Notes](#notes))|
| `suggest.text`  | String         | Text to go on the button to implement the suggested configuration change |
| `suggest.icon`  | String         | Icon name to go on the button to implement the suggested configuration change. (see [suggest.icon](#suggesticon)) |
| `suggest.update.settings` | Array | An array describing the changes to apply to the `settings` if the user accepts the suggestion. (see [suggest.update](#suggestupdate)) |
| `suggest.update.ui` | Array | An array describing the changes to apply to the `ui` if the user accepts the suggestion. (see [suggest.update](#suggestupdate)) |

### Notes

Notes are optional, but allow you to add more text/content to the flag message.

Unlike `desc` which can only hold a string, `notes` can hold either a string or an array of strings.

Both `desc` and `notes` will be rendered as markdown.

### suggest.icon

An optional name of an icon. Or leave it out to not render and icon.
The idea is that the icon helps convey the message, the following icon names are supported:

- `note`
- `info`
- `tip`
- `warn`
- `error`
- `fixme`
- `expand`
- `options`

Any other name will be ignored.

### suggest.update

Note that the `suggest` object is optional. Without it, it will merely display a message to the user.
However, when a suggest key is present, a button will be created that the user can click to accept the suggested changes.

The `suggest.update` object has only two possible top-level keys: 

- `settings` 
- `ui`

They both take the same parameter, an array with two elements: 

```mjs
Array [`path`, `value`]
```

This will be used to update the `settings` of the pattern, or the `ui` settings on FreeSewing.org.

The way they are updated is by invoking [lodash.set](https://lodash.com/docs/4.17.15#set) on either the settings object or the ui object.
Which means:

- `path` describes the path to the value to change in dot-notation
- `value` is the value to set

So to set the `waistEase` option to `0.2`, it should look like this:

```mjs
{
  update: {
    settings: ['options.waistEase', 0.2]
  }
}
```

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

