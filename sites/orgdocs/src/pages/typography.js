import Layout from '@theme/Layout'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

// Re-use this
const p = (
  <p>
    This paragraph is here to show the vertical spacing between headings and paragraphs. In
    addition, let&apos;s make it a bit longer so we can see the line height as the text wraps.
  </p>
)

const TypographyPage = ({ page }) => {
  return (
    <Layout
      title={`FreeSewing documentation for developers and contributors`}
      description="FreeSewing is an open source Javascript library for parametric sewing patterns"
    >
      <div className="tailwind-container">
        <div className="text-base-content mdx max-w-prose text-base-content max-w-prose text-current xl:pl-4 mx-auto my-8">
          <h1>Typography</h1>
          <p>
            This typography page shows an overview of different elements and how they are styled.
          </p>
          <p>It&apos;s a good starting point for theme development.</p>
          <h2>Headings (this is h2)</h2>
          {p} {p}
          <h3>This is h3</h3>
          {p} {p}
          <h4>This is h4</h4>
          {p} {p}
          <h5>This is h5</h5>
          {p} {p}
          <h6>This is h6</h6>
          {p} {p}
          <h2>Links and buttons</h2>
          <p>
            A regular link <a href="#">looks like this</a>, whereas buttons look like this:
          </p>
          <h3>Main button styles</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="daisy-btn daisy-btn-neutral">Neutral button</button>
            <button className="daisy-btn daisy-btn-primary">Primary button</button>
            <button className="daisy-btn daisy-btn-secondary">Secondary button</button>
            <button className="daisy-btn daisy-btn-accent">Accent button</button>
          </div>
          <h3>State button styles</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="daisy-btn daisy-btn-info">Info button</button>
            <button className="daisy-btn daisy-btn-success">Success button</button>
            <button className="daisy-btn daisy-btn-warning">Warning button</button>
            <button className="daisy-btn daisy-btn-error">Error button</button>
          </div>
          <h3>Other button styles</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="daisy-btn daisy-btn-ghost">Ghost button</button>
            <button className="daisy-btn daisy-btn-link">Link button</button>
          </div>
          <h3>Outlined button styles</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="daisy-btn daisy-btn-outline daisy-btn-neutral">
              Neutral button
            </button>
            <button className="daisy-btn daisy-btn-outline daisy-btn-primary">
              Primary button
            </button>
            <button className="daisy-btn daisy-btn-outline daisy-btn-secondary">
              Secondary button
            </button>
            <button className="daisy-btn daisy-btn-outline daisy-btn-accent">Accent button</button>
          </div>
          <h3>Button sizes</h3>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="daisy-btn daisy-btn-primary daisy-btn-lg">Large</button>
            <button className="daisy-btn daisy-btn-primary">Normal</button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-sm">Small</button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-xs">Tiny</button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-lg daisy-btn-wide">
              Large wide
            </button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-wide">Normal wide</button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-sm daisy-btn-wide">
              Small wide
            </button>
            <button className="daisy-btn daisy-btn-primary daisy-btn-xs daisy-bnt-wide">
              Tiny wide
            </button>
          </div>
          <h2>Tabs</h2>
          <h2>Docusaurus Tabs</h2>
          <Tabs>
            <TabItem value="1" label="Tab 1">
              <p>This is 1</p>
            </TabItem>
            <TabItem value="2" label="Tab 2">
              <p>This is 2</p>
            </TabItem>
            <TabItem value="3" label="Tab 3">
              <p>This is 3</p>
            </TabItem>
            <TabItem value="4" label="Tab 4">
              <p>This is 4</p>
            </TabItem>
          </Tabs>
          <h2>DaisyUI Tabs</h2>
          <p>Do not use these. The tab elements clash with the docusaurus styles.</p>
          <div role="tablist" className="daisy-tabs daisy-tabs-bordered">
            <a role="tab" className="daisy-tab">
              Tab 1
            </a>
            <a role="tab" className="daisy-tab daisy-tab-active">
              Tab 2
            </a>
            <a role="tab" className="daisy-tab">
              Tab 3
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TypographyPage
