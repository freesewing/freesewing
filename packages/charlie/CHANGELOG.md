# Change log for: @freesewing/charlie


## 2.19.5 (2022-11-13)

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

