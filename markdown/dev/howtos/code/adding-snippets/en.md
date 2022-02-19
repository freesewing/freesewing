---
title: Adding snippets
for: developers
about: Shows you how to add snippets to your pattern
---

After using the [shorthand](/howtos/code/shorthand/) call,
`Snippet` contains the path constructor, while `snippets` is a reference to `part.snippets`,
which is where you should store your paths.

Things will now *just work* when you do this:

```js
snippets.logo = new Snippet('logo', points.logoAnchor);
```

You can scale and rotate a snippet by setting the `data-scale` and `data-rotate` attributes respectively.

-   **data-scale** : Either a single scale factor, or a set of 2 scale factors for the X and Y axis respectively. See [the SVG scale transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#Scale) for details.
-   **data-rotate**: A rotation in degrees. The center of the rotation will be the snippet's anchor point

<Tip>

See [Using attributes](/howtos/code/attributes/) for details on how to set attributes.

</Tip>

Below is an example of the available snippets, and the use of the `data-scale` and `data-rotate` attributes:

<Example pattern="rendertest" options_only="snippets">
Overview of available snippets 
</Example>
