# Change log for: @freesewing/simon

## 2.4.4 (2020-03-15)

### Fixed

- The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

## 2.2.0 (2020-02-22)

### Changed

- Removed deprecated `centerBackNeckToWaist` measurement

## 2.1.9 (2020-01-18)

### Fixed

- [#253](https://github.com/freesewing/freesewing/issues/253): Fixed type in simon sleeve causing incorrect cuff issue

## 2.1.8 (2019-12-16)

### Fixed

- [#416](https://github.com/freesewing/freesewing.org/issues/416): Fixed bug in simon sleeve

## 2.1.0 (2019-10-06)

### Changed

- [#123](https://github.com/freesewing/freesewing/issues/123): Added a box pleat option to Simon
- Added the `backDarts` option to control the inclusion of back darts
- Added the `backDartsShaping` option to control the amount of shaping by the back darts
- Changed the defaults to slightly reduce the ease and adapt the sleevecap

### Fixed

- Fixed an issue where the store wasn't properly initialized causing hips and waist ease to be set incorrectly
- Added a missing paperless dimension for the waist
- Fixed an issue where the split yoke option was not taken into account correctly

## 2.0.2 (2019-09-06)

### Fixed

- [#100](https://github.com/freesewing/freesewing.org/issues/100): Updated simon with more sensible defaults for ease options
- [#102](https://github.com/freesewing/freesewing.org/issues/102): Fixed 'Snippets not defined' error when drafting a seperate button placket
- [#103](https://github.com/freesewing/freesewing.org/issues/103): Fixed 'hemSa not defined' when drafting paperless Simon without seam allowance

## 2.0.0 (2019-08-25)

### Added

- Initial release

This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.
