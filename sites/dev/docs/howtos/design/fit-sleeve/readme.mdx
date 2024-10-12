---
title: Adapt the sleevecap length to fit the armhole
---

Fitting the sleevecap to the armhole means that we need to make sure the length
of the seams match. A similar challenge is to fit the collar to the neck
opening and so on.

For all of these situations where you have to create curved seams with matching
length, it's impossible to get it right from the first attempt.

Instead, we try, and then course-correct until we get it right, or close enough.

This pattern is rather common, and we will unpack an example from Bent below.

Before we dive in, here's a few things to keep in mind:

- In JavaScript, you can create a function within your function and call it
- Bent extends Brian which sets both the `frontArmholeLength` and `backArmholeLength` values in the store with the length of those seams
- We need to match the length of the sleevecap + sleeve cap ease to the length of the front and back armhole

Here's how you can handle this in code:

- We create a method that does the actual drafting of our sleevecap
- We use a `tweak` value to influence the process, we start with a value of `1`
- We check the length after every attempt, and adjust the `tweak` value

```js
export const partName = (part) {
  let { Path, paths, points, store, options } = part.shorthand()

  // we'll call this function repeatedly until it gets it right
  function draftSleeve(part, tweak) {
    // Sleeve frame
    points.top = new Point(0, 0)
    // Note the use of tweak in the line above
    points.boxTopRight = points.top.shift(0, (store.get('sleevecapTarget') / 5.8) * tweak)
    // ... draft sleevecap here
  }

  // Get values from the store, and save our own
  let armholeLength = store.get('frontArmholeLength') + store.get('backArmholeLength')
  let sleevecapEase = armholeLength * options.sleevecapEase
  store.set('sleevecapEase', sleevecapEase)
  store.set('sleevecapTarget', armholeLength + sleevecapEase)

  // Initialize
  // delta holds by how far we're off
  let delta = 0 
  // runs holds our number of attempts
  let runs = 0 // number of attempts
  // tweak holds our tweak factor
  let tweak = 1 // tweak factor
  // target holds our goal
  let target = store.get('sleevecapTarget')
  // using a do...while loop so this runs at least once
  do { 
    // Draft our sleevecap
    draftSleeve(part, tweak)
    // Increate the run count
    runs++
    // Re-calculate by how far we're off
    delta = store.get('sleevecapLength') - target 
    // If we overshot, decrease the tweak factor
    if (delta > 0) tweak = tweak * 0.99 
    // If we're short, increase the tweak factor
    else tweak = tweak * 1.02 
  } while (Math.abs(delta) > 2 && runs < 25) 
  // Keep doing this until we're off by less than 2 mm or we tried 25 times
```

A few things that are important:

- We check to see how close we are by using `Math.abs(delta)` which gives us the absolute value of our delta
- We guard against an endless loop by keeping track of the runs and giving up after 25
- We multiply by `0.99` and `1.02` to respectively decrease and increase our `tweak` factor.
  This asymmetric approach avoids that we end up ping-ponging around our target value and never land somewhere in the middle
