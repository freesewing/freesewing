# List of props that can be passed to the pattern editor

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `design` | `undefined` | Name of the current design (key in the `objects` prop).<br>Note that this will set the initial state, but it can be changed by the user. |
| `designs` | `{}` |Object holding all designs that are available. |
| `locale` | `en` | Language code |
| `imperial`| `false` | Whether to use imperial units as the default, or not |
| `components` | `{}` | Object holding swizzled components |
| `defaults` | `{}` | Object holding swizzled defaults |
| `hooks` | `{}` | Object holding swizzled hooks |
| `methods` | `{}` | Object holding swizzled methods |


## Defaults object

```mjs
{
  locale: 'en',
  imperial: 'false',
  ui: {
    renderer: 'react',
    kiosk: false,
    }
}
```

