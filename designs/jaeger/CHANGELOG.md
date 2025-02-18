# Change log for: @freesewing/jaeger


## 3.1.0 (2023-12-26)

### Changed

 - Rephrased flag message when expand is off to avoid confusion about included seam allowance. Fixes
 - Corrected part mixup in translation of flag message

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

## 2.19.0 (2021-10-17)

### Changed

 - Changed the `collarRoll` option type from `mm` to `pct`

### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1321](https://github.com/freesewing/freesewing/issues/1313)

## 2.17.0 (2021-07-01)

### Changed

 - Set brian `s3` options as constants

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.16.0 (2021-05-24)

### Fixed

 - Fixed third button not showing up See [#973](https://github.com/freesewing/freesewing/issues/973)

## 2.15.2 (2021-04-28)

### Fixed

 - Draft a third button when it's requested See [#973](https://github.com/freesewing/freesewing/issues/973)

## 2.11.3 (2021-01-16)

### Fixed

 - Added missing scalebox

## 2.7.0 (2020-07-12)

### Changed

 - Changed some option to better defaults
 - Set an anchor on side part for sampling
 - Ported jaeger to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.0.2 (2019-09-06)

### Fixed

 - [#76](https://github.com/freesewing/freesewing.org/issues/76): Fixed a typo in Jaeger that was causing the side vent length to be wrong

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

