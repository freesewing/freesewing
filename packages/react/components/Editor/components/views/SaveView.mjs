// Dependencies
import yaml from 'js-yaml'
import { capitalize, shortDate, notEmpty } from '@freesewing/utils'
import { linkClasses, classesHorFlexNoSm } from '@freesewing/utils'
// Hooks
import React, { useState } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { RoleBlock } from '@freesewing/react/components/Role'
import { Popout } from '@freesewing/react/components/Popout'
import { StringInput } from '@freesewing/react/components/Input'
import { SaveAsIcon } from '@freesewing/react/components/Icon'
import { H1 } from '@freesewing/react/components/Heading'
import { Link, SuccessLink } from '@freesewing/react/components/Link'
import { HeaderMenu } from '../HeaderMenu.mjs'

/**
 * This is the save view, it allows you to save your pattern to a FreeSewing account
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 */
export const SaveView = ({ config, state, update }) => {
  // Hooks
  const backend = useBackend()

  // State
  const [name, setName] = useState(`${capitalize(state.design)} / ${shortDate()}`)
  const [withNotes, setWithNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [savedId, setSavedId] = useState()
  const [saveAs] = useState(false) // FIXME

  const addSettingsToNotes = () => {
    setNotes(notes + '\n\n#### Settings\n\n```yaml\n' + yaml.dump(state.settings) + '\n````')
  }

  const saveAsNewPattern = async () => {
    const loadingId = 'savePatternAs'
    update.startLoading(loadingId)
    const patternData = {
      design: state.design,
      name,
      public: false,
      settings: state.settings,
      data: {},
    }
    if (withNotes) patternData.notes = notes
    const result = await backend.createPattern(patternData)
    if (result[0] === 201 && result[1].pattern.id) {
      const id = result[1].pattern.id
      update.stopLoading(loadingId)
      update.view('draft')
      update.pid(id)
      update.notifySuccess(
        <span>
          {' '}
          Pattern saved as:{' '}
          <SuccessLink href={`/account/data/patterns/pattern?id=${id}`}> #{id} </SuccessLink>
        </span>,
        id
      )
    } else update.notifyFailure('oops', loadingId)
  }

  const savePattern = async () => {
    setLoadingStatus([true, 'Saving pattern...'])
    const patternData = {
      design: state.design,
      settings: state.settings,
      name,
      public: false,
      data: {},
    }
    const result = await backend.updatePattern(saveAs.pattern, patternData)
    if (result.success) {
      //setLoadingStatus([
      //  true,
      //  <>
      //    {t('status:patternSaved')} <small>[#{saveAs.pattern}]</small>
      //  </>,
      //  true,
      //  true,
      //])
      setSavedId(saveAs.pattern)
      update.notify({ color: 'success', msg: 'boom' }, saveAs.pattern)
    } //else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <RoleBlock user>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-2xl tw-px-4">
        {saveAs && saveAs.pattern ? (
          <>
            <h2>Save Pattern</h2>
            {savedId && (
              <Popout link>
                <h5>Pattern Saved</h5>
                See: <Link href={`/account/patterns/${savedId}`}>/account/patterns/{savedId}</Link>
              </Popout>
            )}
            <button
              className={`${classeshorFlexNoSm} tw-btn tw-btn-primary tw-btn-lg tw-w-full tw-mt-2 tw-my-8`}
              onClick={savePattern}
            >
              <SaveIcon className="tw-h-8 tw-w-8" />
              Save Patter #{saveAs.pattern}
            </button>
          </>
        ) : null}
        <H1>Save As New Pattern</H1>
        <div className="tw-mb-4">
          <StringInput
            label="Pattern title"
            current={name}
            update={setName}
            valid={notEmpty}
            labelBR={
              <>
                {withNotes ? (
                  <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
                    <button
                      className={`tw-font-bold ${linkClasses}`}
                      onClick={() => setWithNotes(false)}
                    >
                      Hide notes
                    </button>
                    <button className={`tw-font-bold ${linkClasses}`} onClick={addSettingsToNotes}>
                      Add settings to notes
                    </button>
                  </div>
                ) : (
                  <button
                    className={`tw-font-bold ${linkClasses}`}
                    onClick={() => setWithNotes(true)}
                  >
                    Add notes
                  </button>
                )}
              </>
            }
          />
          {withNotes ? (
            <Swizzled.components.MarkdownInput
              label="Pattern notes"
              current={notes}
              update={setNotes}
            />
          ) : null}
          <div className="tw-flex tw-flex-row tw-gap-2 tw-mt-8">
            <button
              className={`tw-daisy-btn tw-daisy-btn-primary lg:tw-daisy-btn-lg tw-daisy-btn-outline`}
              onClick={update.viewBack}
              title="Cancel"
            >
              <span>Cancel</span>
            </button>
            <button
              className={`tw-flex tw-flex-row tw-items-center tw-justify-between tw-daisy-btn tw-daisy-btn-primary lg:tw-daisy-btn-lg tw-grow`}
              onClick={saveAsNewPattern}
              title="Save as new pattern"
            >
              <SaveAsIcon className="tw-w-8 tw-h-8" />
              <span>Save as new pattern</span>
            </button>
          </div>
          <p className="tw-text-sm tw-text-right">
            To access your saved patterns, go to:
            <b>
              {' '}
              <Link href="/account/patterns">/account/patterns</Link>
            </b>
          </p>
        </div>
      </div>
    </RoleBlock>
  )
}
