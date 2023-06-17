import { Tab, Tabs } from './tabs.mjs'
import Md from 'react-markdown'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginFlip } from '@freesewing/plugin-flip'
import { pluginGore } from '@freesewing/plugin-gore'
import { Design } from '@freesewing/core'
import yaml from 'js-yaml'
import { Pattern, PatternXray } from '@freesewing/react-components'

// Get code from children
export const asText = (reactEl) => {
  if (typeof reactEl.props.children === 'string') return reactEl.props.children
  if (Array.isArray(reactEl.props.children)) {
    return reactEl.props.children.map((el) => (typeof el === 'string' ? el : asText(el))).join('')
  }
  if (typeof reactEl.props.children === 'object') return asText(reactEl.props.children)

  return ''
}

// Returns a FreeSewing pattern based on code in children
const buildPattern = (children, settings = { margin: 5 }, tutorial = false, paperless = false) => {
  let code = asText(children)
  // FIXME: Refactor to not use eval
  let draft
  if (code.split('\n')[0].includes('function')) {
    code = '(' + code.split('(').slice(1).join('(')
    code = code.split(')')
    code = code[0] + ') => ' + code.slice(1).join(')')
  }
  try {
    draft = eval(code)
  } catch (err) {
    console.log(err, code)
  }
  const part = {
    draft: draft,
    name: tutorial ? 'tutorial.bib' : 'example',
    measurements: tutorial ? [] : ['head'],
    options: tutorial
      ? {
          neckRatio: { pct: 80, min: 70, max: 90, menu: 'fit' },
          widthRatio: { pct: 45, min: 35, max: 55, menu: 'style' },
          lengthRatio: { pct: 75, min: 55, max: 85, menu: 'style' },
        }
      : {},
    plugins: [pluginBundle, pluginFlip, pluginGore],
  }
  const design = new Design({
    parts: [part],
    data: tutorial ? { name: 'Tutorial', version: '0.0.1' } : { name: 'Example', version: '0.0.1' },
  })
  if (tutorial) settings.measurements = { head: 380 }
  if (paperless) settings.paperless = true

  return new design(settings)
}

// Handles display of pattern in mormal or xray mode
const ShowPattern = ({ renderProps, logs, mode = 'normal' }) => {
  if (!renderProps) return null

  if (logs.pattern.error.length > 0 || logs.sets[0].error.length > 0)
    return (
      <div className="max-w-full p-4">
        <pre>fixme: Errors logged. Please implement log view</pre>
      </div>
    )

  if (mode === 'xray')
    return (
      <>
        <p>xray</p>
        <PatternXray {...{ renderProps }} />
      </>
    )

  return <Pattern {...{ renderProps }} />
}

// Wrapper component dealing with the tabs and code view
export const TabbedExample = ({
  children,
  caption,
  tutorial,
  previewFirst,
  withHead,
  paperless,
  settings,
}) => {
  if (settings)
    settings = {
      margin: 5,
      ...yaml.load(settings),
    }
  else settings = { margin: 5 }
  if (withHead) settings.measurements = { head: 300 }
  const pattern = buildPattern(children, settings, tutorial, paperless)

  // Check that it's a valid pattern
  if (!pattern.sample) return null

  const patternProps = {
    renderProps: settings.sample
      ? pattern.sample().getRenderProps()
      : pattern.draft().getRenderProps(),
    logs: pattern.getLogs(),
  }

  if (tutorial && !previewFirst)
    return (
      <div className="my-8">
        <Tabs tabs="Code, Preview, X-Ray">
          <Tab key="code">{children}</Tab>
          <Tab key="preview">
            <ShowPattern {...patternProps} />
          </Tab>
          <Tab key="xray">
            <ShowPattern {...patternProps} mode="xray" />
          </Tab>
        </Tabs>
        {caption && (
          <div className="text-center italic -mt-4">
            <Md>{caption}</Md>
          </div>
        )}
      </div>
    )

  return (
    <div className="my-8">
      <Tabs tabs="Preview, Code, X-Ray">
        <Tab key="preview">
          <ShowPattern {...patternProps} />
        </Tab>
        <Tab key="code">{children}</Tab>
        <Tab key="xray">
          <ShowPattern {...patternProps} mode="xray" />
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
