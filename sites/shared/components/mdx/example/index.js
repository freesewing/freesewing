import { Tab, Tabs } from '../tabs.js'
import Md from 'react-markdown'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginFlip } from '@freesewing/plugin-flip'
import { pluginGore } from '@freesewing/plugin-gore'
import { Design } from '@freesewing/core'
import Svg from '../../workbench/draft/svg'
import Defs from '../../workbench/draft/defs'
import Stack from '../../workbench/draft/stack'
import { useGist } from 'shared/hooks/useGist'

// Get code from children
export const asText = (reactEl) => {
  if (typeof reactEl.props.children === 'string') return reactEl.props.children
  if (Array.isArray(reactEl.props.children)) {
    return reactEl.props.children.map((el) => (typeof el === 'string' ? el : asText(el))).join('')
  }
  if (typeof reactEl.props.children === 'object') return asText(reactEl.props.children)

  return ''
}

// The actual example
const Example = ({ app, draft, xray = false }) => {
  // State for gist
  const { gist, unsetGist, updateGist } = useGist('example-mdx', app)

  if (xray) {
    gist._state.xray = { enabled: true }
    gist.margin = 20
  }
  const patternProps = draft.draft().getRenderProps()
  console.log(draft)
  if (draft.store.logs.error.length > 0 || draft.setStores[0].logs.error.length > 0)
    return (
      <div className="max-w-full p-4">
        <pre>{draft.store.logs.error.join('\n')}</pre>
        <pre>{draft.setStores[0].logs.error.join('\n')}</pre>
      </div>
    )

  return (
    <Svg {...patternProps} embed={true}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: 1} ${patternProps.svg.style}`}</style>
      <g>
        {Object.keys(patternProps.stacks).map((stackName) => (
          <Stack
            {...{ app, gist, updateGist, unsetGist, patternProps }}
            showInfo={app.setPopup}
            key={stackName}
            stackName={stackName}
            stack={patternProps.stacks[stackName]}
          />
        ))}
      </g>
    </Svg>
  )
}

// Returns a FreeSewing draft based on code in children
const buildExample = (children, settings = { margin: 10 }) => {
  const code = asText(children)
  const draft = eval(code)
  const part = {
    draft,
    measurements: [],
    plugins: [pluginBundle, pluginFlip, pluginGore],
  }
  const design = new Design({ parts: [part] })
  return new design(settings)
}

// Wrapper component dealing with the tabs and code view
const TabbedExample = ({ app, children, caption }) => {
  const draft = buildExample(children)

  return (
    <div className="my-8">
      <Tabs tabs="Preview, Code, X-Ray">
        <Tab>
          <Example draft={draft} app={app} />
        </Tab>
        <Tab>{children}</Tab>
        <Tab>
          <Example draft={draft} app={app} xray={true} />
        </Tab>
      </Tabs>
      {caption && (
        <div className="text-center italic -mt-4">
          <Md>{caption}</Md>
        </div>
      )}
    </div>
  )
}

export default TabbedExample
