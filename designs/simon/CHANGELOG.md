# Change log for: @freesewing/simon


## 2.21.2 (2022-06-29)

### Changed

 - Decreased default collar ease
 - Increased default yoke height

## 2.21.0 (2022-06-26)

### Changed

 - Migrated from Rollup to Esbuild for all builds
 - More accurately determine the cuff width
 - Corrected the hide() signature in the config

### Fixed

 - Handle edge-case for 1/10 dolls with breasts where path split would yield empty half

## 2.20.8 (2022-05-20)

### Changed

 - Better defaults for sleevecap and armhole depth
 - Slightly higher collar vs collar stand
 - Simon now extends the Brian config

### Fixed

 - Fixed issue with the sleeve length

## 2.20.5 (2022-02-16)

### Fixed

 - Fixed grainline indicator on sleeve since it was slightly off-grain

## 2.20.3 (2022-01-27)

### Fixed

 - Properly style SA paths on cuffs and collarstand
 - SA path on sleeve was double-drawn

## 2.20.1 (2022-01-26)

### Fixed

 - Remove debug outline when enabling box pleat setting

## 2.20.0 (2022-01-23)

### Changed

 - Switched to default import for version from package.json

## 2.19.9 (2022-01-08)

### Fixed

 - Fix incorrectly alliegned fabric match line. Move to CF instead [Fixed by @nicholasdower in

## 2.19.8 (2022-01-07)

### Fixed

 - Make seam allowance stop at fold when using rounded back option Fixes [#1608](https://github.com/freesewing/freesewing/issues/1608)

## 2.19.7 (2022-01-05)

### Fixed

 - Correctly place sleevecap notches Closes [#1602](https://github.com/freesewing/freesewing/issues/1602)

## 2.19.4 (2021-11-08)

### Fixed

 - Fix dependencies when only drafting a front Closes [#1445](https://github.com/freesewing/freesewing/issues/1445)

## 2.19.2 (2021-11-01)

### Fixed

 - Fixed missing store object in button(hole)placket part

## 2.19.1 (2021-10-22)

### Fixed

 - Fixed incorrect value for `brianFitCollar` resulting in incorrect collar fit Closes [#1411](https://github.com/freesewing/freesewing/issues/1411)

## 2.19.0 (2021-10-16)

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

## 2.18.0 (2021-09-08)

### Fixed

 - Avoid paperless depending on a complete pattern

## 2.17.4 (2021-08-19)

### Fixed

 - Fixed typo that caused paperless to error

## 2.17.2 (2021-08-14)

### Added

 - Added new ffsa option to let the user control the extra SA for flat-felled seams Closes [#1251](https://github.com/freesewing/freesewing/issues/1251)

## 2.17.0 (2021-06-30)

### Added

 - Added support for configuring the height of the Yoke. See [#642](https://github.com/freesewing/freesewing/issues/642)
 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)
 - Added the `roundBack` option to replace the `yokeDart` option

### Removed

 - The `yokeDart` option is replaced by the `roundBack` option

## 2.16.1 (2021-05-29)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.15.1 (2021-04-23)

### Added

 - Added some dimensions to clarify the X value of shoulder/armhole points

## 2.13.1 (2021-02-13)

### Fixed

 - Added missing sleeve notch on yoke

## 2.11.3 (2021-01-15)

### Fixed

 - Cleaned up notches
 - Marked where to match fabric on closure

## 2.10.7 (2020-11-17)

### Fixed

 - Yoke dart did not affect sleevecap length. See [#687](https://github.com/freesewing/freesewing/issues/687)

## 2.7.1 (2020-07-23)

### Fixed

 - Set missing option `brianFitCollar` to `false`
 - Don't assume the `chHips-notch` is available because it's not in Simone. Fixes [#833](https://github.com/freesewing/freesewing.org/issues/833)

## 2.7.0 (2020-07-11)

### Changed

 - Ported simon to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.4.4 (2020-03-14)

### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

## 2.2.0 (2020-02-21)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.1.9 (2020-01-17)

### Fixed

 - [#253](https://github.com/freesewing/freesewing/issues/253): Fixed type in simon sleeve causing incorrect cuff issue

## 2.1.8 (2019-12-15)

### Fixed

 - [#416](https://github.com/freesewing/freesewing.org/issues/416): Fixed bug in simon sleeve

## 2.1.0 (2019-10-05)

### Changed

 - [#123](https://github.com/freesewing/freesewing/issues/123): Added a box pleat option to Simon
 - Added the `backDarts` option to control the inclusion of back darts
 - Added the `backDartsShaping` option to control the amount of shaping by the back darts
 - Changed the defaults to slightly reduce the ease and adapt the sleevecap

### Fixed

 - Fixed an issue where the store wasn't properly initialized causing hips and waist ease to be set incorrectly
 - Added a missing paperless dimension for the waist
 - Fixed an issue where the split yoke option was not taken into account correctly

## 2.0.2 (2019-09-05)

### Fixed

 - [#100](https://github.com/freesewing/freesewing.org/issues/100): Updated simon with more sensible defaults for ease options
 - [#102](https://github.com/freesewing/freesewing.org/issues/102): Fixed 'Snippets not defined' error when drafting a seperate button placket
 - [#103](https://github.com/freesewing/freesewing.org/issues/103): Fixed 'hemSa not defined' when drafting paperless Simon without seam allowance

## 2.0.0 (2019-08-24)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

