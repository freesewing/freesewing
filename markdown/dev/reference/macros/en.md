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

## Removing macros and the role of the macro id

Many macros accept an `id` parameter as part of their configuration.  This `id`
is used to generate the names for paths, points, or snippets that are added to
the part by the macro.  This way, macro-added content is deterministic, and can
be removed again.

Each macro typically has an `rm`-prefixed counterpart that removes the (changed
done by) the macro.  For example, you can add a bartack with the `bartack`
macro, and it can be removed with the `rmbartack` macro.  For this removal to
work, and id must be set in the macro, and it must be passed when removing the
macro.

For macros that are typically used once per part (such as the `title` macro)
you can rely on the default id.  For macros typically used multiple times (such
as the various dimension macros) you should set an id that is unique within the
part for each invocation.

## Macros we maintain

Below is a list of macros from [the plugins we maintain](/reference/plugins).

<Note compact noP>

We use camelCase here, but macro names are case-insensitive
</Note>

<ReadMore />

