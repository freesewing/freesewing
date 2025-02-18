# Change log for: @freesewing/bruce


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

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

 - Added notches to facilitate seam matching

## 2.11.3 (2021-01-16)

### Fixed

 - Added missing scalebox

## 2.7.1 (2020-07-24)

### Fixed

 - Fixed a check for an undefined value in the store

## 2.7.0 (2020-07-12)

### Changed

 - Ported bruce to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

### Fixed

 - Sampling some options would not work in Bruce because the code shared across patterns would only run once. That's fixed now.

## 2.0.3 (2019-09-15)

### Fixed

 - [#106](https://github.com/freesewing/freesewing/issues/106): Fix incorrect hem allowance

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

