---
title: Hooks
order: 60
---

A **hook** is a lifecycle event. The available hooks are:

-   [preRender](/reference/hooks/prerender/): Called at the start of [`Pattern.render()`](/reference/api/pattern#render)
-   [postRender](/reference/hooks/postrender/): Called at the end of [`Pattern.render()`](/reference/api/pattern#render)
-   [insertText](/reference/hooks/inserttext/): Called when inserting text
-   [preDraft](/reference/hooks/predraft/): Called at the start of [`Pattern.draft()`](/reference/api/pattern#draft)
-   [postDraft](/reference/hooks/postdraft/): Called at the end of [`Pattern.draft()`](/reference/api/pattern#draft)
-   [preSample](/reference/hooks/presample/): Called at the start of [`Pattern.sample()`](/reference/api/pattern#sample)
-   [postSample](/reference/hooks/postsample/): Called at the end of [`Pattern.sample()`](/reference/api/pattern#sample)

You can register a method for a hook. When the hook is triggered, your method will be
called. It will receive two parameters:

-   An object relevant to the hook. See the [hooks API reference](/reference/hooks/) for details.
-   Data passed when the hook was registered (optional)
