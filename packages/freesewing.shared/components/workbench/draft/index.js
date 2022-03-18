import { useState } from 'react'
import SvgWrapper from './svg-wrapper'
import Error from './error.js'
import Popout from 'shared/components/popout.js'
import Robot from 'shared/components/robot/index.js'

const LabDraft = props => {
  const { app, draft, pattern, gist, updateGist, unsetGist, feedback } = props

  const [share, setShare] = useState(false)
  if (!draft) return null

  if (gist?.renderer === 'svg') {
    // Render as SVG
    let svg
    try { svg = draft.render() }
    catch(error) {
      console.log('Failed to render pattern', error)
      return <Error error={error} {...props} />
    }
    return <div dangerouslySetInnerHTML={{ __html: svg }} />
  }

  // Render as React
  let patternProps = {}
  try { patternProps = draft.draft().getRenderProps() }
  catch(error) {
    console.log('Failed to get render props for pattern', error)
    return <Error error={error} {...props} />
  }

  // Handle broken drafts
  let error = null
  if (patternProps.events.error.length > 0) {
    error = (
      <Popout warning>
        <div className="flex flex-row justify-between">
          <div>
            <h3>Got {patternProps.events.error.length} problems and a stitch ain't one</h3>
            <p>Don't be alarmed, but we ran into some trouble while drafting this pattern.</p>
            <h4>Help us make FreeSewing better</h4>
            <p>
              If you like puzzles, you can try to figure out what went wrong:
            </p>
            <ul className="list-disc list-inside ml-4 text-xl">
               <li>
                  Check the <button className="btn-link" onClick={() => updateGist(['_state', 'view'], 'events')}>
                  <strong>{patternProps.events.error.length} errors</strong> and <strong>
                  {patternProps.events.warning.length} warnings</strong></button>
                </li>
               <li>Check the partially rendered pattern below to see which areas are problematic</li>
            </ul>
            <p>
              Alternatively, you can escalate this. Which means that:
            </p>
            <ul className="list-disc list-inside ml-4 text-xl">
              <li>
                We will compile a <strong>crash report</strong> that contains everything needed <strong>to recreate this problem</strong>
              </li>
              <li>
                We will include <strong>personal data</strong> such as your <strong>username</strong>, <strong>
                email address</strong> and <strong>measurements</strong>
              </li>
              <li>
                We will share this report and the data in it with <a className="text-primary font-bold"
                href="https://github.com/orgs/freesewing/teams/bughunters">FreeSewing's bughunters team</a>
              </li>
            </ul>
            <div className="form-control">
              <label className="cursor-pointer flex flex-row gap-4 my-4">
                <input type="checkbox" checked={share} className="checkbox checkbox-primary" onChange={() => setShare(!share)}/>
                <span className="label-text text-xl">I agree to the use of my personal data for this purpose</span>
              </label>
            </div>
            <p>
              <button disabled={!share} className="btn btn-primary">Escalate this</button>
            </p>

          </div>
          <Robot pose='fail' />
        </div>
      </Popout>
    )
  }
  console.log(patternProps)

  return (
    <>
      {error}
      <SvgWrapper {...{ draft, patternProps, gist, updateGist, unsetGist, app, feedback }} />
    </>
  )
}

export default LabDraft
