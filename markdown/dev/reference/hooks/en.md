---
title: Lifecycle hooks
---

FreeSewing has **lifecycle hooks** that allow you extend its functionality by
hooking into a lifecycle event.

Through the [use of a plugin](/guides/plugins/hooks), you can register a method
for a hook. When the hook is triggered, your method will be called. It will
receive two parameters:

- An object relevant to the hook (see the specific hook for details)
- Data passed when the hook was registered (optional)

Below is a list of all available lifecycle hooks:

<ReadMore list />


