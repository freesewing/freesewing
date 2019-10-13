# Change log for: FreeSewing (global)



## Unreleased


## 2.1.1 (2019-10-13)

### components

#### Added

 - Added the fixme type Blockquote component

### css-theme

#### Fixed

 - Fixed padding issue on mobile

### gatsby-remark-jargon

#### Added

 - Added the gatsby-remark-jargon package, a gatbsy plugin wrapping remark-jargon

### remark-jargon

#### Added

 - Added the remark-jargon package, a remark plugin for jargon terms

### utils

#### Fixed

 - Fixed an issue with the formatMm method not adding units


## 2.1.0 (2019-10-06)

### components

#### Added

 - Added support for restoring recipe and pattern defaults in DraftConfigurator

#### Changed

 - Added Penelope and Waralee linedrawings
 - Changed animation of the Spinner component

#### Fixed

 - Fixed display of nested option in SampleConfigurator
 - Fixed conflicting key values in React components
 - Fixed issue with display of list options in Draftconfigurator

### core

#### Changed

 - The pattern super constructor now sets a `config` property that holds the pattern configuration. This means that unlike before, there is no need to instantiate a pattern to access its config. You can just import the pattern, and it's config property will contain the pattern config.

### css-theme

#### Changed

 - Made tweaks to the main/sidebar layout

#### Fixed

 - Reduced the sidebar height by 64px to take navbar into account
 - Fixed blockquote width on XS screens
 - Made sidebar wider

### i18n

#### Added

 - Added translations for Penelope, Waralee, and Simone

### penelope

#### Added

 - Added the Penelope Pencil Skirt pattern by @woutervdub

### simon

#### Changed

 - [#123](https://github.com/freesewing/freesewing/issues/123): Added a box pleat option to Simon
 - Added the `backDarts` option to control the inclusion of back darts
 - Added the `backDartsShaping` option to control the amount of shaping by the back darts
 - Changed the defaults to slightly reduce the ease and adapt the sleevecap

#### Fixed

 - Fixed an issue where the store wasn't properly initialized causing hips and waist ease to be set incorrectly
 - Added a missing paperless dimension for the waist
 - Fixed an issue where the split yoke option was not taken into account correctly

### simone

#### Added

 - Added the Simone shirt pattern

### utils

#### Added

 - Added backend methods for administration
 - Added the resendActivationEmail method to backend

#### Fixed

 - Fixed an issue where optionDefault was not handling list options correctly

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

 - Fix measurementDiffers to pass breasts parameter to neckstimate


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
