---
title: Paths
order: 40
---

<Example part="docs_overview" options_focus="Paths">
Paths are the lines and curves of your pattern
</Example>

Paths are the lines and curves that make up your pattern.

They are made up of a set of drawing operations that together make up the path.
FreeSewing supports the following types of drawing operations:

 - The **move** operation moves our virtual pen but does not draw anything.
 - The **line** operation draws a straight line
 - The **curve** operation draws a [Bézier curve](/guides/overview/about/beziercurves/) 
 - The **close** operation closes the path

To crucial thing to keep in mind is that, with the exception of the **move** operation,
all drawing operations start from wherever you are currently on your virtual sheet of paper.

For example, you might expect the **line** operation to take a start- and endpoint. 
But in fact, it only takes an endpoint, and will draw a straight line from where our virtual pen
currently is to said endpoint.

Because all but the **move** drawing operations are relative to their operation preceding it,
**all Paths must start with a move operation**.

<Note>

Understanding that each drawing operation builds upon the next one is an important insight.

</Note>

<Tip>

Our example image (which, if you hadn't realized was created with FreeSewing) has a lot of 
paths in it. Each box, the arrows, the lines in the React logo, and so on.

</Tip>

