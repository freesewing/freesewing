import { Tab, Tabs } from './tabs.mjs'
import Md from 'react-markdown'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginFlip } from '@freesewing/plugin-flip'
import { pluginGore } from '@freesewing/plugin-gore'
import { Design } from '@freesewing/core'
import { Svg } from '../workbench/draft/svg'
import { Defs } from '../workbench/draft/defs'
import { Stack } from '../workbench/draft/stack'
import { defaultGist } from 'shared/hooks/useGist'
import { useMemo } from 'react'
import set from 'lodash.set'
import yaml from 'js-yaml'

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
const Example = ({ app, patternProps, xray = false }) => {
  // State for gist
  const gist = useMemo(() => {
    const newGist = defaultGist('example-mdx', app.locale)
    set(newGist, ['_state', 'xray', 'enabled'], xray)
    return newGist
  }, [xray, app.locale])

  if (patternProps.logs.pattern.error.length > 0 || patternProps.logs.sets[0].error.length > 0)
    return (
      <div className="max-w-full p-4">
        <pre>{patternProps.logs.pattern.error.join('\n')}</pre>
        <pre>{patternProps.logs.sets[0].error.join('\n')}</pre>
      </div>
    )

  return (
    <Svg {...patternProps} embed={true}>
      <Defs {...patternProps} />
      <style>{`:root { --pattern-scale: 1} ${patternProps.svg.style}`}</style>
      <g>
        {Object.keys(patternProps.stacks).map((stackName) => (
          <Stack
            {...{ app, gist, patternProps }}
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
const buildExample = (children, settings = { margin: 5 }, tutorial = false, paperless = false) => {
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

// Wrapper component dealing with the tabs and code view
export const TabbedExample = ({
  app,
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
  const draft = buildExample(children, settings, tutorial, paperless)

  if (!draft.sample) return null

  const patternProps = settings.sample
    ? draft.sample().getRenderProps()
    : draft.draft().getRenderProps()

  if (tutorial && !previewFirst)
    return (
      <div className="my-8">
        <Tabs tabs="Code, Preview, X-Ray">
          <Tab key="code">{children}</Tab>
          <Tab key="preview">
            <Example {...{ patternProps, tutorial, paperless, settings, app }} />
          </Tab>
          <Tab key="xray">
            <Example {...{ patternProps, tutorial, paperless, settings, app }} xray={true} />
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
          <Example {...{ patternProps, tutorial, paperless, settings, app }} />
        </Tab>
        <Tab key="code">{children}</Tab>
        <Tab key="xray">
          <Example {...{ patternProps, tutorial, paperless, settings, app }} xray={true} />
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
