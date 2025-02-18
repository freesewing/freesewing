# Change log for: @freesewing/paco


## 3.1.0 (2023-12-26)

### Changed

 - Rephrased flag message when expand is off to avoid confusion about included seam allowance. Fixes

## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.

## 2.22.0 (2022-08-23)

### Changed

 - Fix hem allowance. Closes [#2350](https://github.com/freesewing/freesewing/issues/2350)

### Fixed

 - Make hem allowance taper outwards to match the leg Fixes [#2350](https://github.com/freesewing/freesewing/issues/2350)

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Hide the `frontPocketFlapSize` from the user
 - Switched to default import for version from package.json

## 2.19.4 (2021-11-09)

### Fixed

 - Make paperless markings available when detail is disabled Closes [#1400](https://github.com/freesewing/freesewing/issues/1401)
 - Make pocket flaps properly parametric Closes [#1401](https://github.com/freesewing/freesewing/issues/1401)

## 2.19.0 (2021-10-17)

### Changed

 - Changed the `waistbandWidth` option type from `mm` to `pct`
 - Changed the `ankleElastic` option type from `mm` to `pct`

### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1316](https://github.com/freesewing/freesewing/issues/1316)

## 2.17.0 (2021-07-01)

### Fixed

 - The waistband was incorrectly using the cuff widht See [#1113](https://github.com/freesewing/freesewing/issues/1113)
 - Only draft the cuff part when it's needed See [#1113](https://github.com/freesewing/freesewing/issues/1113)

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.15.0 (2021-04-15)

### Changed

 - Extended range and inreased default of the healEase option
 - Added the (disabled) waistbandHeight option from Titan
 - Changed to Titan's waistbandWidth option

## 2.13.2 (2021-02-21)

### Fixed

 - Only add paperless dimensions for pockets if we drafted pockets

## 2.8.1 (2020-08-16)

### Fixed

 - Added Titan as a peer dependency

## 2.8.0 (2020-08-10)

### Added

 - Initial release for Paco, a pattern for summer pants


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

