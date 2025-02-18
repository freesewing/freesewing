# Change log for: @freesewing/plugin-gore


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - The `goreNumber` property of the gore macro has been renamed to `gores`
 - Using `goreNumber` is now deprecated in favor of `gore` and will be removed in the next majot version

## 2.19.6 (2021-12-29)

### Added

 - Added (esm) unit tests

## 2.3.0 (2020-02-23)

### Added

 - A plugin to generate gores for semi-spheres or domes
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

