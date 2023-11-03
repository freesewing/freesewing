---
title: Macros
---

Macros are a way to combine different operations into a single command.
Macros are typically provided by by plugins, but can also be added ad-hoc
without the need for a plugin.

## Signature

```js
null macro(object config, object props)
```

A macro receives a single configuration object as its first parameter.
The second parameter is the same object received by [the draft method in a
part](/reference/api/part/draft)

## Example

```js
pattern.use({
  name: 'My adhoc plugin',
  macros: {
    myMacro: function (so, props) {
      // Do something wonderful here
    },
    myOtherMacro: function (so, props) {
      // Do something wonderful here
    },
  }
}
```

Now you can use these macros in your part:

```js
({ macro, part }) => {

  macro('myMacro', {
    some: [ 'config', 'here' ],
    more: 'config'
  })
  macro('myOtherMacro', 'Just a string')

  return part
}
```

## Macros we maintain

Below is a list of macros from [the plugins we maintain](/reference/plugins).

<Note compact noP>

We use camelCase here, but macro names are case-insensitive
</Note>

<ReadMore list />

