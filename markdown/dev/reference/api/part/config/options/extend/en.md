---
title: Extending options
---

<Fixme>

Explain extending options here

</Fixme>


## Suppress translation

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

As you can see above, you can set the `doNotTranslate` property to `true` and to indicate this.

<Note>

##### This is not a core feature

To be clear, setting this here does not do anything in core. It's merely extra
metadata you can add on the option to facilitate frontend integration.

</Note>
## Suppress translation

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

As you can see above, you can set the `doNotTranslate` property to `true` and to indicate this.

<Note>

##### This is not a core feature

To be clear, setting this here does not do anything in core. It's merely extra
metadata you can add on the option to facilitate frontend integration.

</Note>

