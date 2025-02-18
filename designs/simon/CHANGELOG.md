# Change log for: @freesewing/simon


## 3.1.0 (2023-12-26)

### Fixed

 - Replaced all instances of 'seperate' with 'separate' in option names

## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Support drafting for high bust

### Fixed

 - Fix issue with boxPleat and yoke Fixes [#2400](https://github.com/freesewing/freesewing/issues/2400)
 - Removed superfluous notches in button placket, buttonhole placket, and split yoke. Fixes [#2399](https://github.com/freesewing/freesewing/issues/2399)

## 2.21.2 (2022-06-30)

### Changed

 - Decreased default collar ease
 - Increased default yoke height

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds
 - More accurately determine the cuff width
 - Corrected the hide() signature in the config

### Fixed

 - Handle edge-case for 1/10 dolls with breasts where path split would yield empty half

## 2.20.8 (2022-05-21)

### Changed

 - Better defaults for sleevecap and armhole depth
 - Slightly higher collar vs collar stand
 - Simon now extends the Brian config

### Fixed

 - Fixed issue with the sleeve length

## 2.20.5 (2022-02-17)

### Fixed

 - Fixed grainline indicator on sleeve since it was slightly off-grain

## 2.20.3 (2022-01-28)

### Fixed

 - Properly style SA paths on cuffs and collarstand
 - SA path on sleeve was double-drawn

## 2.20.1 (2022-01-27)

### Fixed

 - Remove debug outline when enabling box pleat setting

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.19.9 (2022-01-09)

### Fixed

 - Fix incorrectly alliegned fabric match line. Move to CF instead [Fixed by @nicholasdower in

## 2.19.8 (2022-01-08)

### Fixed

 - Make seam allowance stop at fold when using rounded back option Fixes [#1608](https://github.com/freesewing/freesewing/issues/1608)

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

 - Support drafting of non-human measurements (dolls & giants) Closes [#1319](https://github.com/freesewing/freesewing/issues/1319)

## 2.18.0 (2021-09-09)

### Fixed

 - Avoid paperless depending on a complete pattern

## 2.17.4 (2021-08-20)

### Fixed

 - Fixed typo that caused paperless to error

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

## 2.15.1 (2021-04-24)

### Added

 - Added some dimensions to clarify the X value of shoulder/armhole points

## 2.13.1 (2021-02-14)

### Fixed

 - Added missing sleeve notch on yoke

## 2.11.3 (2021-01-16)

### Fixed

 - Cleaned up notches
 - Marked where to match fabric on closure

## 2.10.7 (2020-11-18)

### Fixed

 - Yoke dart did not affect sleevecap length. See [#687](https://github.com/freesewing/freesewing/issues/687)

## 2.7.1 (2020-07-24)

### Fixed

 - Set missing option `brianFitCollar` to `false`
 - Don't assume the `chHips-notch` is available because it's not in Simone. Fixes [#833](https://github.com/freesewing/freesewing.org/issues/833)

## 2.7.0 (2020-07-12)

### Changed

 - Ported simon to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.4.4 (2020-03-15)

### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.1.9 (2020-01-18)

### Fixed

 - [#253](https://github.com/freesewing/freesewing/issues/253): Fixed type in simon sleeve causing incorrect cuff issue

## 2.1.8 (2019-12-16)

### Fixed

 - [#416](https://github.com/freesewing/freesewing.org/issues/416): Fixed bug in simon sleeve

## 2.1.0 (2019-10-06)

### Changed

 - [#123](https://github.com/freesewing/freesewing/issues/123): Added a box pleat option to Simon
 - Added the `backDarts` option to control the inclusion of back darts
 - Added the `backDartsShaping` option to control the amount of shaping by the back darts
 - Changed the defaults to slightly reduce the ease and adapt the sleevecap

### Fixed

 - Fixed an issue where the store wasn't properly initialized causing hips and waist ease to be set incorrectly
 - Added a missing paperless dimension for the waist
 - Fixed an issue where the split yoke option was not taken into account correctly

## 2.0.2 (2019-09-06)

### Fixed

 - [#100](https://github.com/freesewing/freesewing.org/issues/100): Updated simon with more sensible defaults for ease options
 - [#102](https://github.com/freesewing/freesewing.org/issues/102): Fixed 'Snippets not defined' error when drafting a seperate button placket
 - [#103](https://github.com/freesewing/freesewing.org/issues/103): Fixed 'hemSa not defined' when drafting paperless Simon without seam allowance

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

