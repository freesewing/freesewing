---
title: Trace an existing pattern
---

Converting an existing pattern into a FreeSewing pattern is really a job in two
parts:

- Recreate the pattern's shape
- Convert it to a parametric design

On this page, we'll focus on recreating the original pattern's shape. 

## Step 1: Convert the original pattern to SVG

If you have an existing digital pattern, save or export it as an SVG. If you
have a paper pattern, you can scan it or take a picture and then trace the
outline, then save it as SVG.

Let's say we've save the original pattern as `original.svg`.

<Note>

[Inkscape](https://inkscape.org/) is a free SVG editor that can both import a
variety of formats and save them as SVG, as well as trace the lines in a
picture.

</Note>

<Tip compact>
When saving in Inkscape, use the **Optimized SVG** format
</Tip>

## Step 2: Convert the SVG file to JavaScript

Don't panic, this will be easy.

 - Open the `original.svg` file in your favorite editor

```txt
<svg width="210mm" height="297mm" version="1.1" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
...
</svg>
```

 - Remove everything before the opening `svg` tag
 - Give the svg tag an `id` attribute, and set the value to something you will remember later. For example `bg`. 
 - Add a line at the top of the file that contains <code>export const background = `</code>
 - Add a line at the bottom of the file that contains <code>`</code>
 - Save the file as `original.mjs`

Now your SVG is a JavaScript file:

```js
export const background = `
<svg id='bg' width="210mm" height="297mm" version="1.1" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
...
</svg>
`
```

## Step 3: Load the SVG as a snippet

You can't just inject raw SVG into a FreeSewing design. But you can add it as
a snippet, and then include that snippet in your code.

To do so, we're going to:

- Import our SVG into (the JS file holding) our part

```js
import { background } from './original.mjs'
```

- Create a plugin that will add it as a snippet

```js
const bgPlugin = {
  name: 'svgBackgroundPlugin',
  version: 1,
  hooks: {
    preRender: function (svg) {
      svg.defs.setIfUnset( 'background', background)
    },
  },
}
```

- Load the plugin in our part

```js
export const part = {
  name: 'example.part',
  draft: draftPart,
  plugins: [
    // Here's our plugin to add the snippet
    bgPlugin,
  ]
}
```

## Step 4: Use the snippet in our draft method

```js
function draftPart ({ Point, points, Path, paths, part }) {

  // The 'bg' that we use here must match the id we set on the SVG tag
  snippets.background = new Snippet('bg', new Point(0,0))

  // Snippets aren't taken into account for the bounding box
  points.anchor = new Point(0,0)
  paths.diagonal = new Path()
    .move(points.anchor)
    .line(new Point(2000,2000))
    .setClass('hidden')

  // Develop your part here
  
  return part
}
```

## Summary

What we want is for our original pattern to be shown as the background of our development environment.
To do so, we needed to take a couple of steps:

- Turn it into SVG: Because FreeSewing patterns are SVG
- Turn it into a JavaScript file: Because you can't `import` an SVG like that
- Give it an `id`: So we can use that to reference it when adding the snippet
- `import` the SVG into our part
- Create a plugin to add it as a snippet
- Add the plugin to our part
- Use the snippet in our part's draft method

<Warning>
Be mindful of the scale of the background SVG when using this technique
</Warning>
