# Change log for: @freesewing/titan


## 2.19.4 (2022-11-09)

### Fixed

 - Fixed a regression that caused the `waistHeight` option to be ignored. Closes [#1467](https://github.com/freesewing/freesewing/issues/1467)

## 2.19.2 (2021-11-02)

### Changed

 - Migrated the `waistbandWidth` option from mm to snapped pct

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.15.0 (2021-04-15)

### Added

 - Added the waistbandHeight option
 - Added the crossSeamCurveAngle option
 - Added the crotchSeamCurveAngle option

### Changed

 - Crotch- and Cross seam have been redrawn using the new angle options
 - Added waistbandWidth option

### Fixed

 - Adapt seat control point when waist is dropped below the hip line
 - Removed lingering console.log statements
 - Configure dependencies to guarantee draft order
 - Always keep seat control point vertically between styled waist and seat
 - Adapt the outseam to the dropped waist in all circumstances

## 2.13.2 (2021-02-21)

### Fixed

 - Always ensure point waistIn is created in back part

## 2.13.0 (2021-02-13)

### Fixed

 - Always balance the waist

## 2.10.4 (2020-11-13)

### Fixed

 - Issue with incorrectly named point

## 2.7.0 (2020-07-12)

### Added

 - A FreeSewing block for pants/trousers
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

