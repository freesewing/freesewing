import React, { useState } from 'react'
import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'
import Draft from '@freesewing/components/Draft'
import Icon from 'shared/components/icon'
import Pattern from '../../../react-pattern/dist/index.mjs'
//import Design from '../Workbench/Design'
//
const Design = props => <p>TODO: Design</p>

const Example = ({
  pattern = 'examples',
  design = true,
  children=null,
  options = {},
  settings,
  part = '',
  sample
}) => {
  const [designMode, setDesignMode] = useState(false)
  const [focus, setFocus] = useState(null)

  const raiseEvent = (type, data) => {
    if (type === 'clearFocusAll') return setFocus(null)
    let f = {}
    if (focus !== null) f = { ...focus }
    if (typeof f[data.part] === 'undefined') f[data.part] = { paths: [], points: [], coords: [] }
    if (type === 'point') f[data.part].points.push(data.name)
    else if (type === 'path') f[data.part].paths.push(data.name)
    else if (type === 'coords') f[data.part].coords.push(data.coords)
    else if (type === 'clearFocus') {
      let i = focus[data.part][data.type].indexOf(data.name)
      f[data.part][data.type].splice(i, 1)
    }

    setFocus(f)
  }

  let focusCount = 0
  if (focus !== null) {
    for (let p of Object.keys(focus)) {
      for (let i in focus[p].points) focusCount++
      for (let i in focus[p].paths) focusCount++
      for (let i in focus[p].coords) focusCount++
    }
  }

  const patterns = {
    examples,
    rendertest,
    tutorial
  }
  settings = {
    options: { ...options },
    measurements: { head: 390 },
    ...settings
  }
  if (part !== '') settings.only = [part]
  const patternInstance = new patterns[pattern](settings)
  if (sample) patternInstance.sample()
  else patternInstance.draft()
  const patternProps = patternInstance.getRenderProps()
  return (
    <figure className={designMode ? 'design example' : 'example'}>
      <div className="example text-base-content">
        <div className="actions">
          <button
            disabled={!designMode}
            color="primary"
            onClick={() => raiseEvent('clearFocusAll', null)}
          >
            <Icon icon='settings' />
          </button>
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4 font-lg lg:font-xl font-bold">
              <input
                type="checkbox"
                checked={designMode}
                className="toggle toggle-secondary"
                onChange={() => setDesignMode(!designMode)}
              />
              <span className="label-text text-secondary">{designMode ? 'Disable' : 'Enable'} Developer View</span>
            </label>
          </div>
        </div>
        <div className="shadow rounded border border-base-200">
          <Pattern {...patternProps} design={designMode} focus={focus} raiseEvent={raiseEvent} />
        </div>
      </div>
      <figcaption className="text-base-content text-center text-base lg:text-lg italic">{children}</figcaption>
      {designMode && (
        <div className="design">
          <Design
            focus={focus}
            design={designMode}
            raiseEvent={raiseEvent}
            parts={patternProps.parts}
          />
        </div>
      )}
    </figure>
  )
}

export default Example
