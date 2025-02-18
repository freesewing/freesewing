# Change log for: @freesewing/simone


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Added Bust-aligned buttons option and functionality. Closes [#2154] (https://github.com/freesewing/freesewing/issues/2154)
 - Added a notch at the center front bustline.

### Fixed

 - Don't do a negative FBA from there's no need for an FBA Fixes [#2121](https://github.com/freesewing/freesewing/issues/2121)
 - Duplicate config rather than mutating the imported simon config

## 2.21.2 (2022-06-30)

### Changed

 - Decreased default collar ease
 - Increased default yoke height

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds
 - More accurately determine the cuff width

### Fixed

 - Added the frontdarts option back after it was (accidentally) removed
 - Handle edge-case for 1/10 dolls with breasts where path split would yield empty half

## 2.20.8 (2022-05-21)

### Changed

 - Better defaults for sleevecap and armhole depth
 - Slightly higher collar vs collar stand
 - Simone now extends the Simon config

### Fixed

 - Fixed issue with the sleeve length

## 2.20.5 (2022-02-17)

### Fixed

 - Fixed grainline indicator on sleeve since it was slightly off-grain

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.19.7 (2022-01-06)

### Fixed

 - Correctly place sleevecap notches Closes [#1602](https://github.com/freesewing/freesewing/issues/1602)

## 2.19.4 (2021-11-09)

### Fixed

 - Fix dependencies when only drafting a front Closes [#1445](https://github.com/freesewing/freesewing/issues/1445)

## 2.19.2 (2021-11-02)

### Fixed

 - Fixed missing store object in button(hole)placket part

## 2.19.1 (2021-10-23)

### Fixed

 - Fixed incorrect value for `brianFitCollar` resulting in incorrect collar fit Closes [#1411](https://github.com/freesewing/freesewing/issues/1411)

## 2.19.0 (2021-10-17)

### Changed

 - Changed the `buttonPlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketFoldWidth` option type from `mm` to `pct`
 - Changed the `collarStandWidth` option type from `mm` to `pct`
 - Changed the `sleevePlacketWidth` option type from `mm` to `pct`
 - Changed the `boxPleatWidth` option type from `mm` to `pct`
 - Changed the `boxPleatFold` option type from `mm` to `pct`

### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1318](https://github.com/freesewing/freesewing/issues/1318)
 - Fix issue with armhole introduced with the S3 options in Brian Closes

## 2.17.2 (2021-08-15)

### Added

 - Added new ffsa option to let the user control the extra SA for flat-felled seams Closes [#1251](https://github.com/freesewing/freesewing/issues/1251)

## 2.17.0 (2021-07-01)

### Added

 - Added support for configuring the height of the Yoke. See [#642](https://github.com/freesewing/freesewing/issues/642)
 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)
 - Added the `roundBack` option to replace the `yokeDart` option

### Removed

 - The `yokeDart` option is replaced by the `roundBack` option

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.13.2 (2021-02-21)

### Fixed

 - Fixed type in bustsidecode finder code

## 2.13.0 (2021-02-13)

### Fixed

 - Force bust dart intersection if not found initially

## 2.11.3 (2021-01-16)

### Fixed

 - Cleaned up notches

## 2.7.1 (2020-07-24)

### Fixed

 - Set missing option `brianFitCollar` to `false`

## 2.7.0 (2020-07-12)

### Changed

 - Ported simone to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.4.4 (2020-03-15)

### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

## 2.2.0 (2020-02-22)

### Changed

 - Renamed `highPointShoulderToBust` measurement to `hpsToBust`
 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.1.0 (2019-10-06)

### Added

 - Added the Simone shirt pattern
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

