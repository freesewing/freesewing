# Change log for: @freesewing/components


## Unreleased

**Note:** Version bump only for package components


## 2.2.0 (2020-02-22)

### Added

 - Added LineDrawing for Breanna

### Changed

 - DraftConfigurator has been updated to reflect frontend naming changes
 - Updated Workbench component to pass data rather than gist to DraftConfigurator
 - Term `pattern` is now `design`
 - Term `recipe` is now `pattern`
 - Term `gist` is now `data`
## 2.1.9 (2020-01-18)

**Note:** Version bump only for package components


## 2.1.8 (2019-12-16)

**Note:** Version bump only for package components


## 2.1.7 (2019-12-15)

**Note:** Version bump only for package components


## 2.1.6 (2019-11-24)

**Note:** Version bump only for package components


## 2.1.5 (2019-11-19)

**Note:** Version bump only for package components


## 2.1.4 (2019-11-01)

### Deprecated

 - The Draft component has been renamed to Render. Draft still works, but will be removed in a future release.

### Removed

 - The Ogol component has been removed as it wasn't used
## 2.1.3 (2019-10-18)

**Note:** Version bump only for package components


## 2.1.2 (2019-10-14)

**Note:** Version bump only for package components


## 2.1.1 (2019-10-13)

### Added

 - Added the fixme type Blockquote component
## 2.1.0 (2019-10-06)

### Added

 - Added support for restoring recipe and pattern defaults in DraftConfigurator

### Changed

 - Added Penelope and Waralee linedrawings
 - Changed animation of the Spinner component

### Fixed

 - Fixed display of nested option in SampleConfigurator
 - Fixed conflicting key values in React components
 - Fixed issue with display of list options in Draftconfigurator
## 2.0.4 (2019-09-27)

### Added

 - Advanced options and settings are now hidden by default in DraftConfigurator

### Fixed

 - [#104](https://github.com/freesewing/freesewing/issues/104): Fixed incorrect embed setting on Workbench pattern export
## 2.0.3 (2019-09-15)

### Changed

 - Tweaked DraftConfigurator tags to match CSS rules after frontend upgrade to react-intl v3
## 2.0.2 (2019-09-06)

### Fixed

 - [#104](https://github.com/freesewing/freesewing.org/issues/104): Changed `onDragEnd` to `onChangeCommitted` in slider element (change in material-ui API when slider came out of beta)
 - Workbench now also lets you preload a `withBreasts` set of measurements
 - DraftConfigurator now properly styles pattern options 3 levels deep
 - [#105](https://github.com/freesewing/freesewing.org/issues/105): Moved state change in render loop to useEffect
## 2.0.1 (2019-09-01)

**Note:** Version bump only for package components




## 2.0.0 (2019-08-25)

This is the **initial release**, and the start of this change log.

Prior to version 2, FreeSewing was not a JavaScript project.
As such, that history is out of scope for this change log.
