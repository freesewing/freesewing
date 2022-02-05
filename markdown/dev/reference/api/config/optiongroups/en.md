---
title: optionGroups
---

Option groups allow you to group options together when presenting them
to the user. They also support (one) level of sub-grouping which is
useful when your design has many options.


<Note>

##### This section applies to frontend integration

When you use FreeSewing patterns via the API -- in a backend NodeJS system
or on the command line for example -- all options can be used.

The conditional display of options is intended for frontend integration.
It is what's used on FreeSewing.org and our development environment alike, but
it is not intended as a way to block access to a given option. It merely hides it.

</Note>

## Structure

Option groups are stored under the `optionGroups` key in the pattern 
configuration file.

They hold a plain object where each property can hold:

 - An array of strings that are the names of the options to include in the group
 - A plain object whose properties hold an array of strings that are the names 
 of the options to include in the group. (this creates a subgroup)

## Example

```js
optionGroups: {
  fit: [
    'chestEase',
    'waistEase',
  ],
  style: [
    'cuffStyle',
    'hemStyle',
    {
      collar: [
        'collarHeight',
        'collarShape'
      ]
    }
  ],
}
```

The configuration above will create the following structure:

- **fit**
  - `chestEase`
  - `waistEase`
- **style**
  - `cuffStyle`
  - `hemStyle`
  - **collar**
    - `collarHeight`
    - `collarShape`
