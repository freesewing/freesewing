---
title: Macro methods
order: 120
---

FreeSewing plugins can provide macros, which is a way to automate multiple
steps into a single command.

## Signature

To provide one or more macros, your plugin should have a `macros` property that
is an object where the keys are the macro name, and the value holds a method to
run when the macro is executed.

```mjs
const myPlugin = {
  name: 'example',
  version: '0.0.1',
  macros: {
    example: function(so, { log }) {
      log.info('Running the example macro')
    }
  }
}
```

## Arguments

All macros receive two arguments:

- `so`: A plain object holding configuration object passed to the macro
- `props`: The same object as passed to the [`Part.draft()`](/reference/api/part/draft) method that you can destructure

<Note>
###### Macros take only 1 argument

When writing a macro, keep in mind that all information that needs to be passed
to a macro needs to be contained in a single argument.

Typically, you use a single plain object to configure the macro.

</Note>

## Return value

Macros do not need to return anything. If they do, it will be ignored.
