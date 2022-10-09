---
title: "Testing your pattern"
order: 250
---

With the basic outline of your pattern ready, now would be a good time
to test it to see how well it adapts to different measurements,
and the range of options we provided.

<Tip>

###### No more grading

FreeSewing patterns are _made-to-measure_, which means that you don't need to
grade your pattern to provide a range of sizes. You should sample your pattern
for different measurements and options to see how well it adapts.

</Tip>

If testing your pattern sounds like a lot of work, you're in luck. FreeSewing can do it
for you. Click the **Test Design** link in the sidebar under the **View** title.

<Fixme>
The new development environment does not yet support all tests.
Update these docs when that's completed
</Fixme>

You have a number of ways to test your pattern:

- Test design options
- Test measurements
- Test models

The [API docs on sampling](/reference/api/pattern/sample) have all the details on how this works, but
for now we'll just look at the end result of each of these.

## Testing pattern options

We used percentage options, which can vary between their minimum and maximum value.
For these tests, FreeSewing will divide that range into 10 steps and draft your pattern for each step.

Click on any of the options we've added to our pattern, and your bib will be drawn with that option sampled.

### lengthRatio

The `lengthRatio` option controls the length of our bib. Testing it confirms that it only influences the length:

<Examples sample part="tutorial.bib" pattern="tutorial" settings={{ sample: { type: "option", option: "lengthRatio" } }} />

_Your bib with the lengthRatio option sampled._

### neckRatio

The `neckRatio` option will determine the size of the neck opening.
For a the same `head` measurement, varying this option should result in bibs with increasingly larger
neck opening.

Testing it confirms this. We can also see that as the neck opening gets smaller, we will rotate the straps
further out of the way to avoid overlap:

<Examples sample part="tutorial.bib" pattern="tutorial" settings={{ sample: { type: "option", option: "neckRatio" } }} />

_Your bib with the neckRatio option sampled._

### widthRatio

The `widthRatio` option will determine the width of our bib.
For a the same `head` measurement, varying this option should result in increasingly wider bibs.

If we test it, we can see that it works as intended. But there's one thing that perhaps requires your attention.
Making the bib wider shortens the length from the bottom of the neck opening to the bottom of the bib.
Thereby making the bib shorter when it's worn.

Even if the _total length_ of the bib stays the same, the _useable length_ shortens when the bib is made wider.
Users will not expect this, so it's something that we should fix in our pattern.

<Note>

Adjusting the pattern to make the `widthRatio` not influence the _useable length_ of the bib is not
covered in this tutorial. It is left _as an exercise to the reader_.

</Note>

<Examples sample part="tutorial.bib" pattern="tutorial" settings={{ sample: { type: "option", option: "widthRatio" } }} />

_Your bib with the widthRatio option sampled._

## Testing measurements

Testing a measurement will vary that measurement 10% up or down while leaving everything else the same.
This gives you the option to determine how any given measurement is influencing the pattern.

For our bib, we only use one measurement, so it influences the entire pattern:

<Examples sample part="tutorial.bib" pattern="tutorial" settings={{ sample: { type: "measurement", measurement: "head" } }} />

_Your bib with the head circumference measurement sampled._

## Testing models

Whereas testing a measurement will only vary one individual measurement, testing models will
draft your pattern for different sets of measurments, which we refer to as _models_.

On the surface, the result below is the same as our measurement test. But that is because our bib
only uses one measurement. So testing that one measurement ends up being the same as testing a complete
set of measurements.

But most patterns use multiple measurements, and you'll find this test gives you insight into how your
pattern will adapt to differently sized bodies.

<Examples sample pattern="tutorial" part="tutorial.bib" settings={{ sample: { type: "models", models: { baby1: { head: 340 }, baby2: { head: 350 }, baby3: { head: 360 }, baby4: { head: 370 }, baby5: { head: 380 }, baby6: { head: 390 }, baby7: { head: 400 }, baby8: { head: 410 }, baby9: { head: 420 } } } }} />

_Your bib sampled for a range of baby sizes._

## The antperson test

A special case of model testing is the so-called _antperson test_.
It drafts your pattern with a set of _typical_ measurements , and then drafts it again
with measurements that are 1/10th of those _typical_ measurements.

It is named after [the cartoon character](https://en.wikipedia.org/wiki/Ant-Man_\(film\)) who can shrink,
yet somehow his suit still fits.

The purpose of the antperson test is to bring out areas in your pattern where you made assumptions
that will not properly scale.
Many drafting books will tell you to _add 3cm there_ or _measure 2 inch to the right_. Those instructions
don't scale, and you should avoid them.

The best patterns will pass the antperson test with 2 patterns exactly the same, where one will simply be 1/10th the scale of the other.

<Examples sample pattern="tutorial" part="tutorial.bib" settings={{ sample: { type: "models", models: { ant: { head: 39 }, man: { head: 390 }, } } }} />

_Congratulations, your bib passes the antperson test!_

When you're happy with how your pattern passes these tests, it's time to complete it.
