---
title: ReadMore
order: 70
---

This component will list child pages of the current page.

##### Default

```md
<ReadMore />
```
<ReadMore />

##### With custom title

You can customize the title by passing a `title` prop:

```md
<ReadMore title='Example pages'/>
```
<ReadMore title='Example pages'/>

##### As a list

The most common use of this component is by passing the `list`
prop which returns the pages as a list:

```md
<ReadMore list />
```
<ReadMore list />

##### As a recursive list

You can make the list recursive with the `recurse` prop (which implies the `list` prop):

```md
<ReadMore recurse />
```

<ReadMore recurse />
