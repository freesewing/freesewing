---
title: Your first part
order: 120
---

Much like garments themselves, patterns are made up of _parts_.

Most patterns will have multiple parts. A sleeve, a back part, the collar, and so on.
Our pattern is very simple, and only has one part: the bib.

The pattern that's been created for us also just has one part to get you started.
It's called **box** and it draws a box. If you click on the **To your design**
button in your browser, you'll get to see it:

![The default pattern with its box part](./step1.png)

Since we only need one part, we'll rename this _box_ part, and call it _bib_.

## Rename the box part to bib

First, update the index file in `design/src/index.mjs`.

Update the **import** statement with `bib` and `bib.mjs`, rather than `box` and `box.mjs`.

```js
import { bib } from './bib.mjs'
```

Update the **parts** array with `bib`, rather than `box`:

```js
parts: [ bib ],
```

Update the **export** statement with `bib`, rather than `box`:

```js
export { bib, Pattern }
```

<Note>

##### Don't worry about the big red error

This will (temporarily) cause en error to appear in your development environment, because the rest of the code is expecting to find a part named `bib`, but we will fix this in the next steps.

</Note>

When that's done, rename the `design/src/box.mjs` file to `design/src/bib.mjs`.

```sh
mv box.mjs bib.mjs
```

Finally, in the `design/src/bib.mjs` file, update the draft method name from `draftBox` to `draftBib` and the part name from `bib.box` to `bib.bib`.:

```js
function draftBib({
```

```js
name: 'bib.bib',
```

```js
draft: draftBib,
```

<Tip>

###### Always use draftPartname

If you have a part named `sleeve` you should have a method called `draftSleeve()` that drafts that part.

In our case, we have a part named `bib` so we're using `draftBib()` as the method that drafts it.

This will help with debugging when the error is reported coming from the `draftBib()` method (as opposed to a generic `draft()` method from an unknown part).

</Tip>

Congratulations, your pattern now has a `bib` part, rather than a `box` part.
It still looks the same though:

<Example pattern="tutorial" part="step1">
Our bib part, which is the renamed box part
</Example>

This `bib` part is where we'll do some real work. But first, we have some more configuration to do.
