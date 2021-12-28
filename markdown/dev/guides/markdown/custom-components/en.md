---
title: Custom components
order: 90
---

The way we render markdown on our websites is through the use of [MDX](https://mdxjs.com/).  
This allows us to extend Markdown with our own so-called *custom components*.

Such custom components allow us to put things in Markdown content that would
typically require a lot more complexity.

Below is a list of custom components you can use in our Markdown content:

## Example

<Example part="plugin_buttons">
  Example of the snippets provided by [the buttons plugin](/reference/plugings/buttons)
</Example>

Use **Example** to embed an example (a part of our `examples` pattern) that is used to
illustrate the core API documentation. Check [the examples
source code](https://github.com/freesewing/freesewing/blob/develop/packages/examples/src/index.js) for
a full list of all available parts/examples.

```markdown
<Example part="plugin_buttons">
  Example of the snippets provided by [the buttons plugin](/reference/plugings/buttons)
</Example>
```

## Comment

<Comment by="joost">**Do** try this at home</Comment>

Use a **Comment** where you want to illustrate something is a personal opinion
or tip/advice rather than the sort of general neutral voice used throughout
our documentation.

The **Comment** component requires a `by` attribute that lists the author of the comment.

```markdown
<Comment by="joost">**Do** try this at home</Comment>
```


## Fixme

<Fixme>
##### ToDo
- Include link to roadmap
- Fix style for text outside paragraphs
</Fixme>

Use **Fixme** to indicate something needs attention/work but you don't have time
or can't fix it now.

```markdown
<Fixme>
##### ToDo
- Include link to roadmap
- Fix style for text outside paragraphs
</Fixme>
```


## Note

<Note>
##### Also available in black
This style also comes in black, which we can all agree is the superior color
</Note>

Use **Note** to add something that stands out to draw attention.

```markdown
<Note>
##### Also available in black
This style also comes in black, which we can all agree is the superior color
</Note>
```

## ReadMore

The ReadMore component allows you to insert a list of child-pages.
It's typically used on overview pages, such as out [markdown guide](/guides/markdown) page.

```markdown
<ReadMore />
```

It won't show anything on this page, since this page has not child-pages.

## Related
<Related>
  This snippet is provided by [the buttons plugin](/reference/plugins/buttons)
</Related>

Use **Related** to add something that is relevant to the current topic.

```markdown
<Related>
  This snippet is provided by [the buttons plugin](/reference/plugins/buttons)
</Related>
```

## Tip
<Tip>
  Comparing yourself to others is the fastest way to become unhappy
</Tip>

Use **Tip** for, you know, tips.

```markdown
<Tip>
  Comparing yourself to others is the fastest way to become unhappy
</Tip>
```

## Warning
<Warning>
  ##### Please make a backup
  Following these instructions will remove all your data
</Warning>

Use **Warning** when you want to warn the reader for potential danger or unintended side-effects.

```markdown
<Warning>
  ##### Please make a backup
  Following these instructions will remove all your data
</Warning>
```

## YouTube

The **YouTube** components will embed YouTube videos or YouTube playlists responsively.

Embed a video:

<YouTube id='Rz6ShSftDlI' />

```markdown
<YouTube id='Rz6ShSftDlI' />
```
  
Embed a playlist:

<YouTube id='PL1gv5yv3DoZOFSXz7yydeV1H8m6pfwstn' playlist />

```md
<YouTube id='PL1gv5yv3DoZOFSXz7yydeV1H8m6pfwstn' playlist />
```
  


