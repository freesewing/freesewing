# Change log for: @freesewing/huey


## 3.1.0 (2023-12-26)

### Changed

 - Rephrased flag message when expand is off to avoid confusion about included seam allowance. Fixes

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

## 2.20.8 (2022-05-21)

### Changed

 - Better defaults for sleevecap and armhole depth
 - Huey now extends the Brian config

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.18.0 (2021-09-09)

### Fixed

 - Replace cut-on-fold indicator on pocket with a regular grainline indicator Closes [#1265](https://github.com/freesewing/freesewing/issues/1265)

## 2.17.0 (2021-07-01)

### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.16.0 (2021-05-24)

### Fixed

 - Fix hood dependencies See [#1026](https://github.com/freesewing/freesewing/issues/1026)

## 2.11.3 (2021-01-16)

### Fixed

 - Added missing scalebox
 - Added cut-on-fold indicator to pocket
 - Removed lingering notch from pocket part

## 2.7.0 (2020-07-12)

### Changed

 - No longer use the `naturalWaist` measurement
 - Changed some option to better defaults
 - Ported huey to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Made the `shoulderSlopeReduction` option static so it's not available in the UI
 - Removed `Circumference` suffix from measurement names

### Fixed

 - [Added seam allowance to the front closure](https://github.com/freesewing/freesewing/issues/420)

## 2.4.4 (2020-03-15)

### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

