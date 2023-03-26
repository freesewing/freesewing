---
title: FreeSewing in the browser
---

Thanks to the advances in browser standardisation around JavaScript
ESM modules, not to mention [the new Skypack CDN](https://www.skypack.dev/),
you can generate patterns in the browser with a few lines of JavaScript.

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

Below is a complete example.

```html
<html>
  <head>
    <!-- This entire head tag is optional/cosmetic -->
    <title>FreeSewing browser example</title>
    <style>
      body {
        font-size: 24px;
        padding: 1rem;
      }
      svg {
        max-width: calc(100vw - 4rem);
        max-height: calc(100vh - 4rem);
        margin: 0 auto;
      }
      #container {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <script type="module">
      import { Aaron } from 'https://cdn.skypack.dev/@freesewing/aaron';
      import { pluginTheme as theme } from 'https://cdn.skypack.dev/@freesewing/plugin-theme';
      const svg = new Aaron({
        sa: 10, // Seam allowance
        paperless: true, // Enable paperless mode
        // More settings, see: https://FreeSewing.dev/reference/settings
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
      // Update DOM
      document.getElementById("container").innerHTML = svg
    </script>
    <div id='container'>SVG output will appear here</div>
  </body>
</html>
```

## Dependencies

If you compare this example with [our Node.js
example](/howtos/environments/nodejs) you'll notice that you do not
need to worry about loading any dependencies. Not even `@freesewing/core`
is loaded, because Skypack will pull in all dependencies for you.
