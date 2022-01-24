# Change log for: @freesewing/components


## 2.20.0 (2022-01-24)

### Added

 - Added support for `settings.scale` to Draft and Workbench components

### Fixed

 - Support handling of `&#160;` in text

## 2.19.2 (2021-11-02)

### Added

 - Added linedrawing for Tiberius
 - Added linedrawing for Walburga

## 2.19.0 (2021-10-17)

### Added

 - Added Bee linedrawing

### Changed

 - Added measurements for dolls & giants to Workbench measurments selector
 - Added sampling for dolls & giants to Workbench tests

### Fixed

 - Added missing linedrawing for Yuri

## 2.17.0 (2021-07-01)

### Added

 - Added Reddit icon to Icon component
 - Added Ursula linedrawing to Linedrawings

### Changed

 - Caption should not be passed as children to Legend and Example components See https://github.com/freesewing/freesewing/issues/1043
 - Changed antman references to antperson

### Removed

 - Removed Gitter icon from Icon component

### Fixed

 - Correctly load saved value for mm options See [#1136](https://github.com/freesewing/freesewing/issues/1136)

## 2.16.2 (2021-05-05)

### Fixed

 - Don't publish ESM modules as it causes issues with react-intl See [#1079](https://github.com/freesewing/freesewing/issues/1079)

## 2.16.1 (2021-05-30)

### Added

 - Added a new `designs` icon
 - We now publish .mjs files again for the different components

## 2.16.0 (2021-05-24)

### Changed

 - Migrated to React 17
 - Migrated to create-react-app/react-scripts 4
 - Migrated to Webpack 5
 - Changes to Workbench
 - Added rollup sass plugin
 - Updated for new major version of react-markdown

## 2.15.0 (2021-04-15)

### Added

 - Added charlie LineDrawing

### Changed

 - Show raised info above pattern in workbench
 - Round point coordinates in design UI now that they are no longer rounded in core

### Fixed

 - Always show design mode switch

## 2.14.0 (2021-03-07)

### Added

 - Added Bella linedrawing
 - Added Cornelius linedrawing

## 2.13.0 (2021-02-13)

### Added

 - Linedrawing for hortensia

### Fixed

 - Check point attributes are present before using them

## 2.11.3 (2021-01-16)

### Fixed

 - Fixed links in Workbench footer

## 2.11.2 (2021-01-11)

### Fixed

 - Fixed links in Workbench footer

## 2.11.0 (2021-01-10)

### Added

 - Added some more examples to the Examples component
 - Draft configurator now supports collapsing of subgroups
 - Draft configurator now supports actions atop the menu

### Removed

 - Removed the Emblem component
 - Removed the Navbar component
 - Removed the Ogol component

### Fixed

 - Include basic themeing in Example component
 - Updated the note and tip icons

## 2.10.6 (2020-11-15)

### Added

 - Workbench now supports loading a pattern configuration from a (github) gist

## 2.10.3 (2020-11-08)

### Changed

 - Draft component now supports snippets in the same way as the render method

## 2.10.1 (2020-11-07)

### Changed

 - Changes to workbench

## 2.9.0 (2020-10-02)

### Added

 - Added Teagan line drawing
 - Added Discord icon in Icon component

## 2.8.0 (2020-08-10)

### Added

 - Added Paco to LineDrawing component

### Removed

 - Removed the `Footer` component

## 2.7.1 (2020-07-24)

### Added

 - Workbench now includes events debug output and enables debug by default

## 2.7.0 (2020-07-12)

### Added

 - The `sampleConfigurator` component now supports the antwoman test (in addition to the antman test)
 - Changed `models` to `people` in `sampleConfigurator`
 - The `Legend` component is new, it is similar to the `Example` component but only for the pattern notation legend
 - Added support for custom sample styles
 - Added Titan linedrawing

### Changed

 - Handle escaped quotes for React render. See [#437](https://github.com/freesewing/freesewing/issues/437)

### Fixed

 - Fixed bug that broke millimeter sliders

## 2.6.0 (2020-05-01)

### Added

 - [#368](https://github.com/freesewing/freesewing/issues/368): Allow pan and zoom in the Workbench component.
 - [#374](https://github.com/freesewing/freesewing/issues/374): Allow (extra) translations to be added to the workbench component
 - New shortcut buttons and sidebar collapse support for Workbench
 - Refactor to remove prop-types dependency
 - Reworked the withLanguage component to allow adding translations at run-time

## 2.4.2 (2020-03-08)

### Changed

 - Don't load docs in DraftConfigurator

## 2.4.1 (2020-03-04)

### Fixed

 - Fixed `updatePatternData` props issue in the Workbench component

## 2.2.0 (2020-02-22)

### Added

 - Added LineDrawing for Breanna

### Changed

 - DraftConfigurator has been updated to reflect frontend naming changes
 - Updated Workbench component to pass data rather than gist to DraftConfigurator
 - Term `pattern` is now `design`
 - Term `recipe` is now `pattern`
 - Term `gist` is now `data`

## 2.1.4 (2019-11-01)

### Deprecated

 - The Draft component has been renamed to Render. Draft still works, but will be removed in a future release.

### Removed

 - The Ogol component has been removed as it wasn't used

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

## 2.0.0 (2019-08-25)

### Added

 - Initial release


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

