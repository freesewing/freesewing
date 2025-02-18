# Change log for: @freesewing/sven


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
 - Sven now extends the Brian config

## 2.20.0 (2022-01-24)

### Changed

 - Expose the `hipsEase` option to the user via option groups
 - Lock the `waistEase` option to a static value
 - Switched to default import for version from package.json

## 2.17.0 (2021-07-01)

### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.7.1 (2020-07-24)

### Fixed

 - Avoided loading unset ribbingHeight from store

## 2.7.0 (2020-07-12)

### Changed

 - Improved the shaping of the side seam
 - Changed some option to better defaults
 - Ported sven to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

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

