---
title: Draft
---

The `Draft` component renders a FreeSewing pattern in the browser as SVG.

To use the `Draft` component, pass it the result of `pattern.getRenderProps()`
as props:

```js 
const renderProps = pattern.draft().getRenderProps()

return <Draft {...renderProps} />
```

<Note>

##### Ensuring consistency of snippets between SVG and React output

The `pattern.getRenderProps()` returns a range of props, including
an SVG object on which the `preRender` hook gets called prior to
returning.

This way, svg.defs now holds all defs, including any that may have 
been added by custom plugins, and we use this verbatim in our 
React component.

This removes any discrepancies in how SVG rendering and React 
rendering handles the defs section of the SVG document, 
and thus displays snippets.

</Note>

