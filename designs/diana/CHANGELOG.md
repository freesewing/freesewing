# Change log for: @freesewing/diana


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Added

 - Support drafting for high bust

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Expose the `cuffEase` option to the user via option groups
 - Switched to default import for version from package.json

## 2.17.0 (2021-07-01)

### Changed

 - Set brian `s3` options as constants

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.7.0 (2020-07-12)

### Changed

 - Made the `shoulderSlopeReduction` option static so it's not available in the UI
 - Ported diana to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

## 2.5.0 (2020-04-05)

### Added

 - Diana is a top with a draped neck


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

