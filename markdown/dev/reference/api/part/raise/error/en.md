---
title: raise.error()
---

```js
raise.error(data)
```

The `raise.error()` method adds an event of type `error` to the pattern.

<Note>

##### Raising an error will prevent the pattern from being completed

Unlike other events, which have no side-effects, if there is one or more
events of type `error`, the pattern will not be completed.

In other words, you should only use this when the situation is unrecoverable.
If not, [raise a warning](/reference/api/part/raise/warning).

</Note>

<Tip>

All raise methods are available via [the shorthand method](/reference/api/part/shorthand)

</Tip>
