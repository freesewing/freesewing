# Change log for: @freesewing/plugin-bust


## 4.0.0 (2024-04-01)

### Changed

 - This plugin now uses the `preSetDraft` rather than `preDraft` lifecycle hook
 - Conditionality has been moved to the `preSetDraft` lifecycle hook, rather than exposing a `withCondition` named export
 - The plugin will now always be loaded, but will check for each drafted set whether it should make any changes.

### Deprecated

 - The `withCondition` named  export is deprecated and will always return true.

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

## 2.19.6 (2021-12-29)

### Added

 - Added (esm) unit tests

## 2.7.0 (2020-07-12)

### Changed

 - Removed `Circumference` suffix from measurement names

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

