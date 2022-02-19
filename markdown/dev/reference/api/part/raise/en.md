---
title: Part raise methods
---

A part's different `raise` methods are used to bring information to the attention
of the user, or developer. You can think of them as logging methods the register
data.

<Warning>

##### FreeSewing v3 breaking changes

This behavior is likely to change in FreeSewing v3. Refer to [the
roadmap](https://github.com/freesewing/freesewing/discussions/1278) for details.

</Warning>

There are four different types of information with their own method:

<ReadMore list  />

Practically, the pattern object has an `events` property as such:

```js
events: {
  debug: [],
  error: [],
  info: [],
  warning: []
}
```

Calling the relevant `raise` method will add the data you pass to it to the relevant array.

For example, if we use:

```js
raise.info('Hello')
```

The result will be:

```js
events: {
  debug: [],
  error: [],
  info: [
    'Hello'
  ],
  warning: []
}
```

<Note>

##### Errors are not harmless, the rest is

It's important to note that only the `error` type has an impact.
The other types merely add information to the pattern.

But if an error is raised, core won't attempt to pack the pattern parts on the page.
In other words, it will abort after the draft, and not provide a layout.

</Note>
