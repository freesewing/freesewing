---
title: Extending options
---

Additional, optional information can be added to options to extend
their use outside of core functionality.
This can be useful when using FreeSewing through a frontend UI.
The extended information can be used by the frontend to affect
how options are presented.


## Add menu structure

Because FreeSewing designs have been written with the expectation that
they will be used primarily through the freesewing.org website,
their options have been extended with menu information.

```js
options: {
  // Fit
  waistEase: { pct: 2, min: 0, max: 10, menu: 'fit', sort: '100' },
  seatEase: { pct: 5, min: 0, max: 15, menu: 'fit', sort: '200' },
  // Style
  waistHeight: { pct: 5, min: 0, max: 100, menu: 'style', sort: '400' },
  lengthBonus: { pct: 0, min: -15, max: 10, menu: 'style', sort: '300' },
  elasticatedCuff: { bool: true, menu: 'style' },
  buttons = { count: 7, min: 4, max: 12, menu: 'style.closure', sort: '800' }
  extraTopButton = { bool: true, menu: 'style.closure', sort: '850' }
}
```

In the above example, the added `menu` attributes provide the
freesewing.org website UI with information about the options
should appear in menus.
- The `waistEase` and `seatEase` options should appear in the `fit`
menu while the other options go in the `style` menu.
- Additionally, the `buttons` and `extraTopButton` options should
appear in a `closure` submenu under the `style` menu.

The optional 'sort' attributes provide the UI with information about
the order in which options and menus should appear.
- Within the `fit` menu, `waistEase` should come before `seatEase`.
- Within the `style` menu, options should be in the order
`lengthBonus`, `waistHeight`, `buttons`, `extraTopButton`, and
`elasticatedCuff`.
- The `elasticatedCuff` option does not have a `sort` attribute,
so it should appear after the options that do.
- Because the `fit` menu has an option with a sort value that comes
before any of the sort values for options in the `style` menu,
the `fit` menu should appear before the `style` menu.

<Note>

##### This is not a core feature

To be clear, setting this here does not do anything in core.
It's merely extra metadata you can add on the option to facilitate
frontend integration.

</Note>


## Suppress translation

When using `list` options, we usually we want the different options
in the list to be translated.
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

