---
title: Creating a new snippet to be used in your design
---

Snippets are typically added by plugins. If you have your own snippet you want
to use, you can add it to your design by loading it in an ad-hoc plugin.

Here's how to do that:

## Define the snippet

First thing to do is define the snippet. A snippet will end up in the [SVG
defs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs) element
where it can be referenced via [the SVG use
tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use).

So your snippet should be SVG content that can be referenced with a single ID.
That ID will also be the name of the snippet. Let's say we want to add `smiley`
then we would create it like this:

```mjs
const smiley = `
<g id="smiley">
  <circle cx="-4" cy="4" r="1" style="fill: var(--pattern-mark)"></circle>
  <circle cx="4" cy="4" r="1" style="fill: var(--pattern-mark)"></circle>
  <path d="M -8,6 C -8,18 8,18 8,6" style="stroke: var(--pattern-mark); fill: none;"></path>
</g>
`
```

If you're curious, it will end up looking like this:

![Preview of our snippet](smiley.png)


<Warning>

##### Avoid self-closing tags

Avoid using self-closing tags in your SVG defs definitions.
While this will work fine in actual SVG:
```svg
<circle cx="-4" cy="4" r="1" />
```

Make sure to explicitly close the tag in your defs:
```svg
<circle cx="-4" cy="4" r="1"></circle>
```

</Warning>

## Load the plugin

In your part config, we are going to add an ad-hoc plugin to our `plugins` key
and load the snippet into the defs section of our SVG document:

```mjs
  plugins: [{
    name: 'smiley-snippet-plugin',
    version: '1.0.0',
    hooks: {
      preRender: [
        function(svg) {
          svg.defs.setIfUnset( 'smiley', smiley)
        }
      ]
    }
  }],
```

## Styling snippets

Styling snippets is something that can frustrating if you are not familiar with
how they are rendered under the hood.  The SVG `use` tag creates a so-called
*showdow-dom* and styles will behave something different in that shadowy realm.

For example, you can't just slap [one of our CSS classes](/reference/css) on it
and call it a day, that won't be enough.

You can of course provide inline styles, but now your snippet can't be themed
which is a big nono for sites like FreeSewing.org that let users pick differnt
themes.

As you can see in the example, we used CSS vars, as these do work well in the
shadow-dom and suppor themeing.  You don't have to follow this approach, but we
do recommend it.

## Supporting scale

If you're looking to _do things right_ there is one more thing to take into account:
FreeSewing's [scale setting](/reference/settings/scale).

Snippets won't auto-magically adapt to the different scale, so to make that happen we
have to make a few small changes.

First, adapt the defs definition and make it a method that accepts the current scale as a parameter.
We then simply apply a transform and scale the snippet accordingly:

```mjs
const smiley = (scale) => `
<g id="smiley" transform="scale(${scale})">
  <circle cx="-4" cy="4" r="1" style="fill: var(--pattern-mark)"></circle>
  <circle cx="4" cy="4" r="1" style="fill: var(--pattern-mark)"></circle>
  <path d="M -8,6 C -8,18 8,18 8,6" style="stroke: var(--pattern-mark); fill: none;"></path>
</g>
`
```

Then adapt the lifecycle hook method to load the def by calling the method and passing the current scale:

```mjs
  plugins: [{
    name: 'smiley-snippet-plugin',
    version: '1.0.0',
    hooks: {
      preRender: [
        function(svg) {
          svg.defs.setIfUnset(
            'smiley', smiley(svg.pattern.settings[0].scale)
          )
        }
      ]
    }
  }],
```

