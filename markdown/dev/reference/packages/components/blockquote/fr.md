---
title: Blockquote
---

The `Blockquote` component is a base blockquote that can be styled in a number of different ways via the `type` prop which can be set to:

 - note
 - warning
 - tip
 - fixme

It is typically used in our MDX content where we make the `Note`, `Warning`, `Tip` and `Fixme` components available in the global scope. They all use the `Blockquote` component under the hood.

## Examples

### Type: note<Note> This is a note </Note>

```mdx
<Note> This is a note </Note>
```

```jsx
<Blockquote type='note'> This is a note </Blockquote>
```


### Type: tip<Tip> This is a tip </Tip>

```mdx
<Tip> This is a tip </Tip>
```

```jsx
<Blockquote type='tip'> This is a tip </Blockquote>
```


### Type: warning<Warning> This is a warning </Warning>

```mdx
<Warning> This is a warning </Warning>
```

```jsx
<Blockquote type='warning'> This is a warning </Blockquote>
```

### Type: fixme<Fixme> This needs attention </Fixme>

```mdx
<Fixme> This needs attention </Fixme>
```

```jsx
<Blockquote type='fixme'> This needs attention </Blockquote>
```

## Props

|   Name | Type     | Défaut | Description                                                                             |
| ------:| -------- |:------ |:--------------------------------------------------------------------------------------- |
| *type* | `string` | `note` | Determines the style of the `Blockquote`. One of `note`', `tip`, `warning`, or `fixme`. |

<Note>

This component will render the `children` between its opening and closing tags.

</Note>

