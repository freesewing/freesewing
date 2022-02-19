---
title: Sharing data between parts
for: developers
about: Shows how you use the pattern store to share data between parts
---

Sometimes, you'll want to access data from one part into another part.
For example, you may store the length of the armhole in your front and back parts,
and then read that value when drafting the sleeve so you can verify the sleeve fits the armhole.

For this, you should use the [Store](/reference/api/store/), which is available via
the [shorthand](/howtos/code/shorthand/) call:

```js
export default function(part) {
  let { store } = part.shorthand();
  store.set('hello', 'world');

  return part();
}
```

```js
export default function(part) {
  let { store } = part.shorthand();
  store.get('hello'); // Returns 'world'

  return part();
}
```

In a case like this, the order in which parts are drafted becomes important, so you
should reflect that in the [pattern configuration](/reference/config/).
