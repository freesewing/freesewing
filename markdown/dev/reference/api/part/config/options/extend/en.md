---
title: Extending options and suppressing translation
---

## Extending and overriding inherited options

Parts automatically inherit options from the parts they are based on.
However, parts can also extend their options.

- A part can define new options. These new options are added to the ones inherited.
- Options can be redefined to override/extend an inherited option.
  - For example, an inherited percentage option can be redefined to have different min, max, and/or default values.
  - A different menu can be specified for an inherited option, or the menu property can be ommitted or set to `null` to prevent the option from appearing in the menus.

## Suppressing translation

In the example above, you want the different `list` options to be translated.
But sometimes, there is no need for that, like in this example from Breanna:

```js
options: {
  primaryBustDart: {
    list: [
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ],
    dflt: '06:00',
    doNotTranslate: true,
  },
  // More here
}
```

As you can see above, you can set the `doNotTranslate` property to `true` to indicate this.

<Note>

##### This is not a core feature

To be clear, setting this here does not do anything in core. It's merely extra
metadata you can add on the option to facilitate frontend integration.

</Note>

