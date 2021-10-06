---
title: Pattern
order: 15
---

The `Pattern` object in FreeSewing's core library holds all data and logic of a pattern. 
It is the parametric blueprint that when instantiated with a user's measurements and
objects will generated a made-to-measure pattern.

## Pattern constructor

```js
function freesewing.Pattern(object settings) 
```

A pattern is instantiated by passing a [settings object](/reference/settings/) to the pattern constructor.

This settings objects holds, amongst other things, the measurements and options chosen by the user.
Refer to the [settings documentation](/reference/settings/) for an exhaustive list.


## Pattern properties

| Property | Description |
| --------:| ----------- |
| `config` | The pattern configuration |
| `is` | A string that will be set to `draft` or `sample` when you respectively draft or sample a pattern. |
| `options` | The options as set by the user |
| `parts` | A plain object to hold your parts |
| `Part` | The [Part](/en/docs/developer/api/part) constructor |
| `settings` | The settings as set by the user |
| `store` | A [Store](/en/docs/developer/api/store) instance |
| `svg` | An [Svg](/en/docs/developer/api/svg) instance |

 - `settings` : The settings as set by the user
 - `options` : the options as set by the user
 - `config` : The pattern configuration
 - `parts` : A plain object to hold your parts
 - `Part` : The [Part](/en/docs/developer/api/part) constructor
 - `store` : A [Store](/en/docs/developer/api/store) instance
 - `svg` : An [Svg](/en/docs/developer/api/svg) instance
 - `is` : A string that will be set to `draft` or `sample` when you respectively draft or sample a pattern.
 This allows plugins that hook into your pattern to determine what to do in a given scenario.

## Pattern methods

<ReadMore list />
