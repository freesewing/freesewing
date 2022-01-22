import React, { useState } from 'react'
import Svg from './Svg'
import Defs from './Defs'
import Part from './Part'
import Develop from './Develop'

const PatternSvg = props => (
  <Svg
    embed={props.settings.embed}
    width={props.width}
    height={props.height}
    language={props.settings.locale}
    id={props.settings.idPrefix + 'svg'}
    develop={props.develop || false}
    style={props.style || {}}
    viewBox={props.viewBox}
    className={props.className || 'freesewing pattern'}
  >
    <Defs {...props} />
    <style>{`:root { --pattern-scale: ${props.settings.scale || 1}}`}</style>
    <g>
      {Object.keys(props.parts).map((name) => (
        <Part
          part={props.parts[name]}
          language={props.settings.locale}
          paperless={props.settings.paperless}
          units={props.settings.units}
          key={name}
          name={name}
          focus={props.focus || false}
          develop={props.develop || false}
          raiseEvent={props.raiseEvent}
        />
      ))}
    </g>
  </Svg>
)

const Pattern = props => {

  const {
    pattern = 'examples',
    patterns = {},
    children=null,
    options = {},
    measurements = { head: 390},
    part = '',
    sample,
    svgOnly=false,
    allowDevelop=true
  } = props

  const [develop, setDevelop] = useState(false)
  const [focus, setFocus] = useState(null)

  // Don't continue if there's no pattern
  if (!pattern || !patterns[pattern]) return <pre>{JSON.stringify(props,null,4)}</pre> //null

  /* Helper method to handle user clicks */
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

  /* Handle various elements with focus */
  let focusCount = 0
  if (focus !== null) {
    for (let p of Object.keys(focus)) {
      for (let i in focus[p].points) focusCount++
      for (let i in focus[p].paths) focusCount++
      for (let i in focus[p].coords) focusCount++
    }
  }

  /* Set up settings object */
  const settings = {
    options: { ...options },
    measurements: { ...measurements },
    ...props.settings
  }
  // Support for options_ prefix
  for (const [key, val] of Object.entries(props)) {
    if (key.slice(0,8) === 'options_') settings.options[key.slice(8)] = (val === 'true')
     ? true
     : (val === 'false')
     ? false
     : val
    if (key.slice(0,9) === 'settings_') settings[key.slice(9)] = (val === 'true')
     ? true
     : (val === 'false')
     ? false
     : val
  }

  if (part !== '') settings.only = [part]
  const patternInstance = new patterns[pattern](settings)
  if (sample) patternInstance.sample()
  else patternInstance.draft()
  const patternProps = patternInstance.getRenderProps()
  return svgOnly
    ? <PatternSvg {...patternProps} develop={develop} focus={focus} raiseEvent={raiseEvent} />
    : (
      <figure className={`my-4 ${develop ? 'develop example' : 'example'}`}>
        <div className="example text-base-content">
          {allowDevelop && (
            <div className="actions">
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-4 font-lg lg:font-xl font-bold">
                  <input
                    type="checkbox"
                    checked={develop}
                    className="toggle toggle-secondary"
                    onChange={() => setDevelop(!develop)}
                  />
                  <span className="label-text text-secondary">{develop ? 'Disable' : 'Enable'} Developer View</span>
                </label>
              </div>
            </div>
          )}
          {develop && (
            <div className="develop p-4 py-2 border rounded mb-2">
              <div className="flex flex-row justify-between">
                <h5>Developer info</h5>
                <button
                  disabled={!develop}
                  className="px-2 py-1 rounded text-secondary border-secondary border text-sm"
                  onClick={() => raiseEvent('clearFocusAll', null)}
                >
                  <strong>Clear</strong>
                </button>
              </div>
              <Develop
                focus={focus}
                develop={develop}
                raiseEvent={raiseEvent}
                parts={patternProps.parts}
              />
            </div>
          )}
          <div className="shadow rounded border border-base-200">
            <PatternSvg {...patternProps} develop={develop} focus={focus} raiseEvent={raiseEvent} />
          </div>
        </div>
        <figcaption className="text-base-content text-center text-base lg:text-lg italic">{children}</figcaption>
      </figure>
    )
}

export default Pattern
