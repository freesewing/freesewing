# Change log for: @freesewing/cathrin


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Fixed

 - Removed seam allowance from Part1a foldline. Fixes [#2545](https://github.com/freesewing/freesewing/issues/2545)

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.7.0 (2020-07-12)

### Changed

 - Ported carlita to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set sample anchor points on all panels
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

### Fixed

 - [Fixed missing points issue when changing panels option](https://github.com/freesewing/freesewing.org/issues/619)
 - Fixed panels option being a list of numbers rather than strings

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

