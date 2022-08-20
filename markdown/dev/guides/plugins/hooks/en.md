---
title: Hooks
order: 60
---

A **hook** is a lifecycle event. The available hooks are:

- [preRender](/reference/api/hooks/prerender/): Called at the start of [`Pattern.render()`](/reference/api/pattern/render)
- [postRender](/reference/api/hooks/postrender/): Called at the end of [`Pattern.render()`](/reference/api/pattern/render)
- [insertText](/reference/api/hooks/inserttext/): Called when inserting text
- [preDraft](/reference/api/hooks/predraft/): Called at the start of [`Pattern.draft()`](/reference/api/pattern/draft)
- [postDraft](/reference/api/hooks/postdraft/): Called at the end of [`Pattern.draft()`](/reference/api/pattern/draft)
- [preSample](/reference/api/hooks/presample/): Called at the start of [`Pattern.sample()`](/reference/api/pattern/sample)
- [postSample](/reference/api/hooks/postsample/): Called at the end of [`Pattern.sample()`](/reference/api/pattern/sample)

You can register a method for a hook. When the hook is triggered, your method will be
called. It will receive two parameters:

- An object relevant to the hook. See the [hooks API reference](/reference/api/hooks/) for details.
- Data passed when the hook was registered (optional)
