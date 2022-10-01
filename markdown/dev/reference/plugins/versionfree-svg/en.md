---
title: versionfree-svg
---

Published as [@freesewing/plugin-versionfree-svg][1], this plugin suppresses
the inclusion of the FreeSewing version number in SVG output.  This allows
diffing pattern output between versions to check for any differences in the
output between different versions of FreeSewing.

## Installation

```sh
npm install @freesewing/plugin-versionfree-svg
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

[1]: https://www.npmjs.com/package/@freesewing/plugin-versionfree-svg

