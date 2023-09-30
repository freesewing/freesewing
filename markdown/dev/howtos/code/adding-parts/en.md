---
title: Adding pattern parts
---

Parts can be added to the design add build time, by passing them to [the Design
constructor](/reference/api/design), or at runtime by calling
[Pattern.addPart()](/reference/api/pattern/addpart). The latter approach is
rarely used, but it's there if you need it.

## At build time

```mjs
import { Design } from '@freesewing/core'
import { myPart } from './mypart.mjs'

const Sorcha = new Design({
  parts: [ myPart ]
})
```

## At run time

```mjs
import { Aaron } from '@freesewing/aaron'
import { myRuntimePart } from './mypart.mjs'

const pattern = new Aaron()
pattern.addPart(myRuntimePart)
```
