---
title: V3 migration guide
---

This guide covers the migration from FreeSewing version 2 (v2) to FreeSewing
version 3 (v3). It is intended for pattern designers and developers using our
core library. But it is also a good source of information for anybody who wants
to learn more about what's changed between v2 and v3 of FreeSewing.

The focus on this guide is on our core library, our designs, our monorepo, and
other topics of interest to developers.  It does not cover any changes to our
website(s) or other more user-facing aspects.

<Fixme compact>

This guide is a work in process.
ToDo:

- part level transforms
- config overloading

</Fixme>

## Breaking changes

### ESM only

FreeSewing is now ESM only. We no longer publish CJS modules.

To make this explicit, we now use the `.mjs` file extension for our source code, instead of `.js`.

### Named exports only

All our published packages now have only named exports and no longer have any
default exports.

Please refer to [the reference documentation](/reference/api#named-exports) to see what
named exports are available.

### NodeJS 16 or more recent

FreeSewing now requires NodeJS version 16 or more recent.

### Removed packages

The following packages have been removed in v3:

- **@freesewing/pattern-info**
- **gatsby-remark-jargon**: We no longer use Gatsby
- **remark-jargon**: Use rehype-jargon instead
- **@freesewing/mui-theme**: We no longer use Material-UI
- **@freesewing/css-theme**: We now use TailwindCSS
- **@freesewing/components**: These were depending on Material-UI and we no longer use it
- **@freesewing/utils**: We no longer use these, or they are included elsewhere
- **@freesewing/plugin-export-dxf**: DXF is kinda garbage, you deserve better
- **@freesewing/plugin-validate**

### API changes

#### Use log instead of raise

The `raise` object that held methods for logging has been replaced by log:

```mjs
// strikeout-start
raise.warning('This raise object no longer exists')
// strikeout-end
// highlight-start
raise.info('Use the log object instead')
// highlight-end
```

Note that `log` can be destructured in your draft method.
Refer to [the `Store.log` documentation](/reference/api/store/log) for all details.

## Migrating designs

### Design configuration

In v2, a design had its own configuration which contained all the info about
the design.  In v3, all of that is migrated to the part level. A design is now
merely a container of parts, but it also allows you to pass in additional data:

```js
import { Design } from '@freesewing/core' // Note: named export
import { myPart1, myPart2 } from './parts.mjs'

export const MyDesign = new Design({
  parts: [ myPart1, myPart2 ],
  data: {
    anything: 'goes',
    this: {
      is: ['here', 'to', 'use' ]
    }
  }
})
```

You pass the Design constructor a single object where the only required property
is the `parts` key that holds an array of part objects.  The `data` property is
optional, and allows you to add data/information to the design that you can use
to facilitate frontend integration or a host of other things. Anything under
`data` will be made available in the pattern store.

Obviously, we still need to know what measurements the design requires, what
plugins it uses, what options it offers, and so on.

All of that is now configured at the part level.

### Part configuration

In v3 of FreeSewing __all__ configuration happens at the part level.

Refer to [the part configuration docs](/reference/api/part/config) for details
on configuring parts.

Apart from being attached at the part level, changes in comparison to v2 include:

- The `name` property is mandatory in v3
- The `dependencies` property v2 is named `after` in v3
- The `inject` property in v2 is named `from` in v3
- The `hide` property is [different from v2 and has gained more features](reference/api/part/config/hide) in v3
- The `plugins` property is new 

### File and directory structure changes

- Designs no longer use a `config` folder, instead keeping the config in the parts files.
- We use `.mjs` extensions rather than `.js`

