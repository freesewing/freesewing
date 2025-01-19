import React from 'react'
import { orderBy } from '@freesewing/utils'
import { ButtonFrame } from '@freesewing/react/components/Input'
import { UndoIcon } from '@freesewing/react/components/Icon'

import { getUndoStepData } from '../../lib/index.mjs'

/**
 * The undos view shows the undo history, and allows restoring any undo state
 *
 * @param (object) props - All the props
 * @param {object} designs - Object holding all designs
 * @param {object} update - ViewWrapper state update object
 */
export const UndosView = ({ Design, update, state }) => {
  const steps = orderBy(state._.undos, 'time', 'desc')

  return (
    <>
      <HeaderMenu state={state} {...{ update, Design }} />
      <div className="tw-text-left tw-mt-8 tw-mb-24 tw-px-4 tw-max-w-xl tw-mx-auto">
        <h2>Undo History</h2>
        <p>Time-travel through your recent pattern changes</p>
        <small>
          <b>Tip:</b> Click on any change to undo all changes up to, and including, that change.
        </small>
        {steps.length < 1 ? (
          <Popout note>
            <h4>Your undo history is currently empty</h4>
            <p>When you make changes to your pattern, they will show up here.</p>
            <p>For example, you can click the button below to change the pattern rotation:</p>
            <button
              className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize"
              onClick={() => update.settings('ui.rotate', state.settings?.ui?.rotate ? 0 : 1)}
            >
              Example: Rotate pattern
            </button>
            <p>As soon as you do, the change will show up here, and you can undo it.</p>
          </Popout>
        ) : (
          <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-4">
            {steps.map((step, index) => (
              <UndoStep key={step.time} {...{ step, update, state, Design, index }} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export const UndoStepTimeAgo = ({ step }) => {
  if (!step.time) return null
  const secondsAgo = Math.floor((Date.now() - step.time) / 100) / 10
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)

  return hoursAgo ? (
    <span>{hoursAgo} hours ago</span>
  ) : minutesAgo ? (
    <span>{minutesAgo} minutes ago</span>
  ) : (
    <span>{secondsAgo} seconds ago</span>
  )
}

export const UndoStep = ({ update, state, step, Design, compact = false, index = 0 }) => {
  /*
   * Ensure path is always an array
   */
  if (!Array.isArray(step.path)) step.path = step.path.split('.')

  /*
   * Figure this out once
   */
  const imperial = state.settings?.units === 'imperial' ? true : false

  /*
   * Metadata can be ignored
   */
  if (step.name === 'settings' && step.path[1] === 'metadata') return null

  /*
   * Defer for anything else to this method
   */
  const data = getUndoStepData({ step, state, Design, imperial })

  if (data === false) return <pre>{JSON.stringify(step, null, 2)}</pre> //null
  if (data === null) return <p>Unsupported</p>

  if (compact)
    return (
      <ButtonFrame dense onClick={() => update.restore(index, state._)}>
        <div className="tw-flex tw-flex-row tw-items-center tw-align-start tw-gap-2 tw-w-full">
          <UndoIcon text={index} className="tw-w-5 tw-h-5 tw-text-secondary" />
          {data.msg ? data.msg : `pe:${data.optCode}`}
        </div>
      </ButtonFrame>
    )

  return (
    <>
      <p className="tw-text-sm tw-italic tw-font-medium tw-opacity-70 tw-text-right tw-p-0 tw-tw-m-0 tw--mb-2 tw-pr-2">
        <UndoStepTimeAgo step={step} />
      </p>
      <ButtonFrame onClick={() => update.restore(index, state._)}>
        <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-w-full tw-m-0 tw-p-0 tw--mt-2 tw-text-lg">
          <span className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
            {data.fieldIcon || null}
            {`pe:${data.optCode}`}
          </span>
          <span className="tw-opacity-70 tw-flex tw-flex-row tw-gap-1 tw-items-center tw-text-base">
            {data.icon || null} {`pe:${data.titleCode}`}
          </span>
        </div>
        <div className="tw-flex tw-flex-row tw-gap-1 tw-items-center tw-align-start tw-w-full">
          {data.msg ? (
            data.msg
          ) : (
            <>
              <span className="">
                {Array.isArray(data.newVal) ? data.newVal.join(', ') : data.newVal}
              </span>
              <LeftIcon className="tw-w-4 tw-h-4 tw-text-secondary tw-shrink-0" stroke={4} />
              <span className="tw-line-through tw-decoration-1 tw-opacity-70">
                {Array.isArray(data.oldVal) ? data.oldVal.join(', ') : data.oldVal}
              </span>
            </>
          )}
        </div>
      </ButtonFrame>
    </>
  )
}
