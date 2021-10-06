import React, { useState } from 'react'
import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'
import Draft from '../Draft'
import Design from '../Workbench/Design'
import IconButton from '@material-ui/core/IconButton'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#868e96',
    '&$checked': {
      color: '#845ef7'
    },
    '&$checked + $track': {
      backgroundColor: '#9775fa'
    }
  },
  checked: {},
  track: {
    backgroundColor: '#868e96'
  }
})(Switch)

const Example = ({
  pattern = 'examples',
  design = true,
  caption = '',
  children=null,
  options = {},
  settings,
  part = '',
  sample
}) => {
  const [designMode, setDesignMode] = useState(false)
  const [focus, setFocus] = useState(null)

  if (caption) console.log('Passing the caption prop to @freesewing/components/Example is deprecated. See: https://github.com/freesewing/freesewing/issues/1043')

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
      <div className="example">
        <div className="actions">
          <IconButton
            disabled={!designMode}
            color="primary"
            onClick={() => raiseEvent('clearFocusAll', null)}
          >
            <ResetIcon />
          </IconButton>
          <PurpleSwitch
            checked={designMode}
            onChange={() => setDesignMode(!designMode)}
            value={designMode}
            color="primary"
            className="switch-accent"
          />
        </div>
        <Draft {...patternProps} design={designMode} focus={focus} raiseEvent={raiseEvent} />
      </div>
      <figcaption>{caption || children}</figcaption>
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
