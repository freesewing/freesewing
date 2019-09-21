# Change log for: FreeSewing (global)



## Unreleased

### core

#### Changed

 - The pattern super constructor now sets a `config` property that holds the pattern configuration. This means that unlike before, there is no need to instantiate a pattern to access its config. You can just import the pattern, and it's config property will contain the pattern config.

### i18n

#### Added

 - Added translations for Penelope and Waralee

### penelope

#### Added

 - Added the Penelope Pencil Skirt pattern by @woutervdub

### simon

#### Added

 - [#123](https://github.com/freesewing/freesewing/issues/123): Added a box pleat option to Simon

### utils

#### Added

 - Added backend methods for administration

### waralee

#### Added

 - Added the Waralee wrap Pants pattern by @woutervdub


## 2.0.4 (2019-09-27)

### carlton

#### Fixed

 - [#108](https://github.com/freesewing/freesewing/issues/108): Fixed incorrect width of the Carlton tail

### components

#### Added

 - Advanced options and settings are now hidden by default in DraftConfigurator

#### Fixed

 - [#104](https://github.com/freesewing/freesewing/issues/104): Fixed incorrect embed setting on Workbench pattern export


## 2.0.3 (2019-09-15)

### bruce

#### Fixed

 - [#106](https://github.com/freesewing/freesewing/issues/106): Fix incorrect hem allowance

### components

#### Changed

 - Tweaked DraftConfigurator tags to match CSS rules after frontend upgrade to react-intl v3

### create-freesewing-pattern

#### Fixed

 - Updated example package.json to use latest tag rather than beta

### utils

#### Fixed

 - Fix measurementDiffers to pass breasts parameter to necstimate


## 2.0.2 (2019-09-06)

### benjamin

#### Fixed

 - Added bandLength option to fit optiongroup (it was missing)

### components

#### Fixed

 - [#104](https://github.com/freesewing/freesewing.org/issues/104): Changed `onDragEnd` to `onChangeCommitted` in slider element (change in material-ui API when slider came out of beta)
 - Workbench now also lets you preload a `withBreasts` set of measurements
 - DraftConfigurator now properly styles pattern options 3 levels deep
 - [#105](https://github.com/freesewing/freesewing.org/issues/105): Moved state change in render loop to useEffect

### create-freesewing-pattern

#### Changed

 - Updated dependencies

#### Fixed

 - Added missing `file-saver` dependency

### css-theme

#### Fixed

 - Updated styles for DraftConfigurator component for pattern options 3 levels deep

### i18n

#### Added

 - [#90](https://github.com/freesewing/freesewing/issues/90): Added missing option translations for Benjamin, Florent, Sandy, Shin, and Theo

### jaeger

#### Fixed

 - [#76](https://github.com/freesewing/freesewing.org/issues/76): Fixed a typo in Jaeger that was causing the side vent length to be wrong

### simon

#### Fixed

 - [#100](https://github.com/freesewing/freesewing.org/issues/100): Updated simon with more sensible defaults for ease options
 - [#102](https://github.com/freesewing/freesewing.org/issues/102): Fixed 'Snippets not defined' error when drafting a seperate button placket
 - [#103](https://github.com/freesewing/freesewing.org/issues/103): Fixed 'hemSa not defined' when drafting paperless Simon without seam allowance

### utils

#### Fixed

 - Removed lingering debug statement in formatImperial


## 2.0.1 (2019-09-01)

### models

#### Added

 - Expanded the size ranges available.
 - Added the `withBreasts` models which were missing in earlier releases.

#### Changed

 - The models data is now based on the data from the `neckstimate` method in the utils package.

#### Fixed

 - [#86](https://github.com/freesewing/freesewing/issues/86): The `seatCircumference` measurement was missing, thus making it unavailable on the website

### theo

#### Fixed

 - [#78](https://github.com/freesewing/freesewing/issues/78): Removed inherited notches from fly shield and side piece.

### utils

#### Added

 - The `measurementDiffers` method is new.



## 2.0.0 (2019-08-25)

This is the **initial release**, and the start of this change log.

Prior to version 2, FreeSewing was not a JavaScript project.
As such, that history is out of scope for this change log.
