---
title: Custom components
order: 90
---

The way we render markdown on our websites is through the use of [MDX](https://mdxjs.com/).\
This allows us to extend Markdown with our own so-called _custom components_.

Such custom components allow us to put things in Markdown content that would
typically require a lot more complexity.

Below is a list of custom components you can use in our Markdown content:

## Comment

<Comment by="joost">**Do** try this at home</Comment>

Use a **Comment** where you want to illustrate something is a personal opinion
or tip/advice rather than the sort of general neutral voice used throughout
our documentation.

The **Comment** component requires a `by` attribute that lists the author of the comment.

```markdown
<Comment by="joost">**Do** try this at home</Comment>
```

## Dot

<Dot>

```dot
rankdir="LR"
compound=true
subgraph cluster_pem {
  label="I am a box"
  fontsize=24
  color="oc-gray"
  style="dashed"
  api [label="Backend API" shape="box3d" style="dashed" color="oc-teal"]
  strapi [label="Strapi" shape="box3d" style="dashed" color="oc-teal"]
  db [label="Database" shape="cylinder" style="dashed" color="oc-grape"]
  api -> db
  strapi -> db
}

frontend [label="FreeSewing\nFrontend" shape="component" color="oc-violet"]
user [label="User" shape="egg" color="oc-blue-2" style="filled"]
extra [label="I am an example" shape="box" color="oc-pink-2"]
dot [label="Me too!" shape="plaintext"]
i18n [label="i18n:docs" shape="signature" color="oc-red"] 

extra -> dot
extra -> i18n
dot -> db [lhead=cluster_pem dir=back]
frontend -> api
frontend -> strapi [color="oc-indigo"]
user -> frontend

```

An example graph using the **Dot** custom component
</Dot>

Use **Dot** to add a [Graphviz](https://graphviz.org/) graph written in
the [Dot graph description language](https://en.wikipedia.org/wiki/DOT_\(graph_description_language\)).

It is a way to include diagrams as code, making them easier to maintain and diff than
creating graphic files by hand. These diagrams also support dark mode, translation a and
consistent color scheme. Highly recommended when you want to clarify concepts with a little
back-of-the-napkin sketch.

<Tip>
The dot language takes some getting used to, but you can hone your skills or try it out
on [sketchviz.com](https://sketchviz.com/).
</Tip>

### Using colors

Colors make everything prettier, but dot expects you to specify them as you would in
HTML, and juggling all those hex-codes becomes a chore.

This custom component makes it easy to use [the open-color color
scheme](https://yeun.github.io/open-color/) by using the following color names:

- `oc-[color]` will use the `oc-[color]-5` midtone that's suitable for both light and
  dark mode. Eg: `oc-violet`
- `oc-[color]-[shade]` allows you to control the lightness. Eg: `oc-violet-200`

<Note>
If you specify no color, graphviz will revert to `#000000` (black). This custom
component will also override that with `currentColor` so that the default also
works in dark mode
</Note>

### Using translation

While freesewing.dev is only available in English, you can also use this on
freesewing.org which uses translation.

You can use the `i18n:` prefix followed by the translation key. For example
`i18n:docs` will look up the `docs` key in the default namespace. Whereas
`i18n:errors:example` will lookup the `example` keys in the `errors` namespace.

## Example

<Example part="plugin_buttons">
  Example of the snippets provided by [the buttons plugin](/reference/plugins/buttons)
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
