# Change log for: create-freesewing-pattern


## 2.20.4 (2022-01-28)

### Fixed

 - Downgraded back to react-scripts 4 because 5 has a regression bug

## 2.20.3 (2022-01-28)

### Fixed

 - Updated to react-scripts 5 to sidestep bug in error-overlay

## 2.19.6 (2021-12-29)

### Fixed

 - Fix axios version conflict

## 2.17.1 (2021-07-14)

### Fixed

 - Updated department to new range of options See [#1207](https://github.com/freesewing/freesewing/pull/1207)

## 2.16.2 (2021-05-05)

### Changed

 - Added .gitignore file to the template
 - Added eslint for linting

## 2.16.1 (2021-05-30)

### Fixed

 - Don't list pattern as dependency in the example package.json

## 2.16.0 (2021-05-24)

### Changed

 - Migrated to React 17
 - Migrated to create-react-app/react-scripts 4
 - Migrated to Webpack 5
 - Add react-intl as dependency
 - Renamed template `default` to `freesewing`
 - Use defaults for browserlist

## 2.13.2 (2021-02-21)

### Fixed

 - Updated chat link from gitter to discord

## 2.12.1 (2021-01-27)

### Added

 - Fixed missing dependency

## 2.11.1 (2021-01-11)

### Fixed

 - Fixed issue with node-sass, see [#778](https://github.com/freesewing/freesewing/issues/778) and [#779](https://github.com/freesewing/freesewing/issues/779)

## 2.9.0 (2020-10-02)

### Fixed

 - No longer instantiate a pattern, just to get the config

## 2.8.1 (2020-08-16)

### Fixed

 - Fixed breaking change in execa upgrade in 2.8.0

## 2.6.0 (2020-05-01)

### Added

 - [#365](https://github.com/freesewing/freesewing/issues/365): Check for node version and raise an error it is too old.

## 2.2.0 (2020-02-22)

### Fixed

 - [#257](https://github.com/freesewing/freesewing/issues/257): Explain that pattern names are bound by the constraints of NPM package names

## 2.0.3 (2019-09-15)

### Fixed

 - Updated example package.json to use latest tag rather than beta

## 2.0.2 (2019-09-06)

### Changed

 - Updated dependencies

### Fixed

 - Added missing `file-saver` dependency

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

