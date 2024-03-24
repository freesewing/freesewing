# Change log for: @freesewing/hugo


## 3.2.0 (2024-02-11)

### Fixed

 - Fix issue that crashed the design when complete is off. Fixes
 - Base pocket opening on pocket height, rather than width of the garment. Fixes

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

 - Support drafting for high bust Closes [#802](https://github.com/freesewing/freesewing/issues/802)

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

### Fixed

 - Fix incorrect seam allowance Closes [#2208](https://github.com/freesewing/freesewing/issues/2208)

## 2.20.1 (2022-01-27)

### Fixed

 - Seam allowance on pocket is incorrectly marked for cut-on-fold Closes [#1731](https://github.com/freesewing/freesewing/issues/1731)

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.17.0 (2021-07-01)

### Changed

 - Set brian `s3` options as constants

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.14.0 (2021-03-07)

### Fixed

 - Replaced grainline indicator on pocket with cut-on-fold indicator

## 2.13.0 (2021-02-13)

### Fixed

 - Fix style of the seam allowance paths
 - Fix sleeve dependencies

## 2.11.3 (2021-01-16)

### Fixed

 - Removed inherited notches

## 2.7.1 (2020-07-24)

### Fixed

 - Set missing option `brianFitCollar` to `false`
 - Adding missing control point to front neck opening

## 2.7.0 (2020-07-12)

### Added

 - Added shaping of the side seam

### Changed

 - Changed some option to better defaults
 - Ported hugo to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

## 2.6.0 (2020-05-01)

### Fixed

 - Render fully-sized pattern parts when complete is falsy
 - Do not render pocket outline when complete is falsy
 - Do not render pocket facing hint when complete is falsy

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### Fixed

 - Made sure dimensions for hood center and waistband are always shown

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

