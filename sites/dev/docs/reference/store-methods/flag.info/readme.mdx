---
title: flag.info()
---

This flags information at the `info` level.

Info that is flagged is stored in the store under `plugins.plugin-annotations.flags.info`.
The core library does nothing with this info, it is merely stored, much like logs are.

However, in our own UI on FreeSewing.org, we use this mechanism to allow
designer to flag information to the user, and even suggest changes to the
pattern configuration.

<Tip>

The Signature, Configuration, and Example information below applies to the
`flag.error()`, `flag.fixme()`, `flag.info()`, `flag.note()`,
`flag.tip()`, and `flag.warn()` methods.

</Tip>

## Signature

```js
undefined Store.flag.info({
  id: 'id_string',
  title: 'flag:expandIsOn.t',
  desc: 'flag:expandIsOn.d',
  msg: 'flag:expandIsOn',
  notes: [
    'sorcha:moreInfo1',
    'sorcha:moreInfo2',
  ],
  replace: {
    key1: //code for replacement value,
    key2: //code for replacement value,
  },
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
| `title`    | String              | The translation key for the title of the message |
| `desc`     | String              | The translation key for the description of the message |
| `msg`      | String              | The translation key for the message |
| `notes`    | String or  Array of Strings | Translation keys for more information/notes (see [Notes](#notes))|
| `replace`  | Object              | Key/values for text replacements (see [Replacement Values](#replacement-values))|
| `suggest.text`  | String         | Text to go on the button to implement the suggested configuration change |
| `suggest.icon`  | String         | Icon name to go on the button to implement the suggested configuration change. (see [suggest.icon](#suggesticon)) |
| `suggest.update.settings` | Array | An array describing the changes to apply to the `settings` if the user accepts the suggestion. (see [suggest.update](#suggestupdate)) |
| `suggest.update.ui` | Array | An array describing the changes to apply to the `ui` if the user accepts the suggestion. (see [suggest.update](#suggestupdate)) |

- If `msg` is provided:
  - `title` will be set to the contents of `msg` appended with ".t".
  - 'desc' will be set to the contents of `msg` appended with ".d".
- It is required that at least one of `id` or `title` (or `msg`) be provided.
- `title` and `desc` are translation keys, and their translation strings
will be rendered as markdown.

### Notes

Notes are optional, but allow you to add more text/content to the flag message.

Unlike `title` or `desc` which can only hold a string, `notes` can hold either a string or an array of strings.

`notes` are also translation keys, and the translation strings will be
rendered as markdown.

### Replacement Values

The translation strings for `title`, `desc`, and `notes` can contain
variables that allow calculated values to be inserted into messages.

The optional `replace` object holds key/value pair properties where
keys are variable names and values contain code that generates
the replacement text for that variable.

### suggest.icon

An optional name of an icon. Or leave it out to not render an icon.
The idea is that the icon helps convey the message, with the following icon names supported:

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
