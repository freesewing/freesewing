# Change log for: @freesewing/brian


## 3.2.0 (2024-02-11)

### Fixed

 - Take biceps ease into account when calculating armhole depth

## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Support drafting for high bust

### Fixed

 - Make s3 options sticky to zero below 10% to avoid path split issues. Fixes [#2249](https://github.com/freesewing/freesewing/issues/2249)

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds
 - Slightly increased the default neck ease

## 2.20.8 (2022-05-21)

### Added

 - Set `sleevecapHeight` value in store

### Changed

 - Better defaults for sleevecap and armhole depth

### Fixed

 - Adde both front and back armhole pitch points Closes [#2057](https://github.com/freesewing/freesewing/issues/2057)
 - Fixed issue with the sleeve length

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.19.7 (2022-01-06)

### Changed

 - Always calculate sleevecap notch from armhole rather than shoulder
 - Default for `sleevecapEase` option is now `0`

## 2.17.0 (2021-07-01)

### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.16.0 (2021-05-24)

### Fixed

 - Paperless dimensions don't extend to hem See [#1030](https://github.com/freesewing/freesewing/issues/1030)

## 2.11.2 (2021-01-11)

### Added

 - Marked waistline on Brian. Closes [#782](https://github.com/freesewing/freesewing/issues/782)

## 2.7.0 (2020-07-12)

### Changed

 - Ported brian to new `shoulderSlope` degree measurement. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - Ported brian to the new (names for) other measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set HPS as anchor point for sampling in front and back
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

## 2.6.0 (2020-05-01)

### Fixed

 - The `saBase` path is no longer being rendered

## 2.2.0 (2020-02-22)

### Changed

 - Reworked Brian to use the new shoulderslope measurement
 - Removed deprecated `centerBackNeckToWaist` measurement
 - The `neck` point has been renamed to `hps`

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

