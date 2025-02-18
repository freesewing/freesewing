# Change log for: @freesewing/plugin-annotations


## 3.2.0 (2024-02-11)

### Added

 - The `title` macro now takes a `notes` and `classes.notes` as its config, allowing you to add notes
 - The `classes.cutlist` config is removed from the title plugin, cutlist info is now included as notes

### Removed

 - The `classes.cutlist` config is removed from the title plugin, cutlist info is now included as notes

## 3.1.0 (2023-12-26)

### Changed

 - Added support for notes in flags

### Fixed

 - Removing macros did not always remove the cutlist data in the store. Fixes

## 3.0.0 (2023-09-30)

### Changed

 - All FreeSewing packages are now ESM only.
 - All FreeSewing packages now use named exports.
 - Dropped support for NodeJS 14. NodeJS 18 (LTS/hydrogen) or more recent is now required.


This is the **initial release**, and the start of this change log.

> Prior to version 2, FreeSewing was not a JavaScript project.
> As such, that history is out of scope for this change log.

