# Change log for: @freesewing/brian


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

