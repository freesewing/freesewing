---
title: "Parts: Configuration"
---

Apart from [the `draft()` method](/reference/api/part/draft) a part
can provide the following configuration properties:

- [`name`](/reference/api/part/config/name) __is mandatory__ and holds the part's name
- [`from` and `after`](/reference/api/part/config/dependencies) list the part's dependencies
- [`hide`, `hideDependencies`, or `hideAll`](/reference/api/part/config/hide) hide the part, its dependencies, or both
- [`measurements` and `optionalMeasurements`](/reference/api/part/config/measurements) lists the part's required or optional measurements
- [`options`](/reference/api/part/config/options) lists the part's options
- [`plugins`](/reference/api/part/config/plugins) lists the part's required plugins

