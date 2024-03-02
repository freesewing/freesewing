---
title: FreeSewing v3.2.0 is out, brings 3 new designs
caption: Number 32 Painted on White Brick Wall - By ALTEREDSNAPS via Pexels.com
date: 20240211
intro: Lumina, Lumira, and Tristan, plus bug fixes and improvements
author: joost
---

FreeSewing v3.2 was released today, and includes three new designs, as well as
bug fixes and improvements.

## The Tristan Top

First up, there is [the Tristan Top](/designs/tristan). Tristan is a top with
princess seams and (optional) lacing at front or/and back. It's origin story is
the need for a costume for a Renaissance festival, so that is probably a good
indicator of what to expect.

However, don't take my word for it, you can get
all details straight from the horse's mouth (so to speak) since Natalia -- who
designed the top -- wrote a blog post about the new Tristan
design.

Natalia collaborated with Wouter for Tristan, and Wouter also signed for the two other new designs in
this release, let's look at those next.

## The Lumina and Lumira Leggings

Wouter gifted us not one, but two pairs of leggings in this release: the
[Lumira Leggings](/designs/lumira) and the [Lumina Leggings](/designs/lumina).

I'll give you a second to scan the end of that sentence again, but yes there
are two different leggings patterns with similar names. Both were born out of
Wouter's desire for good cycling gear, and I suggest you check out the
**designer notes** for both [Lumina](/designs/lumina#notes) and
[Lumira](/designs/lumira#notes) to fully appreciate the difference between
these designs, why they differ, and what would work best for you.

I am myself rather excited about these, since I could use some new leggings.

## Bug fixes and improvements

While those are the main events for this v3.2 release, there's a bunch of other
bugfixes and improvements, here's a short list:

### A new panels option in Sandy

Our Sandy circle skirt has a new panels
option that was added by
Paula. You could aways
create your circle skirt out of a number of a similar patterns by doing the
match yourself, but now the pattern will take care of that for you.

### A change to the armscye in Brian

What started out as a bug report for the biceps ease on
Jaeger ended with a
change to the way the armscye is calculated on Brian, in particular the depth
of the armhole.

The way the armhole depth is calculated was changed in v3, and we now base it
on the waist to
armpit measurements.
Previously -- in v2 -- we would calculate the depth of the armhole based on the
biceps. That option remains available today by enabled the Legacy armhole
depth
option.

What we have changed now is to take the biceps _ease_ into account when
calculating the depth of the armhole. This fix was needed because without it,
increasing the biceps easy would not (or no longer) influence the armscye. That
in turn means that we want to draft a wider sleeve, but somehow still have to
fit that into the same opening.

Given that Brian is our most foundational block, this will have ripple effects
on many other designs, you can expect that out-of-the-box the armscye will
reach a bit lower.

As always if you run into trouble, check [the support page](/support) to see
where you can turn to for help.

### Fixes in Carlton, Charlie and Hugo

- In [Carlton](/designs/carlton) -- and thus in [Carlita](/designs/carlita) -- we have fixed and issue where the seam allowance on the undercollar was incorrectly drawn.
- In [Charlie](/designs/charlie), the back pocket welt (4) and front pocket facing (8) incorrectly indicated to cut 2 instead of 4 in the cutlist. This too is resolved.
- In [Hugo](/designs/hugo), we fixed a bug that caused the design to error when the complete setting was off, and we fixed an issue where the front pocket opening would get increasingly narrow as the hip circumference increased.

### Path.combine() in FreeSewing core

We've added a new
[Path.combine()](https://freesewing.dev/reference/api/path/combine) method to
our core API.  Its origins lie in a discussion in issue #5976 which was
originally filed as a bug report about how
[Path.join()](https://freesewing.dev/reference/api/path/join) connects _gaps_
in the joined paths -- caused by either `move` operations, or a difference
between the end and start point of joined paths -- to be filled in with a line
segment.

That behaviour is expected/intended, but we've added `Path.combine()` to
faciliate the other behavior: Combining different paths into a single Path
object without alterning any of its drawing operations.

We've made Path.combine() variadic, so you can combine as many paths as you
want.  And, for consistency, we've also updated the `Path.join()` signature to
make it variadic as well.  The previous (undocumented) second parameter to
`Path.join()` to force a close of the path is still supported for backwards
compatibility, but will log a deprecation warning, and will be removed in
FreeSewing v4.

As a final side-effect of this change, the
[Path.length()](https://freesewing.dev/reference/api/path/length) method can
now be instructed to include move operations in its calculation of the length
of the path. The default behaviour remains unchanged, which is to only
include drawing operations when calculating  the path's length.

### Notes in design titles

The [`title` macro](https://freesewing.dev/reference/macros/title) now can be
configured with a `notes` and `classes.notes` setting in its config, allowing
designers to add notes to (the title of) a pattern part.

As a result, the `classes.cutlist` setting is removed from the title macro, and
cutlist info is now included as notes.

### Support for nested arrays in designs

The [i18n plugin](https://freesewing.dev/reference/plugins/i18n) now supports
now supports translation of nested arrays of strings, which gives designers
more flexibility to concatenate translated parts of strings. Something that is
most useful when mixing translated strings with run-time information about the
generated pattern.

In line with this change, the `Pattern` component, which is part of our
[react-components](https://freesewing.dev/reference/packages/react-components)
package, supports the same nested arrays.

That's all for v3.2. Viel Spaß!
