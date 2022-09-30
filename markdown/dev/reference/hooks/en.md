---
title: Lifecycle hooks
---

FreeSewing has **lifecycle hooks** that allow you extend its functionality by
hooking into a lifecycle event.

You can register a method for a hook. When the hook is triggered, your method will be
called. It will receive two parameters:

- An object relevant to the hook (see the specific hook for details)
- Data passed when the hook was registered (optional)

## Pattern lifecycle

<Dot caption="A schematic overview of FreeSewing lifecycle hooks">
```dot
rankdir="TB"
compound=true
subgraph cluster_pattern {
  fontsize=14
  color="transparent"
  preInit [shape="box" color="tc-orange"]
  postInit [shape="box" color="tc-orange"]

  subgraph cluster_draft {
    label="Pattern.draft()"
    color="tc-teal"
    preDraft [shape="box" color="tc-teal"]
    preSetDraft [shape="box" color="tc-teal"]
    prePartDraft [shape="box" color="tc-teal"]
    postPartDraft [shape="box" color="tc-teal"]
    postSetDraft [shape="box" color="tc-teal"]
    postDraft [shape="box" color="tc-teal"]
  }

  subgraph cluster_sample {
    label="Pattern.sample()"
    color="tc-sky"
    preSample [shape="box" color="tc-sky"]
    postSample [shape="box" color="tc-sky"]
  }

  subgraph cluster_getRenderProps {
    label="Pattern.getRenderProps()"
    color="tc-gray"
    preRenderProps [label="preRender" shape="box" color="tc-teal"]
  }

  subgraph cluster_render {
    label="Pattern.render()"
    color="tc-gray"
    preRender [shape="box" color="tc-teal"]
    insertText [shape="box" color="tc-teal"]
    postRender [shape="box" color="tc-teal"]
  }
}

preInit -> postInit
postInit -> preDraft
preDraft -> preSetDraft -> preSetDraft
preSetDraft -> prePartDraft -> prePartDraft
prePartDraft -> postPartDraft -> postPartDraft
postPartDraft -> postSetDraft -> postSetDraft
postSetDraft -> postDraft
postDraft -> preRenderProps
postDraft -> preRender
preRender -> insertText -> insertText
insertText -> postRender

postInit -> preSample
preSample -> postSample
postSample -> preRenderProps
postSample -> preRender

```
</Dot>

## Lifecycle hooks

Below is a list of all available lifecycle hooks:

<ReadMore list />


