---
title: FreeSewing in Node.js
---

These instructions explain how you can generate patterns in Node.js.
Whether it's in a backend application or on the command line, all
it takes is a few lines of code — and a couple of dependencies — to
generate a pattern.

<Tip>

##### Use FreeSewing.org if you just want a pattern

These instructions are intended for people who want to generate
their own patterns using FreeSewing packages.
If you _just want a sewing pattern created for you,_
you can get all our designs on [FreeSewing.org](https://freesewing.org/),
our website for makers.

</Tip>

## High level overview

To generate a pattern, you will need to:

- Instantiate the pattern (`new ...`)
- Pass it the settings and measurements you want to use (`{ ... }`)
- Load the theme plugin (using `use()`)
- Draft the pattern (using `draft()`)
- Render it to SVG  (using `render()`)

Which can be done as a one-liner since `use()`, `draft()` and
`render()` are all chainable, as shown below.

## Code example

```js
import { Aaron } from '@freesewing/aaron' // Design to use
import { pluginTheme as theme } from '@freesewing/plugin-theme' // SVG theme

const svg = new Aaron( // Instantiate pattern
  { // Pass in settings. See reference > core > settings
    sa: 10, // Seam allowance
    // ...
    measurements: { // Pass in measurements
      biceps: 387,
      chest: 1105,
      hips: 928,
      hpsToWaistBack: 502,
      neck: 420,
      shoulderSlope: 13,
      shoulderToShoulder: 481,
      waistToHips: 139,
    }
  })
  .use(theme) // Load theme plugin
  .draft() // Draft the pattern
  .render() // Render to SVG

// svg now holds the generated SVG code
console.log(svg)
```

<Note>

##### Remarks on the example code

- We are using `@freesewing/aaron` as the design, but you could use any design
- You probably want to [use your own measurements](/reference/settings/measurements)
  or you could use `@freesewing/models` to load measurements from [our sizing grid](https://freesewing.org/sizes/)
- We are using `@freesewing/plugin-theme` to theme our SVG, but you
  could [pass in your own CSS](/reference/api/svg/style)

</Note>

## Dependencies

The code above will only work if you've got the required dependencies installed on your system.
Obviously you need Node.js, but you will also need the following packages:

- `@freesewing/core`: Our core library
- `@freesewing/plugin-bundle`: Set of common plugins
- `@freesewing/aaron` or any design you want to use
- Any design on which the design you choose is built. In this case, Aaron depends on `@freesewing/brian`
- `@freesewing/utils`

For the example above, your `package.json` **dependencies** section will look like this:

```json
  "dependencies": {
    "@freesewing/core": "latest"
    "@freesewing/aaron": "latest",
    "@freesewing/brian": "latest",
    "@freesewing/models": "latest",
    "@freesewing/plugin-bundle": "latest",
    "@freesewing/plugin-theme": "latest",
    "@freesewing/utils": "latest"
  }
```
