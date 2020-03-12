# Change log for: FreeSewing (global)



## Unreleased


## 2.4.3 (2020-03-12)

### i18n

#### Added

 - Added more translations


## 2.4.2 (2020-03-08)

### components

#### Changed

 - Don't load docs in DraftConfigurator

### i18n

#### Added

 - Added more strings

### plugin-title

#### Changed

 - Added *for* to title output


## 2.4.1 (2020-03-04)

### components

#### Fixed

 - Fixed `updatePatternData` props issue in the Workbench component

### utils

#### Fixed

 - [#542](https://github.com/freesewing/freesewing.org/issues/542): Prevent neckstimate from throwing when getting an unexpected measurement 


## 2.4.0 (2020-02-29)

### fu

#### Added

 - Fu is a face mask pattern


## 2.3.0 (2020-02-23)

### holmes

#### Added

 - Homes is a pattern for a Sherlock Holmes hat

### plugin-gore

#### Added

 - A plugin to generate gores for semi-spheres or domes


## 2.2.0 (2020-02-22)

### aaron

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### bent

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### breanna

#### Added

 - Breanna is a body block for womenswear

#### Changed

 - Removed deprecated `centerBackNeckToWaist` and `hpsToWaistBack` measurements

### brian

#### Changed

 - Reworked Brian to use the new shoulderslope measurement
 - Removed deprecated `centerBackNeckToWaist` measurement
 - The `neck` point has been renamed to `hps`

### carlita

#### Changed

 - Renamed `highPointShoulderToBust` measurement to `hpsToBust`
 - Removed deprecated `centerBackNeckToWaist` measurement

### carlton

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### components

#### Added

 - Added LineDrawing for Breanna

#### Changed

 - DraftConfigurator has been updated to reflect frontend naming changes
 - Updated Workbench component to pass data rather than gist to DraftConfigurator
 - Term `pattern` is now `design`
 - Term `recipe` is now `pattern`
 - Term `gist` is now `data`

### core

#### Added

 - Added the `Path.noop()` method
 - Added the `Path.insop()` methods

### create-freesewing-pattern

#### Fixed

 - [#257](https://github.com/freesewing/freesewing/issues/257): Explain that pattern names are bound by the constraints of NPM package names

### css-theme

#### Added

 - Added styling for table.data

#### Changed

 - Added new styles for the frontend changes in 2.2
 - Removed smaller fonts in ul.links

### florent

#### Fixed

 - Fixed an SA issue in brim top and removed SA from interfacing

### huey

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### hugo

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

#### Fixed

 - Made sure dimensions for hood center and waistband are always shown

### i18n

#### Added

 - Added translations for Breanna

#### Changed

 - Added/Updated strings for the 2.2 frontend changes
 - Changed `Joost De Cock` to `Joost` because spam filters don't like cock

#### Removed

 - Removed the files for homepage translation, and moved that content to markdown
 - Removed the files for editor translation, as it is no longer used

### jaeger

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### models

#### Changed

 - Extended the menswear size range to have 10 different sizes, just like womenswear

### mui-theme

#### Changed

 - Changed the light background to `#f8f9fa` rather than `#fff`
 - Changed the navbar to be light/dark based on the theme, rather than always dark

### penelope

#### Fixed

 - Fixed tags in pattern config file

### sandy

#### Fixed

 - Fixed tags in pattern config file

### simon

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### simone

#### Changed

 - Renamed `highPointShoulderToBust` measurement to `hpsToBust`
 - Removed deprecated `centerBackNeckToWaist` measurement

### sven

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### tamiko

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### theo

#### Fixed

 - Fixed issue with side piece

### trayvon

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### utils

#### Changed

 - Neckstimate now uses proportions only

### wahid

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### waralee

#### Fixed

 - Fixed tags in pattern config file


## 2.1.9 (2020-01-18)

### core

#### Fixed

 - [#19](https://github.com/freesewing/freesewing/issues/19): Path offset issue is now fixed in upstream bezier-js@2.4.6

### simon

#### Fixed

 - [#253](https://github.com/freesewing/freesewing/issues/253): Fixed type in simon sleeve causing incorrect cuff issue


## 2.1.8 (2019-12-16)

### simon

#### Fixed

 - [#416](https://github.com/freesewing/freesewing.org/issues/416): Fixed bug in simon sleeve


## 2.1.7 (2019-12-15)

### carlton

#### Fixed

 - Added missing scalebox
 - Re-numbered tail as part 5


## 2.1.6 (2019-11-24)

### utils

#### Fixed

 - [#317](https://github.com/freesewing/freesewing.org/issues/317): Fixed bug where format was not passed to formatImperial


## 2.1.5 (2019-11-19)

### plugin-dimension

#### Fixed

 - Fixed issue where inch marks where breaking SVG because of unescaped double quotes


## 2.1.4 (2019-11-01)

### components

#### Changed

 - Footer version number now links to Github release page

#### Deprecated

 - The Draft component has been renamed to Render. Draft still works, but will be removed in a future release.

#### Removed

 - The Ogol component has been removed as it wasn't used

### css-theme

#### Added

 - Added styling for search results


## 2.1.3 (2019-10-18)

### i18n

#### Added

 - More translated strings

### utils

#### Changed

 - Adjusted slope of the shoulderToShoulder measurement in neckstimate data

#### Fixed

 - [#250](https://github.com/freesewing/freesewing.org/issues/250): Model page stays empty with pre 2.0 model data: Error: 'neckstimate() requires a valid measurement name as second parameter. (received underBust)'


## 2.1.2 (2019-10-14)

### i18n

#### Fixed

 - Fixed issue where symlinks were causing all languages to export English strings


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
