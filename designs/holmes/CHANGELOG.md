# Change log for: @freesewing/holmes


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

 - Fixed SA to use twice the SA value on hem allowance

## 2.19.0 (2021-10-17)

### Added

 - Added the `headEase` option
 - Added the `earLength` option
 - Added the `earWidth` option
 - Added the `visorWidth` option
 - Added the `buttonhole` option

### Changed

 - The `brim` part has been renamed to `visor` because semantics
 - The `brimWidth` option is now `visorWidth`
 - _Gore_ has been changed to _Crown_ in the title
 - _Ear_ has been changed to _Ear flap_
 - Added hem allowance at the hem, rather than standard seam allowance

## 2.18.0 (2021-09-09)

### Fixed

 - The `brimWidth` option is not a percent option, allowing the pattern to scale properly

## 2.16.1 (2021-05-30)

### Changed

 - Changed `department` setting in config in line with new grouping

## 2.11.3 (2021-01-16)

### Fixed

 - Added missing scalebox

## 2.7.0 (2020-07-12)

### Changed

 - Removed `Circumference` suffix from measurement names

## 2.3.0 (2020-02-23)

### Added

 - Homes is a pattern for a Sherlock Holmes hat
 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

