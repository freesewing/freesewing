# Change log for: @freesewing/plugin-versionfree-svg


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

## 2.19.0 (2021-10-17)

### Added

 - This is a plugin to strip (FreeSewing) versdion info out of the SVG to allow you to diff your SVG output between FreeSewing versions
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

