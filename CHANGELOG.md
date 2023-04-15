# Change log for: FreeSewing (global)


## Unreleased

### global

#### Removed

 - The `@freesewing/components` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/css-theme` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/config-helpers` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported. Use the `@freesewing/snapseries` package for various helpers for snapped percentage options. The `pctBasedOn` helper method is now available as a named export from `@freesewing/core`
 - The `@freesewing/i18n` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/mui-theme` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/pattern-info` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/plugin-export-dxf` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/snapseries` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `@freesewing/utils` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `gatsby-remark-jargon` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported.
 - The `remark-jargon` package is not part of FreeSewing v3. While v2 versions remain available, this package is no longer supported. Use `rehype-jargon` instead.

### albert

#### Fixed

 - Workaround for not finding a suitable legband radius

### unice

#### Added

 - Added new Front Curve and Back Curve style options

#### Changed

 - Updated gusset to always curve inward

#### Fixed

 - Fixed bug which prevented parts from being generated as intended

### waralee

#### Added

 - Added *mini* version of main pants part
 - Added new pocket options
 - Added seperate waistband options
 - Added bow tie placement option

#### Fixed

 - Fixed crotch depth issue
 - Fixed pocket size issue
 - Fixed waist shaping issue

### plugin-bundle

#### Removed

 - Named exports of the bundled plugins are no longer available

### plugin-bust

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-flip

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-gore

#### Breaking

 - The `goreNumber` props is removed. Please use `gores` instead

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-i18n

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-measurements

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-mirror

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-round

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-sprinkle

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-svgattr

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-theme

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### plugin-versionfree-svg

#### Removed

 - This plugin no longer sets its version as an SVG attribute when rendering patterns

### snapseries

#### Breaking

 - Named export `smallsteps` has been renamed to `smallSteps`
 - Named export `bigsteps` has been renamed to `bigSteps`


## 2.22.0 (2022-08-23)

### octoplushy

#### Added

 - Octoplushy is a new design for an octopus or squid plushy

### bent

#### Added

 - Support drafting for high bust

### breanna

