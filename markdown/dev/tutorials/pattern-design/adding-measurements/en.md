---
title: Adding measurements
order: 130
---

FreeSewing is all about *made-to-measure* sewing patterns; 
we are going to draft our pattern according to the measurements provided to us.

Which begs the question, which measurements?

It is you, as the pattern designer, who decides which measurements are required to draft your pattern.
For our bib, the only measurement we need is the baby's *head circumference*.

So let's add it as a required measurement.

## Add required measurements

Open the config file at `config/index.js` and update the `measurements` array with the name of our required measurement:

```js
measurements: ["head"],
```

<Tip>

Make sure to re-use the names of existing measurements, rather than invent your own.

See our [best practices](/guides/best-practices/reuse-measurements) on this topic for details.

</Tip>

Now everybody knows your pattern requires the `head` measurement.

This change will also get picked up by the development environment, and you'll now see this screen:

![This screen tells you you are missing some required measurements](./required-measurements.png)

Since it's just one measurement, let's simply enter a value by hand. 
For example `38` as 38cm is a realistic head circumference measurement for a baby.

Enter `38` in the box, and click on **Draft your pattern** in the top navigation bar to get back to your draft,
which for now still looks like this:

<Example pattern="tutorial" part="step1">Nothing has changed, yet</Example>
