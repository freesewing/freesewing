---
title: Adding text
---

SVG is pretty great, but its text handling leaves much to be desired.

To abstract away the intricacies of adding text to an SVG document, FreeSewing
provides the [Point.addText()](/reference/api/point/addtext) and
[Path.addText()](/reference/api/path/addtext) methods to let you add text to
points and paths.

In addition, [the `title` macro](/reference/macros/title) not only lets you add a
title to your part, it also allows you to add notes.

## Wrapping lines

SVG does not provide any line-wrapping, so you will need to be mindful of that when you add longer text.

To facilitate this, FreeSewing will enforce a line break when you use `\n` in your text.

## Translation

Text that is added to a pattern typically requires translation. 
You should break up your text in such a way that it remains possible to translate it.

You can do that either via repeated calls to `addText()` or you can pass an array of strings, or even a nested array of strings, and FreeSewing will translate all individual pieces prior to concatenating them.

<Note compact noP>

Refer to [the `insertText` hook](/reference/hooks/inserttext#notes) for details.
</Note>

