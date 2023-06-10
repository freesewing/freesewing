---
title: rehype-highlight-lines
---

Published as [@freesewing/rehype-highlight-lines][1], this package provides
a [Rehype](https://github.com/rehypejs/rehype)
plugin to format highlighted and struck-out lines in code blocks.

## Installation

```sh
npm install @freesewing/rehype-highlight-lines
```

## Usage

In NodeJS:
```js
import rehypeHighlightLines from @freesewing/rehype-highlight-lines

...
   rehypePlugins: [
     [
       rehypeHighlightLines,
       {
         highlightClass: ['highlight-lines', 'border-l-4'],
         strikeoutClass: [
           'strikeout-lines',
           'bg-orange-300',
           'bg-opacity-5',
           'border-l-4',
           'opacity-80',
           'line-through',
           'decoration-orange-500',
         ],
       },
     ],
   ],
```

### Example

```js
// These 3 lines will be highlighted:
// highlight-start
const a = 1
const b = 2
const c = 3
// highlight-end
const d = 4
// These 2 lines will be struck out:
// strikeout-start
const e = 5
const f = 6
// strikeout-end
```

## Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------|
| commentTag | String | 'span' | Tag that identifies a comment.   |
| commentClass | String | 'hljs-comment' | CSS class that identifies a comment.|
| openingCommentHighlight | String | 'highlight-start' | Comment text to start formatting lines as highlighted. |
| closingCommentHighlight | String | 'highlight-end' | Comment text to stop formatting lines as highlighted. |
| openingCommentStrikeout | String | 'strikeout-start' | Comment text to start formatting lines as struck-out. |
| closingCommentStrikeout | String | 'strikeout-end' | Comment text to stop formatting lines as struck-out. |
| highlightTag | String | 'section' | Tag to apply to the block of highlighted or struck-out lines. |
| highlightClass | Array|String | 'highlight-lines' | CSS classes to apply to highlighted lines. |
| strikeoutClass | Array|String | 'strikeout-lines' | CSS classes to apply to struck-out lines. |
| swallow | Boolean | `true` | Remove extra linebreaks before the start of highlighted/struck-out lines. |


[1]: https://www.npmjs.com/package/@freesewing/rehype-highlight-lines