#### Fixed

 - Fixed bug where a large shoulder slope could cause an error. Fixes [#2516](https://github.com/freesewing/freesewing/issues/2516)

### brian

#### Added

 - Support drafting for high bust

#### Fixed

 - Make s3 options sticky to zero below 10% to avoid path split issues. Fixes [#2249](https://github.com/freesewing/freesewing/issues/2249)

### titan

#### Added

 - Added additional notches to aid alignment

### aaron

#### Added

 - Support drafting for high bust

### carlton

#### Added

 - Support drafting for high bust

### cathrin

#### Fixed

 - Removed seam allowance from Part1a foldline. Fixes [#2545](https://github.com/freesewing/freesewing/issues/2545)

### charlie

#### Changed

 - Renamed back pocket jet to back pocket welt

### diana

#### Added

 - Support drafting for high bust

### huey

#### Added

 - Support drafting for high bust

### hugo

#### Added

 - Support drafting for high bust Closes [#802](https://github.com/freesewing/freesewing/issues/802)

### paco

#### Changed

 - Fix hem allowance. Closes [#2350](https://github.com/freesewing/freesewing/issues/2350)

#### Fixed

 - Make hem allowance taper outwards to match the leg Fixes [#2350](https://github.com/freesewing/freesewing/issues/2350)

### simon

#### Added

 - Support drafting for high bust

#### Fixed

 - Fix issue with boxPleat and yoke Fixes [#2400](https://github.com/freesewing/freesewing/issues/2400)
 - Removed superfluous notches in button placket, buttonhole placket, and split yoke. Fixes [#2399](https://github.com/freesewing/freesewing/issues/2399)

### simone

#### Added

 - Added Bust-aligned buttons option and functionality. Closes [#2154] (https://github.com/freesewing/freesewing/issues/2154)
 - Added a notch at the center front bustline.

#### Fixed

 - Don't do a negative FBA from there's no need for an FBA Fixes [#2121](https://github.com/freesewing/freesewing/issues/2121)
 - Duplicate config rather than mutating the imported simon config

### sven

#### Added

 - Support drafting for high bust

### tamiko

#### Added

 - Support drafting for high bust

### teagan

#### Added

 - Support drafting for high bust

### wahid

#### Added

 - Support drafting for high bust

#### Fixed

 - Prevent facing/lining overlap when shoulders get very narrow fixes [#2233](https://github.com/freesewing/freesewing/issues/2233)
 - Fixed dependency issue with pocketFacing part
 - Added grainlines

### yuri

#### Added

 - Support drafting for high bust


## 2.21.3 (2022-07-02)

### core

#### Changed

 - Make generatePartTransform a named export

### new-design

#### Changed

 - We're now loading content from the main branch by default

#### Fixed

 - Add bin entry to package.json


## 2.21.2 (2022-06-30)

### simon

#### Changed

 - Decreased default collar ease
 - Increased default yoke height

### simone

#### Changed

 - Decreased default collar ease
 - Increased default yoke height

### ursula

#### Added

 - Added markers for elastics


## 2.21.1 (2022-06-28)


## 2.21.0 (2022-06-27)

### albert

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### benjamin

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### bob

#### Added

 - Bob is a pattern for a bib, the same one that's used in our design tutorial

### florence

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### florent

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### hi

#### Added

 - Hi is a new desing for a shark plushy

### holmes

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### hortensia

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### lucy

#### Added

 - Lucy is a pattern for a historical tie-on pocket

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### trayvon

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### bella

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### bent

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### breanna

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### brian

#### Changed

 - Migrated from Rollup to Esbuild for all builds
 - Slightly increased the default neck ease

### noble

#### Added

 - Noble is a body block with prince(ss) seams

### titan

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### aaron

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### bee

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### bruce

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### carlita

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### carlton

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### cathrin

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### charlie

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### cornelius

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### diana

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### huey

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### hugo

#### Changed

 - Migrated from Rollup to Esbuild for all builds

#### Fixed

 - Fix incorrect seam allowance Closes [#2208](https://github.com/freesewing/freesewing/issues/2208)

### jaeger

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### lunetius

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### paco

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### penelope

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### sandy

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### shin

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### simon

#### Changed

 - Migrated from Rollup to Esbuild for all builds
 - More accurately determine the cuff width
 - Corrected the hide() signature in the config

#### Fixed

 - Handle edge-case for 1/10 dolls with breasts where path split would yield empty half

### simone

#### Changed

 - Migrated from Rollup to Esbuild for all builds
 - More accurately determine the cuff width

#### Fixed

 - Added the frontdarts option back after it was (accidentally) removed
 - Handle edge-case for 1/10 dolls with breasts where path split would yield empty half

### sven

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### tamiko

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### teagan

#### Changed

 - Migrated from Rollup to Esbuild for all builds

#### Fixed

 - Added missing name to config file

### tiberius

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### unice

#### Added

 - Unice is an underwear pattern

### ursula

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### wahid

#### Changed

 - Migrated from Rollup to Esbuild for all builds

#### Fixed

 - Change hem allowance to standard SA

### walburga

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### waralee

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### yuri

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### examples

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### legend

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugintest

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### rendertest

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### tutorial

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-bundle

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-bust

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-flip

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-gore

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-i18n

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-measurements

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-mirror

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-round

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-sprinkle

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-svgattr

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-theme

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### plugin-versionfree-svg

#### Changed

 - Migrated from Rollup to Esbuild for all builds

### core

#### Changed

 - Migrated from Rollup to Esbuild for all builds
 - The `pctBasedOn()` helper method for pattern config was moved to config-helpers We did not make this a breaking change since it's only used internally.

### i18n

#### Changed

 - Migrated from Rollup to Esbuild for all builds

#### Fixed

 - Added missing lab namespace for English

### models

#### Changed

 - Migrated from Rollup to Esbuild for all builds


## 2.20.8 (2022-05-21)

### brian

#### Added

 - Set `sleevecapHeight` value in store

#### Changed

 - Better defaults for sleevecap and armhole depth

#### Fixed

 - Adde both front and back armhole pitch points Closes [#2057](https://github.com/freesewing/freesewing/issues/2057)
 - Fixed issue with the sleeve length

### huey

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Huey now extends the Brian config

### simon

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Slightly higher collar vs collar stand
 - Simon now extends the Brian config

#### Fixed

 - Fixed issue with the sleeve length

### simone

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Slightly higher collar vs collar stand
 - Simone now extends the Simon config

#### Fixed

 - Fixed issue with the sleeve length

### sven

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Sven now extends the Brian config

### teagan

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Teagan now extends the Brian config

### yuri

#### Changed

 - Better defaults for sleevecap and armhole depth
 - Yuri now extends the Brian config

### core

#### Fixed

 - Fixed warning message when moving to a non-existing point
 - Fixed incorrect decision in Path.boundary()


## 2.20.7 (2022-02-20)


## 2.20.6 (2022-02-17)


## 2.20.5 (2022-02-17)

### simon

#### Fixed

 - Fixed grainline indicator on sleeve since it was slightly off-grain

### simone

#### Fixed

 - Fixed grainline indicator on sleeve since it was slightly off-grain

### core

#### Fixed

 - Fix bug in Svg.escapeText() that only escaped the first quote

### backend

#### Fixed

 - Mitigate risk of denial-of-service attacks in catch-all route


## 2.20.4 (2022-01-28)


## 2.20.3 (2022-01-28)

### simon

#### Fixed

 - Properly style SA paths on cuffs and collarstand
 - SA path on sleeve was double-drawn

### core

#### Changed

 - Setting Path.render() no longer raises an info message
 - Always raise debug, but only store it whend debug is enabled


## 2.20.2 (2022-01-27)

### i18n

#### Fixed

 - Patterns options were always in English due to symlinks being used


## 2.20.1 (2022-01-27)

### bee

#### Changed

 - Exposed additional Bella options

### hugo

#### Fixed

 - Seam allowance on pocket is incorrectly marked for cut-on-fold Closes [#1731](https://github.com/freesewing/freesewing/issues/1731)

### simon

#### Fixed

 - Remove debug outline when enabling box pleat setting


## 2.20.0 (2022-01-24)

### albert

#### Changed

 - Switched to default import for version from package.json

### benjamin

#### Changed

 - Switched to default import for version from package.json

### florence

#### Changed

 - Switched to default import for version from package.json

### florent

#### Changed

 - Switched to default import for version from package.json

### holmes

#### Changed

 - Switched to default import for version from package.json

### hortensia

#### Changed

 - Switched to default import for version from package.json

### trayvon

#### Changed

 - Switched to default import for version from package.json

### bella

#### Changed

 - Expose the `fullChestEaseReduction` option to the user via option groups
 - Expose the `frontArmholeCurvature` option to the user via option groups
 - Switched to default import for version from package.json

### bent

#### Changed

 - Switched to default import for version from package.json

### breanna

#### Changed

 - Switched to default import for version from package.json

### brian

#### Changed

 - Switched to default import for version from package.json

### titan

#### Changed

 - Switched to default import for version from package.json

### aaron

#### Changed

 - Switched to default import for version from package.json

### bee

#### Changed

 - Re-structured option groups
 - Expose all options to the user that should be configurable
 - Hide/lock options that should be fixed (inherited from Bella)
 - Switched to default import for version from package.json

### bruce

#### Changed

 - Switched to default import for version from package.json

### carlita

#### Changed

 - Switched to default import for version from package.json

### carlton

#### Changed

 - Switched to default import for version from package.json

### cathrin

#### Changed

 - Switched to default import for version from package.json

### charlie

#### Changed

 - Expose the `frontPocketFacing` option to the user via option groups
 - Switched to default import for version from package.json

### cornelius

#### Changed

 - Switched to default import for version from package.json

### diana

#### Changed

 - Expose the `cuffEase` option to the user via option groups
 - Switched to default import for version from package.json

### huey

#### Changed

 - Switched to default import for version from package.json

### hugo

#### Changed

 - Switched to default import for version from package.json

### jaeger

#### Changed

 - Switched to default import for version from package.json

### lunetius

#### Changed

 - Switched to default import for version from package.json

### paco

#### Changed

 - Hide the `frontPocketFlapSize` from the user
 - Switched to default import for version from package.json

### penelope

#### Changed

 - Switched to default import for version from package.json

### sandy

#### Changed

 - Switched to default import for version from package.json

### shin

#### Changed

 - Switched to default import for version from package.json

### simon

#### Changed

 - Switched to default import for version from package.json

### simone

#### Changed

 - Switched to default import for version from package.json

### sven

#### Changed

 - Expose the `hipsEase` option to the user via option groups
 - Lock the `waistEase` option to a static value
 - Switched to default import for version from package.json

### tamiko

#### Changed

 - Switched to default import for version from package.json

### teagan

#### Changed

 - Lock the `frontArmholeDeeper` option to a static value
 - Switched to default import for version from package.json

### tiberius

#### Changed

 - Switched to default import for version from package.json

### ursula

#### Changed

 - Switched to default import for version from package.json

### wahid

#### Changed

 - Switched to default import for version from package.json

### walburga

#### Changed

 - Switched to default import for version from package.json

### waralee

#### Changed

 - Switched to default import for version from package.json

### yuri

#### Changed

 - Switched to default import for version from package.json

### examples

#### Added

 - Added plugin_gore example

#### Changed

 - Switched to default import for version from package.json

### legend

#### Changed

 - Switched to default import for version from package.json

### plugintest

#### Added

 - Added the plugintest pattern which is used for testing plugins

#### Changed

 - Switched to default import for version from package.json

### rendertest

#### Changed

 - Restructured the pattern to allow inclusion of individual parts in Example component
 - Switched to default import for version from package.json

### tutorial

#### Changed

 - Switched to default import for version from package.json

### plugin-bundle

#### Changed

 - plugin-banner is now part of plugin-bundle
 - plugin-bartack is now part of plugin-bundle

### plugin-flip

#### Added

 - Added support for flipping around the Y-axis

### plugin-gore

#### Changed

 - The `goreNumber` property of the gore macro has been renamed to `gores`
 - Using `goreNumber` is now deprecated in favor of `gore` and will be removed in the next majot version

### plugin-sprinkle

#### Added

 - Added support for `scale` to scale all sprinkled snippets
 - Added support for `rotate` to rotate all sprinkled snippets

### core

#### Added

 - Added support for `settings.scale`

### i18n

#### Fixed

 - Fixed issue that was causing plugin translations to always be in English


## 2.19.9 (2022-01-09)

### simon

#### Fixed

 - Fix incorrectly alliegned fabric match line. Move to CF instead [Fixed by @nicholasdower in


## 2.19.8 (2022-01-08)

### simon

#### Fixed

 - Make seam allowance stop at fold when using rounded back option Fixes [#1608](https://github.com/freesewing/freesewing/issues/1608)

### yuri

#### Fixed

 - Fix dependency configuration Fixes [#1334](https://github.com/freesewing/freesewing/issues/1334)

### core

#### Fixed

 - Remove CSS var in SVG to preserve styling Fixes [#1606](https://github.com/freesewing/freesewing/issues/1606)


## 2.19.7 (2022-01-06)

### brian

#### Changed

 - Always calculate sleevecap notch from armhole rather than shoulder
 - Default for `sleevecapEase` option is now `0`

### simon

#### Fixed

 - Correctly place sleevecap notches Closes [#1602](https://github.com/freesewing/freesewing/issues/1602)

### simone

#### Fixed

 - Correctly place sleevecap notches Closes [#1602](https://github.com/freesewing/freesewing/issues/1602)


## 2.19.6 (2021-12-29)

### rendertest

#### Changed

 - Updated the rendertest pattern to be more concise

### plugin-bundle

#### Added

 - Added (esm) unit tests

### plugin-bust

#### Added

 - Added (esm) unit tests

### plugin-flip

#### Added

 - Added (esm) unit tests

### plugin-gore

#### Added

 - Added (esm) unit tests

### plugin-i18n

#### Added

 - Added (esm) unit tests

### plugin-measurements

#### Added

 - Added (esm) unit tests

### plugin-mirror

#### Added

 - Added (esm) unit tests

### plugin-round

#### Added

 - Added (esm) unit tests

### plugin-sprinkle

#### Added

 - Added (esm) unit tests

### plugin-svgattr

#### Added

 - Added (esm) unit tests

### plugin-theme

#### Added

 - Added (esm) unit tests

### plugin-versionfree-svg

#### Added

 - Added (esm) unit tests

### core

#### Added

 - Added the new attributes.setIfUnset() method
 - Added the new `scale` setting


## 2.19.5 (2021-11-13)

### charlie

#### Changed

 - Updated the `waistHeight` options to increase both min and max values

#### Fixed

 - Fix issue where a very low waist caused the fly to be incorrectly drawn This only happens at unrealistic waist heights, so I changed the option minimum value instead. Closes [#1486](https://github.com/freesewing/freesewing/issues/1486)

### penelope

#### Changed

 - Increased maximum for the `waistEase` option
 - Increased maximum for the `seatEase` options

### yuri

#### Fixed

 - Fix seam allowance on back, gusset and hood center parts Closes [#1464](https://github.com/freesewing/freesewing/issues/1464)

### core

#### Fixed

 - Fixed a copy-paste error that caused the `absoluteOptions` shorthand property to be a proxy for the regular options object instead. Note that this bug (and proxying in general) only occurs in debug mode.


## 2.19.4 (2021-11-09)

### titan

#### Fixed

 - Fixed a regression that caused the `waistHeight` option to be ignored. Closes [#1467](https://github.com/freesewing/freesewing/issues/1467)

### paco

#### Fixed

 - Make paperless markings available when detail is disabled Closes [#1400](https://github.com/freesewing/freesewing/issues/1401)
 - Make pocket flaps properly parametric Closes [#1401](https://github.com/freesewing/freesewing/issues/1401)

### simon

#### Fixed

 - Fix dependencies when only drafting a front Closes [#1445](https://github.com/freesewing/freesewing/issues/1445)

### simone

#### Fixed

 - Fix dependencies when only drafting a front Closes [#1445](https://github.com/freesewing/freesewing/issues/1445)


## 2.19.3 (2021-11-05)

### charlie

#### Changed

 - Converted the `waistbandWidth` options to snapped pct (was normal pct)

#### Fixed

 - Worked around ESM issue by adding snapseries as local dependency


## 2.19.2 (2021-11-02)

### holmes

#### Fixed

 - Fixed SA to use twice the SA value on hem allowance

### trayvon

#### Changed

 - Migrated the `knotWidth` and `tipWidth` options from mm to snapped pct

### titan

#### Changed

 - Migrated the `waistbandWidth` option from mm to snapped pct

### cornelius

#### Fixed

 - Removed lingering console.log statements

### sandy

#### Changed

 - Migrated the `waistbandWidth` option from mm to snapped pct

### simon

#### Fixed

 - Fixed missing store object in button(hole)placket part

### simone

#### Fixed

 - Fixed missing store object in button(hole)placket part


## 2.19.1 (2021-10-23)

### hortensia

#### Fixed

 - Fixed issue with the handle width not drafting correctly Closes [#1403](https://github.com/freesewing/freesewing/issues/1403)

### cornelius

#### Added

 - Added the zipper guard

#### Fixed

 - Fixed issue where the cuff style is not drafted in certain configurations Closes [#1325](https://github.com/freesewing/freesewing/issues/1325)

### simon

#### Fixed

 - Fixed incorrect value for `brianFitCollar` resulting in incorrect collar fit Closes [#1411](https://github.com/freesewing/freesewing/issues/1411)

### simone

#### Fixed

 - Fixed incorrect value for `brianFitCollar` resulting in incorrect collar fit Closes [#1411](https://github.com/freesewing/freesewing/issues/1411)


## 2.19.0 (2021-10-17)

### holmes

#### Added

 - Added the `headEase` option
 - Added the `earLength` option
 - Added the `earWidth` option
 - Added the `visorWidth` option
 - Added the `buttonhole` option

#### Changed

 - The `brim` part has been renamed to `visor` because semantics
 - The `brimWidth` option is now `visorWidth`
 - _Gore_ has been changed to _Crown_ in the title
 - _Ear_ has been changed to _Ear flap_
 - Added hem allowance at the hem, rather than standard seam allowance

### hortensia

#### Changed

 - Changed the `handleWidth` option type from `mm` to `pct`

### bee

#### Added

 - Bee is a bikini
 - Initial release

### charlie

#### Changed

 - Changed the `waistbandWidth` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1313](https://github.com/freesewing/freesewing/issues/1313)

### jaeger

#### Changed

 - Changed the `collarRoll` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1321](https://github.com/freesewing/freesewing/issues/1313)

### lunetius

#### Added

 - Lunetius is a lacerna, a historical Roman cloak
 - Initial release

### paco

#### Changed

 - Changed the `waistbandWidth` option type from `mm` to `pct`
 - Changed the `ankleElastic` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1316](https://github.com/freesewing/freesewing/issues/1316)

### penelope

#### Changed

 - Changed the `hem` option type from `mm` to `pct`
 - Changed the `waistBandWidth` option type from `mm` to `pct`
 - Changed the `seatEase` option type from `mm` to `pct`
 - Changed the `waistEase` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1320](https://github.com/freesewing/freesewing/issues/1316)

### simon

#### Changed

 - Changed the `buttonPlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketFoldWidth` option type from `mm` to `pct`
 - Changed the `collarStandWidth` option type from `mm` to `pct`
 - Changed the `sleevePlacketWidth` option type from `mm` to `pct`
 - Changed the `boxPleatWidth` option type from `mm` to `pct`
 - Changed the `boxPleatFold` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1319](https://github.com/freesewing/freesewing/issues/1319)

### simone

#### Changed

 - Changed the `buttonPlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketWidth` option type from `mm` to `pct`
 - Changed the `buttonholePlacketFoldWidth` option type from `mm` to `pct`
 - Changed the `collarStandWidth` option type from `mm` to `pct`
 - Changed the `sleevePlacketWidth` option type from `mm` to `pct`
 - Changed the `boxPleatWidth` option type from `mm` to `pct`
 - Changed the `boxPleatFold` option type from `mm` to `pct`

#### Fixed

 - Support drafting of non-human measurements (dolls & giants) Closes [#1318](https://github.com/freesewing/freesewing/issues/1318)
 - Fix issue with armhole introduced with the S3 options in Brian Closes

### tiberius

#### Added

 - Tiberius is a tunica, a historic Roman tunic
 - Initial release

### walburga

#### Added

 - Walburga is a wappenrock (tabard/surcoat), a historical European/medieval (ish) garment
 - Initial release

### plugin-versionfree-svg

#### Added

 - This is a plugin to strip (FreeSewing) versdion info out of the SVG to allow you to diff your SVG output between FreeSewing versions
 - Initial release

### core

#### Added

 - Added support for snapped percentage options See https://github.com/freesewing/freesewing/discussions/1331

#### Changed

 - Pattern.on() is now chainable as it returns the Pattern object

### i18n

#### Fixed

 - Fixed bug in resolving of shared pattern options
 - Removed optional chaining which broke node v12 support

### snapseries

#### Added

 - Initial release of `@freesewing/snapseries` wich holds commonly used series of snap values for percentage options


## 2.18.0 (2021-09-09)

### holmes

#### Fixed

 - The `brimWidth` option is not a percent option, allowing the pattern to scale properly

### huey

#### Fixed

 - Replace cut-on-fold indicator on pocket with a regular grainline indicator Closes [#1265](https://github.com/freesewing/freesewing/issues/1265)

### simon

#### Fixed

 - Avoid paperless depending on a complete pattern

### wahid

#### Fixed

 - Close Seam Allowance path of front lining Closes [#1267](https://github.com/freesewing/freesewing/issues/1267)
 - Support a zero value for the `backScyeDart` option

### yuri

#### Added

 - Initial release of Yuri, a fancy zipless cardigan based on the Huey & Hugo hoodies

### core

#### Fixed

 - Handle path.offset() of very short curves with control points on the start or end point Closes [#1257](https://github.com/freesewing/freesewing/issues/1257)

### i18n

#### Added

 - Added translations for Yuri

#### Fixed

 - Added optional chaining so missing options always lead to clear error message


## 2.17.4 (2021-08-20)

### simon

#### Fixed

 - Fixed typo that caused paperless to error


## 2.17.3 (2021-08-16)

### i18n

#### Added

 - New translations


## 2.17.2 (2021-08-15)

### simon

#### Added

 - Added new ffsa option to let the user control the extra SA for flat-felled seams Closes [#1251](https://github.com/freesewing/freesewing/issues/1251)

### simone

#### Added

 - Added new ffsa option to let the user control the extra SA for flat-felled seams Closes [#1251](https://github.com/freesewing/freesewing/issues/1251)

### i18n

#### Added

 - Added new ffsa option for simon & simone

### models

#### Added

 - Added the new `bustPointToUnderbust` measurement for future bikini pattern


## 2.17.1 (2021-07-14)

### core

#### Fixed

 - Fixed edge case in utils.beamsIntersect() when line is almost vertical See [#1206](https://github.com/freesewing/freesewing/issues/1206)


## 2.17.0 (2021-07-01)

### bent

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### brian

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### carlita

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### carlton

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### charlie

#### Fixed

 - Add `@freesewing/plugin-mirror` as peer dependency

### diana

#### Changed

 - Set brian `s3` options as constants

### huey

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### hugo

#### Changed

 - Set brian `s3` options as constants

### jaeger

#### Changed

 - Set brian `s3` options as constants

### paco

#### Fixed

 - The waistband was incorrectly using the cuff widht See [#1113](https://github.com/freesewing/freesewing/issues/1113)
 - Only draft the cuff part when it's needed See [#1113](https://github.com/freesewing/freesewing/issues/1113)

### simon

#### Added

 - Added support for configuring the height of the Yoke. See [#642](https://github.com/freesewing/freesewing/issues/642)
 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)
 - Added the `roundBack` option to replace the `yokeDart` option

#### Removed

 - The `yokeDart` option is replaced by the `roundBack` option

### simone

#### Added

 - Added support for configuring the height of the Yoke. See [#642](https://github.com/freesewing/freesewing/issues/642)
 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)
 - Added the `roundBack` option to replace the `yokeDart` option

#### Removed

 - The `yokeDart` option is replaced by the `roundBack` option

### sven

#### Added

 - The `s3collar and `s3armhole` options now allow shifting the shoulder seam (`s3` is short for *Shift Shoulder Seam*)

### ursula

#### Added

 - Initial release of Ursula, a basic, highly-customizable underwear pattern

### tutorial

#### Fixed

 - Set department in the config to one of the newly accepted values

### plugin-bundle

#### Changed

 - Include plugin-buttons
 - Include plugin-mirror

### plugin-mirror

#### Changed

 - Is now included in plugin-bundle

### core

#### Fixed

 - Fix a bug in `path.shiftAlong` where no point is returned if the distance to shift is a fraction of one step (1/25mm) into a new path segment See [#1140](https://github.com/freesewing/freesewing/issues/1140)

### i18n

#### Changed

 - Changed antman references to antperson


## 2.16.2 (2021-05-05)

### i18n

#### Changed

 - String updates


## 2.16.1 (2021-05-30)

### albert

#### Changed

 - Changed `department` setting in config in line with new grouping

### benjamin

#### Changed

 - Changed `department` setting in config in line with new grouping

### florence

#### Changed

 - Changed `department` setting in config in line with new grouping

### florent

#### Changed

 - Changed `department` setting in config in line with new grouping

### holmes

#### Changed

 - Changed `department` setting in config in line with new grouping

### hortensia

#### Changed

 - Changed `department` setting in config in line with new grouping

### trayvon

#### Changed

 - Changed `department` setting in config in line with new grouping

### bella

#### Changed

 - Changed `department` setting in config in line with new grouping

### bent

#### Changed

 - Changed `department` setting in config in line with new grouping

### breanna

#### Changed

 - Changed `department` setting in config in line with new grouping

### brian

#### Changed

 - Changed `department` setting in config in line with new grouping

### titan

#### Changed

 - Changed `department` setting in config in line with new grouping

### aaron

#### Changed

 - Changed `department` setting in config in line with new grouping

### bruce

#### Changed

 - Changed `department` setting in config in line with new grouping

### carlita

#### Changed

 - Changed `department` setting in config in line with new grouping

### carlton

#### Changed

 - Changed `department` setting in config in line with new grouping

### cathrin

#### Changed

 - Changed `department` setting in config in line with new grouping

### charlie

#### Changed

 - Changed `department` setting in config in line with new grouping

### cornelius

#### Changed

 - Changed `department` setting in config in line with new grouping

### diana

#### Changed

 - Changed `department` setting in config in line with new grouping

### huey

#### Changed

 - Changed `department` setting in config in line with new grouping

### hugo

#### Changed

 - Changed `department` setting in config in line with new grouping

### jaeger

#### Changed

 - Changed `department` setting in config in line with new grouping

### paco

#### Changed

 - Changed `department` setting in config in line with new grouping

### penelope

#### Changed

 - Changed `department` setting in config in line with new grouping

### sandy

#### Changed

 - Changed `department` setting in config in line with new grouping

### shin

#### Changed

 - Changed `department` setting in config in line with new grouping

### simon

#### Changed

 - Changed `department` setting in config in line with new grouping

### simone

#### Changed

 - Changed `department` setting in config in line with new grouping

### sven

#### Changed

 - Changed `department` setting in config in line with new grouping

### tamiko

#### Changed

 - Changed `department` setting in config in line with new grouping

### teagan

#### Changed

 - Changed `department` setting in config in line with new grouping

### wahid

#### Changed

 - Changed `department` setting in config in line with new grouping

### waralee

#### Changed

 - Changed `department` setting in config in line with new grouping

### i18n

#### Added

 - New translations for pattern filter


## 2.16.0 (2021-05-24)

### florent

#### Fixed

 - Add missing notches See [#1015](https://github.com/freesewing/freesewing/issues/1015)
 - Removed inherited miniscale points

### brian

#### Fixed

 - Paperless dimensions don't extend to hem See [#1030](https://github.com/freesewing/freesewing/issues/1030)

### huey

#### Fixed

 - Fix hood dependencies See [#1026](https://github.com/freesewing/freesewing/issues/1026)

### jaeger

#### Fixed

 - Fixed third button not showing up See [#973](https://github.com/freesewing/freesewing/issues/973)

### i18n

#### Changed

 - Changes to cfp strings


## 2.15.4 (2021-05-08)

### bella

#### Fixed

 - Fixed incorrect part dependencies See [#1002](https://github.com/freesewing/freesewing/issues/1002)


## 2.15.3 (2021-05-05)

### shin

#### Fixed

 - Fixed issue where a legReduction of zero broke the draft See [#997](https://github.com/freesewing/freesewing/issues/997)


## 2.15.2 (2021-04-28)

### jaeger

#### Fixed

 - Draft a third button when it's requested See [#973](https://github.com/freesewing/freesewing/issues/973)

### core

#### Fixed

 - Path.shiftAlong takes now an optional second paramter to control the number of steps the path will be divided in per Mm (if it's a curve) default is 25 See [#976](https://github.com/freesewing/freesewing/issues/976)


## 2.15.1 (2021-04-24)

### charlie

#### Added

 - Added a curved waistband option

#### Fixed

 - Keep `frontPocketSlantRound` and `frontPocketSlantBend` options from being zero

### simon

#### Added

 - Added some dimensions to clarify the X value of shoulder/armhole points

### core

#### Fixed

 - Fixed bug in the dependency resolved when dependecies are passed as a string See [#971](https://github.com/freesewing/freesewing/issues/971)


## 2.15.0 (2021-04-15)

### bella

#### Fixed

 - Shoulder point control point fix for doll-sized clothes

### titan

#### Added

 - Added the waistbandHeight option
 - Added the crossSeamCurveAngle option
 - Added the crotchSeamCurveAngle option

#### Changed

 - Crotch- and Cross seam have been redrawn using the new angle options
 - Added waistbandWidth option

#### Fixed

 - Adapt seat control point when waist is dropped below the hip line
 - Removed lingering console.log statements
 - Configure dependencies to guarantee draft order
 - Always keep seat control point vertically between styled waist and seat
 - Adapt the outseam to the dropped waist in all circumstances

### charlie

#### Added

 - Inital release of the Charlie Chinos pattern

### cornelius

#### Fixed

 - Handle edge-case where splitting a path on and endpoint causes things to break

### paco

#### Changed

 - Extended range and inreased default of the healEase option
 - Added the (disabled) waistbandHeight option from Titan
 - Changed to Titan's waistbandWidth option

### examples

#### Added

 - Added examples for bartack plugin
 - Added examples for new buttonhole-start/end snippets

### plugin-theme

#### Added

 - Added the path.bartack class

### core

#### Added

 - The part.getId() method now takes an optional prefix argument

#### Changed

 - Don't round coordinates internally to avoid path.split misses

### i18n

#### Added

 - Added translation for new Titan options
 - Added translations for Charlie


## 2.14.0 (2021-03-07)

### cornelius

#### Added

 - Cornelius is a FreeSewing pattern for cycling breeches

### hugo

#### Fixed

 - Replaced grainline indicator on pocket with cut-on-fold indicator

### i18n

#### Added

 - Added translations for Cornelius


## 2.13.2 (2021-02-21)

### bella

#### Fixed

 - Fixed issue with out-of-order execution

### titan

#### Fixed

 - Always ensure point waistIn is created in back part

### paco

#### Fixed

 - Only add paperless dimensions for pockets if we drafted pockets

### penelope

#### Fixed

 - Fixed issue in shape part

### simone

#### Fixed

 - Fixed type in bustsidecode finder code


## 2.13.1 (2021-02-14)

### hortensia

#### Fixed

 - Fix incorrectly named part

### simon

#### Fixed

 - Added missing sleeve notch on yoke


## 2.13.0 (2021-02-13)

### hortensia

#### Added

 - Initial release of Hortensia, a handbag pattern

### bella

#### Fixed

 - Verify whether back dart passes armhole depth

### breanna

#### Fixed

 - Try harder to find the intersection point for the scyedart
 - Define missing y variable in paperless branch

### titan

#### Fixed

 - Always balance the waist

### bruce

#### Fixed

 - Added notches to facilitate seam matching

### hugo

#### Fixed

 - Fix style of the seam allowance paths
 - Fix sleeve dependencies

### simone

#### Fixed

 - Force bust dart intersection if not found initially

### wahid

#### Fixed

 - Make sure roudEnd and roundStart points are always available

### i18n

#### Added

 - Translation for Hortensia


## 2.12.1 (2021-01-27)


## 2.12.0 (2021-01-19)

### bella

#### Added

 - Initial release of this body block for womenswear


## 2.11.3 (2021-01-16)

### albert

#### Fixed

 - Added missing scalebox

### florence

#### Fixed

 - Added missing scalebox

### florent

#### Fixed

 - Added missing scalebox

### holmes

#### Fixed

 - Added missing scalebox

### bent

#### Fixed

 - Added missing scalebox

### bruce

#### Fixed

 - Added missing scalebox

### huey

#### Fixed

 - Added missing scalebox
 - Added cut-on-fold indicator to pocket
 - Removed lingering notch from pocket part

### hugo

#### Fixed

 - Removed inherited notches

### jaeger

#### Fixed

 - Added missing scalebox

### shin

#### Fixed

 - Added missing scalebox

### simon

#### Fixed

 - Cleaned up notches
 - Marked where to match fabric on closure

### simone

#### Fixed

 - Cleaned up notches

### wahid

#### Fixed

 - Added missing scalebox
 - Proper styling for SA on front and back

### waralee

#### Fixed

 - Added missing scalebox


## 2.11.2 (2021-01-11)

### brian

#### Added

 - Marked waistline on Brian. Closes [#782](https://github.com/freesewing/freesewing/issues/782)


## 2.11.1 (2021-01-11)


## 2.11.0 (2021-01-10)

### shin

#### Fixed

 - Removed unused lengthBonus option

### i18n

#### Changed

 - New strings for new features

#### Fixed

 - Type in Simon title


## 2.10.7 (2020-11-18)

### simon

#### Fixed

 - Yoke dart did not affect sleevecap length. See [#687](https://github.com/freesewing/freesewing/issues/687)


## 2.10.6 (2020-11-15)


## 2.10.5 (2020-11-14)

### i18n

#### Fixed

 - Added missing `cty.` translations to non-English language files


## 2.10.4 (2020-11-13)

### titan

#### Fixed

 - Issue with incorrectly named point


## 2.10.3 (2020-11-08)

### core

#### Changed

 - Renderprops now includes SVG with preRender hook applied


## 2.10.2 (2020-11-07)

### core

#### Fixed

 - Fixed bundled bezier-js version


## 2.10.1 (2020-11-07)

### core

#### Changed

 - Switched to bezier-js v3


## 2.10.0 (2020-10-17)

### albert

#### Added

 - Albert is an apron pattern


## 2.9.0 (2020-10-02)

### teagan

#### Added

 - Teagan is a T-shirt pattern

### core

#### Added

 - Parts not get a `name` property set that hold their (own) name/id
 - Added the `info` type to raised events
 - Added support for conditional loading of plugins

### i18n

#### Added

 - Added translations for plugin-title
 - Added translations for teagan
 - Added some translations for the UI

#### Fixed

 - Replaced a few identical files with symlinks


## 2.8.1 (2020-08-16)

### benjamin

#### Fixed

 - Fixed issue with (length of) band

### paco

#### Fixed

 - Added Titan as a peer dependency


## 2.8.0 (2020-08-10)

### benjamin

#### Fixed

 - Fix for incorrect length of the ribbon

### paco

#### Added

 - Initial release for Paco, a pattern for summer pants

### core

#### Fixed

 - Fix an edge case in utils.pointOnCurve for perfect horizontal curves


## 2.7.2 (2020-07-29)

### core

#### Fixed

 - Fixed wrong return value in debug message from Path


## 2.7.1 (2020-07-24)

### aaron

#### Fixed

 - Set missing option `brianFitCollar` to `false`

### bruce

#### Fixed

 - Fixed a check for an undefined value in the store

### carlton

#### Fixed

 - Removed unused `hipsEase` code

### hugo

#### Fixed

 - Set missing option `brianFitCollar` to `false`
 - Adding missing control point to front neck opening

### simon

#### Fixed

 - Set missing option `brianFitCollar` to `false`
 - Don't assume the `chHips-notch` is available because it's not in Simone. Fixes [#833](https://github.com/freesewing/freesewing.org/issues/833)

### simone

#### Fixed

 - Set missing option `brianFitCollar` to `false`

### sven

#### Fixed

 - Avoided loading unset ribbingHeight from store

### wahid

#### Added

 - Added the `square` hem style. Fixes [#672](https://github.com/freesewing/freesewing.org/issues/672)

#### Changed

 - Hem radius can no longer be zero. Use teh `square` hem style for that

### core

#### Added

 - Added new debug functionality through the use of the `raise.debug`
 - Added a new `debug` setting
 - Shorthand now proxies objects to allow debug and raise


## 2.7.0 (2020-07-12)

### benjamin

#### Changed

 - Removed `Circumference` suffix from measurement names

### florence

#### Changed

 - Removed `Circumference` suffix from measurement names

### florent

#### Changed

 - Removed `Circumference` suffix from measurement names

### holmes

#### Changed

 - Removed `Circumference` suffix from measurement names

### trayvon

#### Changed

 - Ported trayvon to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### bent

#### Changed

 - Increased default for the `cuffEase` option
 - Decreased default for the `armholeDepth` option
 - Better range for the `shoulderSlopeReduction` measurement
 - Ported brian to the new (names for) other measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set tip of undersleeve as anchor point for sampling
 - Removed `Circumference` suffix from measurement names

### breanna

#### Changed

 - Ported breanna to the new shoulderSlope measurement. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - Ported breanna to the new (names for) other measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

### brian

#### Changed

 - Ported brian to new `shoulderSlope` degree measurement. See [#358](https://github.com/freesewing/freesewing/issues/358)
 - Ported brian to the new (names for) other measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set HPS as anchor point for sampling in front and back
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

### titan

#### Added

 - A FreeSewing block for pants/trousers
 - Initial release

### aaron

#### Changed

 - Updated side seam shaping and tweaked options for better defaults
 - Better handling of `armholeDrop` option
 - Ported aaron to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Report armhole and neck opening length through raised events

#### Fixed

 - Fixed incorrect instruction for neck binding (the indicated length was only half)

### bruce

#### Changed

 - Ported bruce to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

#### Fixed

 - Sampling some options would not work in Bruce because the code shared across patterns would only run once. That's fixed now.

### carlita

#### Changed

 - Better range for the `shoulderSlopeReduction` measurement
 - Ported carlita to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set a sample anchor point on the side part
 - Removed `Circumference` suffix from measurement names

### carlton

#### Changed

 - Better range for the `shoulderSlopeReduction` measurement
 - Ported carlton to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### cathrin

#### Changed

 - Ported carlita to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Set sample anchor points on all panels
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

#### Fixed

 - [Fixed missing points issue when changing panels option](https://github.com/freesewing/freesewing.org/issues/619)
 - Fixed panels option being a list of numbers rather than strings

### diana

#### Changed

 - Made the `shoulderSlopeReduction` option static so it's not available in the UI
 - Ported diana to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### huey

#### Changed

 - No longer use the `naturalWaist` measurement
 - Changed some option to better defaults
 - Ported huey to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Made the `shoulderSlopeReduction` option static so it's not available in the UI
 - Removed `Circumference` suffix from measurement names

#### Fixed

 - [Added seam allowance to the front closure](https://github.com/freesewing/freesewing/issues/420)

### hugo

#### Added

 - Added shaping of the side seam

#### Changed

 - Changed some option to better defaults
 - Ported hugo to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed deprecated `debug()` statements

### jaeger

#### Changed

 - Changed some option to better defaults
 - Set an anchor on side part for sampling
 - Ported jaeger to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### penelope

#### Changed

 - Ported penelope to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### sandy

#### Changed

 - Ported sandy to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### shin

#### Changed

 - Ported shin to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### simon

#### Changed

 - Ported simon to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### simone

#### Changed

 - Ported simone to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### sven

#### Changed

 - Improved the shaping of the side seam
 - Changed some option to better defaults
 - Ported sven to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### tamiko

#### Changed

 - Switch from `shoulderSlope` option to `shoulderSlope` measurement
 - Ported tamiko to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names

### wahid

#### Changed

 - Ported wahid to the new (names for) measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Removed `Circumference` suffix from measurement names
 - Removed `wrist` and `shoulderToWrist` as required measurements

### waralee

#### Changed

 - Ported waralee to the crotchDepth measurement. See [#425](https://github.com/freesewing/freesewing/issues/425)
 - Removed `Circumference` suffix from measurement names

### legend

#### Added

 - A pattern to document the markings on our patterns
 - Initial release

### tutorial

#### Changed

 - Removed `Circumference` suffix from measurement names

### plugin-bust

#### Changed

 - Removed `Circumference` suffix from measurement names

### plugin-measurements

#### Added

 - A FreeSewing plugin that adds measurements that can be calculated based on existing measurements

### plugin-mirror

#### Added

 - A FreeSewing plugin for mirroring points or paths
 - Initial release

### core

#### Added

 - Added support for injecting custom (path) styles when sampling. Closes [#380](https://github.com/freesewing/freesewing/issues/380)
 - Added support for custom sample styles
 - Added support for raising events via `raise.[type]()` method

#### Fixed

 - [Properly escape quotes in imperial units](https://github.com/freesewing/freesewing/issues/437)

### i18n

#### Changed

 - Added translations for Titan
 - Removed `Circumference` suffix from measurement names

### models

#### Changed

 - Models now come with the new measurements. See [#416](https://github.com/freesewing/freesewing/issues/416)
 - Ported models to the crotchDepth measurement. See [#425](https://github.com/freesewing/freesewing/issues/425)
 - Removed `Circumference` suffix from measurement names


## 2.6.0 (2020-05-01)

### florence

#### Added

 - Florence is a face mask pattern

#### Deprecated

 - @freesewing/fu has been renamed to @freesewing/florence

### brian

#### Fixed

 - The `saBase` path is no longer being rendered

### hugo

#### Fixed

 - Render fully-sized pattern parts when complete is falsy
 - Do not render pocket outline when complete is falsy
 - Do not render pocket facing hint when complete is falsy

### wahid

#### Fixed

 - Removed paths.test
 - Do not draw the pocket outline unless complete is truthy
 - Prevent rounded corners on pocket bag and lining to be drawn twice
 - Closed the front seam path
 - Draft the front lining/facing even when complete is falsy

### core

#### Changed

 - utils now includes `Bezier` which holds the bezier-js library so you don't need to re-import it
 - We no longer set the plugin configuration/data object to fall in `pattern.use()`

### i18n

#### Changed

 - Changes to support the renaming of @freesewing/fu to @freesewing/florence


## 2.5.0 (2020-04-05)

### diana

#### Added

 - Diana is a top with a draped neck

### i18n

#### Added

 - title, description, and options for Dianna


## 2.4.6 (2020-03-23)

### i18n

#### Fixed

 - Fixed an bug in the i18n package


## 2.4.5 (2020-03-19)

### florence

#### Changed

 - Improved shape based on community feedback

### wahid

#### Fixed

 - Check whether frontScyeDart option is zero prior to implementing it


## 2.4.4 (2020-03-15)

### huey

#### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

### simon

#### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

### simone

#### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

### sven

#### Fixed

 - The `sleevecapBackFactorY` and `sleevecapFrontFactorY` options had a minimum above the default

### core

#### Fixed

 - New Svg.escapeText() method to escape text at render time, rather than at draft time This fixes the difference in the inch symbol is displayed in the React component or rendered SVG


## 2.4.3 (2020-03-12)

### i18n

#### Added

 - Added more translations


## 2.4.2 (2020-03-08)

### i18n

#### Added

 - Added more strings


## 2.4.1 (2020-03-04)


## 2.4.0 (2020-02-29)

### florence

#### Added

 - Florence is a face mask pattern
 - Initial release


## 2.3.0 (2020-02-23)

### holmes

#### Added

 - Homes is a pattern for a Sherlock Holmes hat
 - Initial release

### plugin-gore

#### Added

 - A plugin to generate gores for semi-spheres or domes
 - Initial release


## 2.2.0 (2020-02-22)

### florent

#### Fixed

 - Fixed an SA issue in brim top and removed SA from interfacing

### trayvon

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

### aaron

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### carlita

#### Changed

 - Renamed `highPointShoulderToBust` measurement to `hpsToBust`
 - Removed deprecated `centerBackNeckToWaist` measurement

### carlton

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### huey

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### hugo

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

#### Fixed

 - Made sure dimensions for hood center and waistband are always shown

### jaeger

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

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

### wahid

#### Changed

 - Removed deprecated `centerBackNeckToWaist` measurement

### waralee

#### Fixed

 - Fixed tags in pattern config file

### core

#### Added

 - Added the `Path.noop()` method
 - Added the `Path.insop()` methods

### i18n

#### Added

 - Added translations for Breanna

#### Changed

 - Added/Updated strings for the 2.2 frontend changes
 - Changed `Joost De Cock` to `Joost` because spam filters don't like cock

#### Removed

 - Removed the files for homepage translation, and moved that content to markdown
 - Removed the files for editor translation, as it is no longer used

### models

#### Changed

 - Extended the menswear size range to have 10 different sizes, just like womenswear


## 2.1.9 (2020-01-18)

### simon

#### Fixed

 - [#253](https://github.com/freesewing/freesewing/issues/253): Fixed type in simon sleeve causing incorrect cuff issue

### core

#### Fixed

 - [#19](https://github.com/freesewing/freesewing/issues/19): Path offset issue is now fixed in upstream bezier-js@2.4.6


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


## 2.1.5 (2019-11-19)


## 2.1.4 (2019-11-01)


## 2.1.3 (2019-10-18)

### i18n

#### Added

 - More translated strings


## 2.1.2 (2019-10-14)

### i18n

#### Fixed

 - Fixed issue where symlinks were causing all languages to export English strings


## 2.1.1 (2019-10-13)


## 2.1.0 (2019-10-06)

### penelope

#### Added

 - Added the Penelope Pencil Skirt pattern by @woutervdub
 - Initial release

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
 - Initial release

### waralee

#### Added

 - Added the Waralee wrap Pants pattern by @woutervdub
 - Initial release

### core

#### Changed

 - The pattern super constructor now sets a `config` property that holds the pattern configuration. This means that unlike before, there is no need to instantiate a pattern to access its config. You can just import the pattern, and it's config property will contain the pattern config.

### i18n

#### Added

 - Added translations for Penelope, Waralee, and Simone


## 2.0.4 (2019-09-27)

### carlton

#### Fixed

 - [#108](https://github.com/freesewing/freesewing/issues/108): Fixed incorrect width of the Carlton tail


## 2.0.3 (2019-09-15)

### bruce

#### Fixed

 - [#106](https://github.com/freesewing/freesewing/issues/106): Fix incorrect hem allowance


## 2.0.2 (2019-09-06)

### benjamin

#### Fixed

 - Added bandLength option to fit optiongroup (it was missing)

### jaeger

#### Fixed

 - [#76](https://github.com/freesewing/freesewing.org/issues/76): Fixed a typo in Jaeger that was causing the side vent length to be wrong

### simon

#### Fixed

 - [#100](https://github.com/freesewing/freesewing.org/issues/100): Updated simon with more sensible defaults for ease options
 - [#102](https://github.com/freesewing/freesewing.org/issues/102): Fixed 'Snippets not defined' error when drafting a seperate button placket
 - [#103](https://github.com/freesewing/freesewing.org/issues/103): Fixed 'hemSa not defined' when drafting paperless Simon without seam allowance

### i18n

#### Added

 - [#90](https://github.com/freesewing/freesewing/issues/90): Added missing option translations for Benjamin, Florent, Sandy, Shin, and Theo


## 2.0.1 (2019-09-01)

### models

#### Added

 - Expanded the size ranges available.
 - Added the `withBreasts` models which were missing in earlier releases.

#### Changed

 - The models data is now based on the data from the `neckstimate` method in the utils package.

#### Fixed

 - [#86](https://github.com/freesewing/freesewing/issues/86): The `seatCircumference` measurement was missing, thus making it unavailable on the website


## 2.0.0 (2019-08-25)

### benjamin

#### Added

 - Initial release

### florent

#### Added

 - Initial release

### trayvon

#### Added

 - Initial release

### bent

#### Added

 - Initial release

### brian

#### Added

 - Initial release

### aaron

#### Added

 - Initial release

### bruce

#### Added

 - Initial release

### carlita

#### Added

 - Initial release

### carlton

#### Added

 - Initial release

### cathrin

#### Added

 - Initial release

### huey

#### Added

 - Initial release

### hugo

#### Added

 - Initial release

### jaeger

#### Added

 - Initial release

### sandy

#### Added

 - Initial release

### shin

#### Added

 - Initial release

### simon

#### Added

 - Initial release

### sven

#### Added

 - Initial release

### tamiko

#### Added

 - Initial release

### wahid

#### Added

 - Initial release

### examples

#### Added

 - Initial release

### rendertest

#### Added

 - Initial release

### tutorial

#### Added

 - Initial release

### plugin-bundle

#### Added

 - Initial release

### plugin-bust

#### Added

 - Initial release

### plugin-flip

#### Added

 - Initial release

### plugin-i18n

#### Added

 - Initial release

### plugin-round

#### Added

 - Initial release

### plugin-sprinkle

#### Added

 - Initial release

### plugin-svgattr

#### Added

 - Initial release

### plugin-theme

#### Added

 - Initial release

### core

#### Added

 - Initial release

### i18n

#### Added

 - Initial release

### models

#### Added

 - Initial release

### prettier-config

#### Added

 - Initial release


