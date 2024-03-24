# Change log for: @freesewing/aaron


## 3.1.0 (2023-12-26)

### Changed

 - Rephrased flag message when expand is off to avoid confusion about included seam allowance. Fixes

### Fixed

 - Added IDs to dimension macros that missed them, causing them to not be shown
 - Keep seam allowance out of the binding length calculation

## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Support drafting for high bust

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.7.1 (2020-07-24)

### Fixed

 - Set missing option `brianFitCollar` to `false`

## 2.7.0 (2020-07-12)

### Changed

 - Updated side seam shaping and tweaked options for better defaults
 - Better handling of `armholeDrop` option
 - Ported aaron to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Report armhole and neck opening length through raised events

### Fixed

 - Fixed incorrect instruction for neck binding (the indicated length was only half)

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

