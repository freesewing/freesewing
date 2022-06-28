# Change log for: @freesewing/utils


## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.17.3 (2021-08-16)

### Fixed

 - Added missing `bustPointToUnderbust` measurement to `neckstimate`

## 2.16.1 (2021-05-30)

### Changed

 - neckstimate now takes an extra `noRound` parameter to return the unrounded value
 - measurementDiffers takes an extra `absolute` value that can be set to false to get the non-absolute and non-rounded value

## 2.13.1 (2021-02-14)

### Added

 - Pass pattern handle to tiler

## 2.7.1 (2020-07-24)

### Added

 - Added backend calls for creating gists/issues on Github

## 2.7.0 (2020-07-12)

### Added

 - Added new `isDegMeasurement` method. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - `neckStimate` now supports all new measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)

### Changed

 - Changed `neckstimate` to handle new `shoulderSlope` degree measurement. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - Changed `neckstimate` to support all new measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Ported `neckstimate` to the crotchDepth measurement. See [#425](https://github.com/freesewing/freesewing/issues/425)
 - Removed `Circumference` suffix from measurement names
 - Added the `isDegMeasurement` method

## 2.4.5 (2020-03-19)

### Changed

 - neckstimate() now returns values rounded to nearest mm

## 2.4.1 (2020-03-04)

### Fixed

 - [#542](https://github.com/freesewing/freesewing.org/issues/542): Prevent neckstimate from throwing when getting an unexpected measurement 

## 2.2.0 (2020-02-22)

### Changed

 - Neckstimate now uses proportions only

## 2.1.6 (2019-11-24)

### Fixed

 - [#317](https://github.com/freesewing/freesewing.org/issues/317): Fixed bug where format was not passed to formatImperial

## 2.1.3 (2019-10-18)

### Changed

 - Adjusted slope of the shoulderToShoulder measurement in neckstimate data

### Fixed

 - [#250](https://github.com/freesewing/freesewing.org/issues/250): Model page stays empty with pre 2.0 model data: Error: 'neckstimate() requires a valid measurement name as second parameter. (received underBust)'

## 2.1.1 (2019-10-13)

### Fixed

 - Fixed an issue with the formatMm method not adding units

## 2.1.0 (2019-10-06)

### Added

 - Added backend methods for administration
 - Added the resendActivationEmail method to backend

### Fixed

 - Fixed an issue where optionDefault was not handling list options correctly

## 2.0.3 (2019-09-15)

### Fixed

 - Fix measurementDiffers to pass breasts parameter to neckstimate

## 2.0.2 (2019-09-06)

### Fixed

 - Removed lingering debug statement in formatImperial

## 2.0.1 (2019-09-01)

### Added

 - The `measurementDiffers` method is new.

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

