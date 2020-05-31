# Change log for: @freesewing/core

## 2.4.4 (2020-03-15)

### Fixed

- New Svg.escapeText() method to escape text at render time, rather than at draft time This fixes the difference in the inch symbol is displayed in the React component or rendered SVG

## 2.2.0 (2020-02-22)

### Added

- Added the `Path.noop()` method
- Added the `Path.insop()` methods

## 2.1.9 (2020-01-18)

### Fixed

- [#19](https://github.com/freesewing/freesewing/issues/19): Path offset issue is now fixed in upstream bezier-js@2.4.6

## 2.1.0 (2019-10-06)

### Changed

- The pattern super constructor now sets a `config` property that holds the pattern configuration. This means that unlike before, there is no need to instantiate a pattern to access its config. You can just import the pattern, and it's config property will contain the pattern config.

## 2.0.0 (2019-08-25)

### Added

- Initial release

This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.
