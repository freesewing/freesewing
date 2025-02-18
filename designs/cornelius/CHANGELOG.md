# Change log for: @freesewing/cornelius


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

## 2.19.2 (2021-11-02)

### Fixed

 - Removed lingering console.log statements

## 2.19.1 (2021-10-23)

### Added

 - Added the zipper guard

### Fixed

 - Fixed issue where the cuff style is not drafted in certain configurations Closes [#1325](https://github.com/freesewing/freesewing/issues/1325)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.15.0 (2021-04-15)

### Fixed

 - Handle edge-case where splitting a path on and endpoint causes things to break

## 2.14.0 (2021-03-07)

### Added

 - Cornelius is a FreeSewing pattern for cycling breeches


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

