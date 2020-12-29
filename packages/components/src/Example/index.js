import React, { useState } from 'react'
import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'
import Draft from '../Draft'
import Design from '../Workbench/Design'
import IconButton from '@material-ui/core/IconButton'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import Switch from '@material-ui/core/Switch'
import theme from './theme'

const Example = ({
  pattern = 'examples',
  design = true,
  caption = '',
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
  const patternInstance = new patterns[pattern](settings).use(theme)

  if (sample) patternInstance.sample()
  else patternInstance.draft()
  const patternProps = patternInstance.getRenderProps()
  return (
    <figure className={designMode ? 'design example' : 'example'}>
      <div className="example">
        {designMode ? (
          <div className="actions">
            <IconButton color="primary" onClick={() => raiseEvent('clearFocusAll', null)}>
              <ResetIcon />
            </IconButton>
            <Switch
              checked={designMode}
              onChange={() => setDesignMode(!designMode)}
              value={designMode}
              color="primary"
            />
          </div>
        ) : null}
        <Draft {...patternProps} design={design} focus={focus} raiseEvent={raiseEvent} />
      </div>
      <figcaption>{caption}</figcaption>
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
