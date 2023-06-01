---
title: plugin-timing
---

Published as [@freesewing/plugin-timing][1], this plugin measures
detailed timing information while drafting a design and adds it to the
pattern store.

It is intended to be used by developers trying to determine which parts
of their code are slow, or in general to provide insights into the speed
at which a design can be drafted.

## Installation

```sh
npm install @freesewing/plugin-timing
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { timingPlugin } from '@freesewing/plugin-timing'
// or
import { pluginTiming } from '@freesewing/plugin-timing'
```

## Information in `store`

The plugin adds the following key/value pairs to the `store` before
and after the pattern and parts drafting process.

| Key | Description |
|----------|-------------|
| `timing.draft.start` | Timestamp for the start of the pattern drafting process |
| `timing.draft.took` | Time it took to draft the pattern |
| `timing.parts.[part name].start` | Timestamp for the start of the part drafting process |
| `timing.parts.[part name].took` | Time it took to draft the part |

<Note>

Units and types depend on whether the pattern is generated in a browser
or via Node.js.

- If the pattern is generated in a browser,
both start timestamps and draft times are in milliseconds,
and the values are Numbers.

- If the pattern is generated via Node.js,
start timestamps are in nanoseconds, draft times are in microseconds,
and the values are
[BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

</Note>

## Examples

### Via Node.js

```js
import { Aaron } from '@freesewing/aaron'
import { cisFemaleAdult34 } from "@freesewing/models"
import { pluginTiming } from '@freesewing/plugin-timing'

const pattern = new Aaron({
  measurements: cisFemaleAdult34,
})
  .use(pluginTiming)

const svg = pattern.draft().render()

const patternTook = pattern.setStores[0].get(['timing', 'draft', 'took'])
console.log('The Aaron pattern took ' + patternTook + ' µs to draft.')

const frontTook = pattern.setStores[0].get(['timing', 'parts', 'aaron.front', 'took'])
console.log('The aaron.front part took ' + frontTook + ' µs to draft.')

console.log(JSON.stringify(pattern.setStores[0].timing,
  (key, value) => typeof value === 'bigint' ? value.toString() : value))
```

### In a browser

For example, in `designs/aaron/src/back.mjs`:

```js
import { pluginTiming } from '@freesewing/plugin-timing'
import { front } from '@freesewing/aaron'

export const back = {
  from: front,
  plugins: [ pluginTiming ],
  draft: ({
    store,
    log,
    part,
...
  }) => {
...

  const frontTook = store.get(['timing', 'parts', 'aaron.front', 'took'])
  log.info('The aaron.front part took ' + frontTook + ' ms to draft.')

  log.info(JSON.stringify(store.timing))

  return part
  },
}
```

[1]: https://www.npmjs.com/package/@freesewing/plugin-timing
