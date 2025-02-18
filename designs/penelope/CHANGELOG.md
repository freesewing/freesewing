# Change log for: @freesewing/penelope


## 3.1.0 (2023-12-26)

### Fixed

 - Fixed wrong use of options in a value method. Fixes

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

## 2.19.5 (2021-11-13)

### Changed

 - Increased maximum for the `waistEase` option
 - Increased maximum for the `seatEase` options

## 2.19.0 (2021-10-17)

### Changed

 - Changed the `hem` option type from `mm` to `pct`
 - Changed the `waistBandWidth` option type from `mm` to `pct`
 - Changed the `seatEase` option type from `mm` to `pct`
 - Changed the `waistEase` option type from `mm` to `pct`

### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1320](https://github.com/freesewing/freesewing/issues/1316)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.13.2 (2021-02-21)

### Fixed

 - Fixed issue in shape part

## 2.7.0 (2020-07-12)

### Changed

 - Ported penelope to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.2.0 (2020-02-22)

### Fixed

 - Fixed tags in pattern config file

## 2.1.0 (2019-10-06)

### Added

 - Added the Penelope Pencil Skirt pattern by @woutervdub
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

