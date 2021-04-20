# Change log for: @freesewing/wahid


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

