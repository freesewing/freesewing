# Change log for: @freesewing/charlie


## 3.2.0 (2024-02-11)

### Fixed

 - The back pocket welt (4) and front pocket facing (8) incorrectly indicated to cut 2 instead of 4 in the cutlist. Fixes

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

 - Renamed back pocket jet to back pocket welt

## 2.21.0 (2022-06-27)

### Changed

 - Migrated from Rollup to Esbuild for all builds

## 2.20.0 (2022-01-24)

### Changed

 - Expose the `frontPocketFacing` option to the user via option groups
 - Switched to default import for version from package.json

## 2.19.5 (2021-11-13)

### Changed

 - Updated the `waistHeight` options to increase both min and max values

### Fixed

 - Fix issue where a very low waist caused the fly to be incorrectly drawn This only happens at unrealistic waist heights, so I changed the option minimum value instead. Closes [#1486](https://github.com/freesewing/freesewing/issues/1486)

## 2.19.3 (2021-11-05)

### Changed

 - Converted the `waistbandWidth` options to snapped pct (was normal pct)

### Fixed

 - Worked around ESM issue by adding snapseries as local dependency

## 2.19.0 (2021-10-17)

### Changed

 - Changed the `waistbandWidth` option type from `mm` to `pct`

### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1313](https://github.com/freesewing/freesewing/issues/1313)

## 2.17.0 (2021-07-01)

### Fixed

 - Add `@freesewing/plugin-mirror` as peer dependency

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.15.1 (2021-04-24)

### Added

 - Added a curved waistband option

### Fixed

 - Keep `frontPocketSlantRound` and `frontPocketSlantBend` options from being zero

## 2.15.0 (2021-04-15)

### Added

 - Inital release of the Charlie Chinos pattern


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

