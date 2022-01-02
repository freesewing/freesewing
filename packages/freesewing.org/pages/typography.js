import { useEffect } from 'react'
import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Popout from 'shared/components/popout.js'

const TypographyPage = (props) => {
  const app = useApp()
  const { updateNavigation } = app

  useEffect(() => {
    updateNavigation(
      ['typography'],
      {
        __title: 'Typography',
        __linktitle: 'Typography',
        __slug: 'typography',
        __order: 'typography'
      })
  }, [updateNavigation])

  const p = (
    <p>
      This paragraph is here to show the vertical spacing between headings and paragraphs.
      In addition, let&apos;s make it a bit longer so we can see the line height as the text wraps.
    </p>
  )

  return (
    <Page app={app} title='Typography'>
      <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-lg lg:text-xl">
        <p>This typography page shows an overview of different elements and how they are styled.</p>
        <p>It&apos;s a good starting point for theme development.</p>
        <h2>Headings (this is h2)</h2>
        {p}
        <h3>This is h3</h3>{p}
        <h4>This is h4</h4>{p}
        <h5>This is h5</h5>{p}
        <h6>This is h6</h6>{p}
        <h2>Links and buttons</h2>
        <p>A regular link <a href="#">looks like this</a>, whereas buttons look like this:</p>
        <h3>Main button styles</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <button className="btn btn-neutral">Neutral button</button>
          <button className="btn btn-primary">Primary button</button>
          <button className="btn btn-secondary">Secondary button</button>
          <button className="btn btn-accent">Accent button</button>
        </div>
        <h3>State button styles</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <button className="btn btn-info">Info button</button>
          <button className="btn btn-success">Success button</button>
          <button className="btn btn-warning">Warning button</button>
          <button className="btn btn-error">Error button</button>
        </div>
        <h3>Other button styles</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <button className="btn btn-ghost">Ghost button</button>
          <button className="btn btn-link">Link button</button>
        </div>
        <h3>Outlined button styles</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <button className="btn btn-outline btn-neutral">Neutral button</button>
          <button className="btn btn-outline btn-primary">Primary button</button>
          <button className="btn btn-outline btn-secondary">Secondary button</button>
          <button className="btn btn-outline btn-accent">Accent button</button>
        </div>
        <h3>Button sizes</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <button className="btn btn-primary btn-lg">Large</button>
          <button className="btn btn-primary">Normal</button>
          <button className="btn btn-primary btn-sm">Small</button>
          <button className="btn btn-primary btn-xs">Tiny</button>
          <button className="btn btn-primary btn-lg btn-wide">Large wide</button>
          <button className="btn btn-primary btn-wide">Normal wide</button>
          <button className="btn btn-primary btn-sm btn-wide">Small wide</button>
          <button className="btn btn-primary btn-xs bnt-wide">Tiny wide</button>
        </div>
        <h2>Popouts</h2>
        <p>The Popout component is what powers various custom MDX components under the hood:</p>
        {['note', 'tip', 'warning', 'fixme', 'link', 'related', 'none'].map(type => {
          const props = {}
          props[type] = true
          return (
            <div key={type}>
              <h3 className="capitalize">{type}</h3>
              <Popout {...props}>
                <h5>I am the {type} title</h5>
                {p}
              </Popout>
            </div>
          )
        })}
      </div>
    </Page>
  )
}

export default TypographyPage

