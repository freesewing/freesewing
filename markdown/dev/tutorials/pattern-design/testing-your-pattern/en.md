---
title: "Testing your pattern"
order: 250
---

With the basic outline of your pattern ready, now would be a good time
to test it to see how well it adapts to different measurements,
and the range of options we provided.

<Tip>

###### No more grading

FreeSewing patterns are *made-to-measure*, which means that you don't need to
grade your pattern to provide a range of sizes. You should sample your pattern
for different measurements and options to see how well it adapts.

</Tip>

If testing your pattern sounds like a lot of work, you're in luck. FreeSewing can do it
for you. Click the **Test your pattern** button in the top navigation bar of your
development environment, and you'll see a number of choices on the right:

-   Test pattern options
-   Test measurements
-   Test models

The [API docs on sampling](/reference/api/pattern/#sample) have all the details on how this works, but
for now we'll just look at the end result of each of these.

## Testing pattern options

We used percentage options, which can vary between their minimum and maximum value.
For these tests, FreeSewing will divide that range into 10 steps and draft your pattern for each step.

Click on any of the options we've added to our pattern, and your bib will be drawn with that option sampled.

### lengthRatio

The `lengthRatio` option controls the length of our bib. Testing it confirms that it only influences the length:

\<Example
sample
part="bib"
pattern="tutorial"
settings={{
sample: {
type: "option",
option: "lengthRatio"
}
}}

>

Your bib with the lengthRatio option sampled </Example>

### neckRatio

The `neckRatio` option will determine the size of the neck opening.
For a the same `head` measurement, varying this option should result in bibs with increasingly larger
neck opening.

Testing it confirms this. We can also see that as the neck opening gets smaller, we will rotate the straps
further out of the way to avoid overlap:

\<Example
sample
part="bib"
pattern="tutorial"
settings={{
sample: {
type: "option",
option: "neckRatio"
}
}}

>

Your bib with the neckRatio option sampled </Example>

### widthRatio

The `widthRatio` option will determine the width of our bib.
For a the same `head` measurement, varying this option should result in increasingly wider bibs.

If we test it, we can see that it works as intended. But there's one thing that perhaps requires your attention.
Making the bib wider shortens the length from the bottom of the neck opening to the bottom of the bib.
Thereby making the bib shorter when it's worn.

Even if the *total length* of the bib stays the same, the *useable length* shortens when the bib is made wider.
Users will not expect this, so it's something that we should fix in our pattern.

<Note>

Adjusting the pattern to make the `widthRatio` not influence the *useable length* of the bib is not
covered in this tutorial. It is left *as an exercise to the reader*.

</Note>

\<Example
sample
part="bib"
pattern="tutorial"
settings={{
sample: {
type: "option",
option: "widthRatio"
}
}}

>

Your bib with the widthRatio option sampled </Example>

## Testing measurements

Testing a measurement will vary that measurement 10% up or down while leaving everything else the same.
This gives you the option to determine how any given measurement is influencing the pattern.

For our bib, we only use one measurement, so it influences the entire pattern:

\<Example
sample
part="bib"
pattern="tutorial"
settings={{
sample: {
type: "measurement",
measurement: "head"
}
}}

>

Your bib with the head circumference measurement sampled </Example>

## Testing models

Whereas testing a measurement will only vary one individual measurement, testing models will
draft your pattern for different sets of measurments, which we refer to as *models*.

On the surface, the result below is the same as our measurement test. But that is because our bib
only uses one measurement. So testing that one measurement ends up being the same as testing a complete
set of measurements.

But most patterns use multiple measurements, and you'll find this test gives you insight into how your
pattern will adapt to differently sized bodies.

\<Example
sample
pattern="tutorial"
part="bib"
settings={{
sample: {
type: "models",
models: {
baby1: { head: 340 },
baby2: { head: 350 },
baby3: { head: 360 },
baby4: { head: 370 },
baby5: { head: 380 },
baby6: { head: 390 },
baby7: { head: 400 },
baby8: { head: 410 },
baby9: { head: 420 }
}
}
}}

>

Your bib sampled for a range of baby sizes </Example>

## The antperson test

A special case of model testing is the so-called *antperson test*.
It drafts your pattern with a set of *typical* measurements , and then drafts it again
with measurements that are 1/10th of those *typical* measurements.

It is named after [the cartoon character](https://en.wikipedia.org/wiki/Ant-Man_\(film\)) who can shrink,
yet somehow his suit still fits.

The purpose of the antperson test is to bring out areas in your pattern where you made assumptions
that will not properly scale.
Many drafting books will tell you to *add 3cm there* or *measure 2 inch to the right*. Those instructions
don't scale, and you should avoid them.

The best patterns will pass the antperson test with 2 patterns exactly the same, where one will simply be 1/10th the scale of the other.

\<Example
sample
pattern="tutorial"
part="bib"
settings={{
sample: {
type: "models",
models: {
ant: { head: 39 },
man: { head: 390 },
}
}
}}

>

Congratulations, your bib passes the antperson test </Example>

When you're happy with how your pattern passes these tests, it's time to complete it.
