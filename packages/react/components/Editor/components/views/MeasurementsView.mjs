// Dependencies
import { t, designMeasurements } from '../../lib/index.mjs'
import { capitalize } from '@freesewing/utils'
import { measurements as measurementsTranslations } from '@freesewing/i18n'
// Hooks
import React, { Fragment, useEffect } from 'react'
// Components
import { Popout } from '@freesewing/react/components/Popout'
import {
  BookmarkIcon,
  CuratedMeasurementsSetIcon,
  EditIcon,
  MeasurementsSetIcon,
} from '@freesewing/react/components/Icon'
import { Accordion } from '../Accordion.mjs'
import { MeasurementsEditor } from '../MeasurementsEditor.mjs'
import { SetPicker, BookmarkedSetPicker, CuratedSetPicker, UserSetPicker } from '../Set.mjs'
import { HeaderMenu } from '../HeaderMenu.mjs'

const iconClasses = {
  className: 'tw-w-8 tw-h-8 md:tw-w-10 md:tw-h-10 lg:tw-w-12 lg:tw-h-12 tw-shrink-0',
  stroke: 1.5,
}
const horFlexClasses = 'tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4 tw-w-full'

/**
 * The measurements view is loaded to update/set measurements
 *
 * It will be automatically loaded if we do not have all required measurements for a design.
 *
 * @param {Object} props - All the props
 * @param {Function} props.config - The editor configuration
 * @param {Function} props.Design - The design constructor
 * @param {Array} props.missingMeasurements - List of missing measurements for the current design
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the editor state
 * @return {Function} MeasurementsView - React component
 */
export const MeasurementsView = ({ config, Design, missingMeasurements, state, update }) => {
  /*
   * If there is no view set, completing measurements will switch to the view picker
   * Which is a bit confusing. So in this case, set the view to measurements.
   */
  useEffect(() => {
    if (!config?.views || !config.views.includes(state.view)) update.view('measurements')
    if (state._.missingMeasurements && state._.missingMeasurements.length > 0)
      update.notify(
        {
          msg: 'To generate this pattern, we need some additional measurements',
          icon: 'tip',
        },
        'missingMeasurements'
      )
    else update.notifySuccess(t('pe:measurementsAreOk'))
  }, [state.view, update])

  const loadMeasurements = (set) => {
    update.settings(['measurements'], designMeasurements(Design, set.measies))
    update.settings(['units'], set.imperial ? 'imperial' : 'metric')
    // Save the measurement set name to pattern settings
    if (set.nameEn)
      // Curated measurement set
      update.settings(['metadata'], { setName: set.nameEn })
    else if (set.name)
      // User measurement set
      update.settings(['metadata'], { setName: set.name })
  }

  // Construct accordion items based on the editor configuration
  const items = []
  if (config.enableBackend)
    items.push(
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h4 id="ownsets">Choose one of your own measurements sets</h4>
            <MeasurementsSetIcon {...iconClasses} />
          </div>
          <p className="tw-text-left">
            Pick any of your own measurements sets that have all required measurements to generate
            this pattern.
          </p>
        </Fragment>,
        <UserSetPicker
          key={2}
          size="md"
          clickHandler={loadMeasurements}
          missingClickHandler={loadMeasurements}
          {...{ config, Design }}
        />,
        'ownSets',
      ],
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h4 id="bookmarkedsets">Choose one of the measurements sets you have bookmarked</h4>
            <BookmarkIcon {...iconClasses} />
          </div>
          <p className="tw-text-left">
            If you have bookmarked any measurements sets, you can select from those too.
          </p>
        </Fragment>,
        <BookmarkedSetPicker
          key={2}
          size="md"
          clickHandler={loadMeasurements}
          missingClickHandler={loadMeasurements}
          {...{ config, Design }}
        />,
        'bmSets',
      ],
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h4 id="curatedsets">Choose one of FreeSewing&apos;s curated measurements sets</h4>
            <CuratedMeasurementsSetIcon {...iconClasses} />
          </div>
          <p className="tw-text-left">
            If you&apos;re just looking to try out our platform, you can select from our list of
            curated measurements sets.
          </p>
        </Fragment>,
        <CuratedSetPicker key={2} clickHandler={loadMeasurements} {...{ config, Design }} />,
        'csets',
      ]
    )
  // Manual editing is always an option
  items.push([
    <Fragment key={1}>
      <div className={horFlexClasses}>
        <h4 id="editmeasurements">Edit Measurements</h4>
        <EditIcon {...iconClasses} />
      </div>
      <p className="tw-text-left">You can manually set or override measurements below.</p>
    </Fragment>,
    <MeasurementsEditor key={2} {...{ Design, config, update, state }} />,
    'edit',
  ])

  return (
    <>
      <HeaderMenu state={state} {...{ config, update }} />
      <div className="tw-max-w-7xl tw-mt-8 tw-mx-auto tw-px-4 tw-mb-4">
        <h1 className="tw-text-center">Measurements</h1>
        {missingMeasurements && missingMeasurements.length > 0 ? (
          <Popout note dense noP>
            <h3>
              To generate this pattern, we need {missingMeasurements.length} additional measurement
              {missingMeasurements.length === 1 ? '' : 's'}:
            </h3>
            <ol className="tw-list tw-list-inside tw-flex tw-flex-row tw-flex-wrap tw-ml-0 tw-pl-0">
              {missingMeasurements.map((m, i) => (
                <li key={i} className="tw-flex">
                  {i > 0 ? <span className="tw-pr-2">,</span> : null}
                  <span className="tw-font-medium">{measurementsTranslations[m]}</span>
                </li>
              ))}
            </ol>
          </Popout>
        ) : (
          <Popout tip dense noP>
            <h5>We have all required measurements to draft this pattern</h5>
            <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-mt-2">
              <button
                className="tw-daisy-btn tw-daisy-btn-primary lg:tw-daisy-btn-lg"
                onClick={() => update.view('draft')}
              >
                {viewLabels.draft.t}
              </button>
              <button
                className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline lg:tw-daisy-btn-lg"
                onClick={() => update.view('picker')}
              >
                Choose a different view
              </button>
            </div>
          </Popout>
        )}
        {items.length > 1 ? <Accordion items={items} /> : items}
      </div>
    </>
  )
}
