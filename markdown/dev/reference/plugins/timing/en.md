---
title: plugin-timing
---

Published as [@freesewing/plugin-timing][1], this plugin measures
detailed timing information while drafting a design and keeps it in the
pattern store.

It is intended to be used for developers trying to indicate which parts
of their code are slow, or in general provide insights into the speed
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
import { timingPlugin } from '@freesewing/plugin-mirror'
// or
import { pluginTiming } from '@freesewing/plugin-mirror'
```

<Fixme>

##### Provide in-depth example

This is currently not used, but that will change once v3 gets closer to release.
At that point, we should provide an in-depth example here.

</Fixme>

## Notes

The mirror plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-timing
