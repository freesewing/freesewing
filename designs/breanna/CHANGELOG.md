# Change log for: @freesewing/breanna


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Fixed

 - Fixed bug where a large shoulder slope could cause an error. Fixes [#2516](https://github.com/freesewing/freesewing/issues/2516)

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.13.0 (2021-02-13)

### Fixed

 - Try harder to find the intersection point for the scyedart
 - Define missing y variable in paperless branch

## 2.7.0 (2020-07-12)

### Changed

 - Ported breanna to the new shoulderSlope measurement. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - Ported breanna to the new (names for) other measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

## 2.2.0 (2020-02-22)

### Added

 - Breanna is a body block for womenswear

### Changed

 - Removed deprecated `centerBackNeckToWaist` and `hpsToWaistBack` measurements


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

