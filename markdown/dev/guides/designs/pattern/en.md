---
title: Pattern
order: 80
---

Last but not least, we've arrived at the level of the pattern itself.
The pattern is a container that holds all your parts, along with the configuration
and the store.

In reality, your pattern will be a _constructor_ that takes the user's settings as
input and will return a new instance of your pattern.

That pattern instance will have a `draft()` method which will do the actual work of
drafting the pattern. Once drafted, you can either call the `render()` method on
the pattern instance, or pass it to our React component to render it in the browser.
