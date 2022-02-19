---
title: Units in FreeSewing
order: 40
---

FreeSewing uses millimeter for all its internal units.
We do support both imperial and metrics units, which are displayed
as cm or inch, but under the hood everything is handled in millimeter.

So as a pattern designer, you will work with mm.
When you write `1`, that’s one mm. When you write `7.8`, that’s 7.8mm.

While you can use cm or inch on the FreeSewing website, that is merely a layer of
abstration on top of the internal units, which are always mm.
