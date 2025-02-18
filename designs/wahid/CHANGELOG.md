# Change log for: @freesewing/wahid


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Support drafting for high bust

### Fixed

 - Prevent facing/lining overlap when shoulders get very narrow fixes [#2233](https://github.com/freesewing/freesewing/issues/2233)
 - Fixed dependency issue with pocketFacing part
 - Added grainlines

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

### Fixed

 - Change hem allowance to standard SA

## 2.20.0 (2022-01-24)

### Changed

 - Switched to default import for version from package.json

## 2.18.0 (2021-09-09)

### Fixed

 - Close Seam Allowance path of front lining Closes [#1267](https://github.com/freesewing/freesewing/issues/1267)
 - Support a zero value for the `backScyeDart` option

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.13.0 (2021-02-13)

### Fixed

 - Make sure roudEnd and roundStart points are always available

## 2.11.3 (2021-01-16)

### Fixed

 - Added missing scalebox
 - Proper styling for SA on front and back

## 2.7.1 (2020-07-24)

### Added

 - Added the `square` hem style. Fixes [#672](https://github.com/freesewing/freesewing.org/issues/672)

### Changed

 - Hem radius can no longer be zero. Use teh `square` hem style for that

## 2.7.0 (2020-07-12)

### Changed

 - Ported wahid to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed `wrist` and `shoulderToWrist` as required measurements

## 2.6.0 (2020-05-01)

### Fixed

 - Removed paths.test
 - Do not draw the pocket outline unless complete is truthy
 - Prevent rounded corners on pocket bag and lining to be drawn twice
 - Closed the front seam path
 - Draft the front lining/facing even when complete is falsy

## 2.4.5 (2020-03-19)

### Fixed

 - Check whether frontScyeDart option is zero prior to implementing it

## 2.2.0 (2020-02-22)

### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

