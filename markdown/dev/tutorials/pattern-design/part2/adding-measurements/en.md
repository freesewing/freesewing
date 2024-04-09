---
title: Adding measurements
order: 30
---

FreeSewing is all about _bespoke_ sewing patterns -- or *parametric
design* to use a more generic term.

That means that when drafting our pattern, I will take the measurements provided
by the user into account.

Which begs the question, which measurements?

As the pattern designers, you get to decide which measurements are used
to draft the pattern. For this bib, I am going to use the
_head circumference_.
So let's add it as a required measurement.

## Adding required measurements

In our `src/bib.mjs` file, we will add a `measurements` property to the `bib` object.
This property will be an Array (a list) holding all required measurements for this part.

I am using [*the official name* of the measurement](/reference/measurements) here. For head
circumference, that name is `head`.

<Fixme>
The `design/src/bib.mjs` "language" title on the code snippets is out of date. It is used in the tutorial from this point forward to maintain syntax-highlight not yet available for the `src/bib.mjs` title, but should be replaced with `src/bib.mjs`.
</Fixme>

```design/src/bib.mjs
function draftBib({ part }) {
  return part
}

export const bib = {
  name: 'fromscratch.bib',
  draft: draftBib,
  // highlight-start
  measurements: [ 'head' ],
  // highlight-end
}
```

From now on, this part requires the `head` measurement.

This change will also get picked up by the development environment, which will now complain that it is missing some measurements.
Since it's just one measurement, I will simply enter a value by hand.
For example `38` as 38 cm is a realistic head circumference measurement for a baby.

<Tip>

##### Why using standard measurements names matters

In principle, I can use any name I want for our measurements.
The FreeSewing core library does not care.

However, if everybody uses their own (names for) measurements, then people
aren't able to re-use their measurements across designs.

So if you have any intention at all to play nice with the FreeSewing ecosystem,
please make sure to re-use the names of existing measurements, rather than
invent your own.

See the [best practices](/guides/best-practices/reuse-measurements) on this
topic for details.

</Tip>
