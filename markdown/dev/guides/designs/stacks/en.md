---
title: Stacks
order: 110
---

Stacks come into play when laying out a pattern.
The FreeSewing core library, by default, will handle the layout of a pattern
for you by placing all parts next to each other in as small a space as
possible.

That is _typically_ what you want, but not always. For example, when sampling
you want parts to be stacked on top of each other:

<Example settings="sample: { type: measurement, measurement: head }" withHead caption="A simple example of sampling the `head` measurement">
```js
({ 
  Point, 
  points, 
  Path, 
  paths, 
  Snippet, 
  snippets, 
  measurements, 
  part 
}) => {

  const size = measurements.head
  paths.box = new Path()
    .move(new Point(0,0))
    .line(new Point(0, size/3))
    .line(new Point(size, size/3))
    .line(new Point(size, 0))
    .addClass('fabric')
    .close()
  points.logo = new Point(size/2, size/5)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}
```
</Example>

Under the hood, sampling uses multiple sets of settings and then uses stacks
to place them on top of each other.  But this functionality is also available
to patterns designers who want to use it.

Essentially, stacks behave as layers. Parts that are on the same _stack_ will be stacked on top of each other in the layout.

You can stack parts from the same set, or from different sets. 

<Fixme>Include code example</Fixme>

<Note>
In the vast majority of cases you won't be using any stacks, or the stacking
will be handled for you by the core library (like in the sampling example
above).
</Note>
