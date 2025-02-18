# Change log for: @freesewing/models


## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.17.2 (2021-08-15)

### Added

 - Added the new `bustPointToUnderbust` measurement for future bikini pattern

## 2.7.0 (2020-07-12)

### Changed

 - Models now come with the new measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Ported models to the crotchDepth measurement. See [#425](https://github.com/freesewing/freesewing/issues/425)
 - Removed `Circumference` suffix from measurement names

## 2.2.0 (2020-02-22)

### Changed

 - Extended the menswear size range to have 10 different sizes, just like womenswear

## 2.0.1 (2019-09-01)

### Added

 - Expanded the size ranges available.
 - Added the `withBreasts` models which were missing in earlier releases.

### Changed

 - The models data is now based on the data from the `neckstimate` method in the utils package.

### Fixed

 - [#86](https://github.com/freesewing/freesewing/issues/86): The `seatCircumference` measurement was missing, thus making it unavailable on the website

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

