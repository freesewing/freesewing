---
title: Pattern
order: 80
---

<Example part="docs_overview" options_focus="Pattern">
The pattern you create will be a constructor for instances of your pattern
</Example>

Last but not least, we've arrived at the level of the pattern itself.
The pattern is a container that holds all your parts, along with the configuration
and the store.

In reality, your pattern will be a *constructor* that takes the user's settings as
input and will return a new instance of your pattern.

That pattern instance will have a `draft()` method which will do the actual work of 
drafting the pattern. Once drafted, you can either call the `render()` method on 
the pattern instance, or pass it to [our React component](/packages/components) to render it in the browser.

