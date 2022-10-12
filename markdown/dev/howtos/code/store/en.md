---
title: Sharing data between parts
---

Sometimes, you'll want to access data from one part into another part. For
example, you may store the length of the armhole in your front and back parts,
and then read that value when drafting the sleeve so you can verify the sleeve
fits the armhole.

For this, you should use the [Store](/reference/api/store/), which is available
via _destructuring_ in your part's draft method.

Setting a value in one part:

```mjs
function draftPartA({
  // highlight-start
  store,
  // highlight-end
  part,
}) {
  // highlight-start
  store.set('hello', 'world')
  // highlight-end

  return part()
}
```

Reading a value in another part:

```mjs
function draftPartB({
  // highlight-start
  store,
  // highlight-end
  part,
}) {
  // highlight-start
  const value = store.get('hello')
  // value now contains 'world'
  // highlight-end

  return part()
}
```

In a case like this, the order in which parts are drafted becomes important, so you
should reflect that in the [part dependencies](/howtos/code/after).
