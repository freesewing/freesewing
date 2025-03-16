// Dependencies
import { designMeasurements } from '../../lib/index.mjs'
import { capitalize, horFlexClasses as horFlexClasses } from '@freesewing/utils'
import { measurements as measurementsTranslations } from '@freesewing/i18n'
// Hooks
import React, { Fragment, useState, useEffect } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Popout } from '@freesewing/react/components/Popout'
import { NumberInput } from '@freesewing/react/components/Input'
import {
  BookmarkIcon,
  CuratedMeasurementsSetIcon,
  EditIcon,
  MeasurementsSetIcon,
  FingerprintIcon,
} from '@freesewing/react/components/Icon'
import { Accordion } from '../Accordion.mjs'
import { MeasurementsEditor } from '../MeasurementsEditor.mjs'
import { BookmarkedSetPicker, CuratedSetPicker, UserSetPicker } from '../Set.mjs'
import { HeaderMenu } from '../HeaderMenu.mjs'
import { H1, H5 } from '@freesewing/react/components/Heading'

const iconClasses = {
  className: 'tw-w-8 tw-h-8 md:tw-w-10 md:tw-h-10 lg:tw-w-12 lg:tw-h-12 tw-shrink-0',
  stroke: 1.5,
}

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
export const MeasurementsView = ({
  config,
  Design,
  missingMeasurements,
  state,
  update,
  design,
}) => {
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
    else update.notifySuccess(`We have all measurements to draft ${capitalize(design)}`)
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
    update.notifySuccess(
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-flex-wrap tw-gap-2">
        <span>Measurements loaded</span>
        <button
          className="tw-daisy-btn tw-daisy-btn-success tw-daisy-btn-outline tw-border-white"
          onClick={() => update.view('draft')}
        >
          <span className="tw-text-white">Load Draft View</span>
        </button>
      </div>
    )
  }

  // Construct accordion items based on the editor configuration
  const items = []
  if (config.enableBackend)
    items.push(
      [
        <Fragment key={1}>
          <div className={`${horFlexClasses} tw-w-full`}>
            <H5 id="ownsets">Choose one of your own measurements sets</H5>
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
          <div className={`${horFlexClasses} tw-w-full`}>
            <H5 id="bookmarkedsets">Choose one of the measurements sets you have bookmarked</H5>
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
          <div className={`${horFlexClasses} tw-w-full`}>
            <H5 id="curatedsets">Choose one of FreeSewing&apos;s curated measurements sets</H5>
            <CuratedMeasurementsSetIcon {...iconClasses} />
          </div>
          <p className="tw-text-left">
            If you&apos;re just looking to try out our platform, you can select from our list of
            curated measurements sets.
          </p>
        </Fragment>,
        <CuratedSetPicker key={2} clickHandler={loadMeasurements} {...{ config, Design }} />,
        'csets',
      ],
      [
        <Fragment key={1}>
          <div className={`${horFlexClasses} tw-w-full`}>
            <H5 id="loadid">Load a measurements set by ID</H5>
            <FingerprintIcon {...iconClasses} />
          </div>
          <p className="tw-text-left">
            If you know the ID of a measurements set — either one of your own or a public set — we
            can load it for you.
          </p>
        </Fragment>,
        <LoadMeasurementsSetById key={2} {...{ loadMeasurements, update }} />,
        'setid',
      ]
    )
  // Manual editing is always an option
  items.push([
    <Fragment key={1}>
      <div className={`${horFlexClasses} tw-w-full`}>
        <H5 id="editmeasurements">Edit measurements by hand</H5>
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
        <H1>Measurements</H1>
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
            <H5>We have all required measurements to draft this pattern</H5>
            <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-mt-2">
              <button
                className="tw-daisy-btn tw-daisy-btn-primary"
                onClick={() => update.view('draft')}
              >
                Draft Pattern
              </button>
              <button
                className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline"
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

const LoadMeasurementsSetById = ({ loadMeasurements, update }) => {
  const backend = useBackend()
  const [id, setId] = useState('')

  return (
    <div>
      <div className="tw-flex tw-flex-row tw-gap-2 tw-items-end">
        <NumberInput
          label="Measurements Set ID"
          update={setId}
          current={id}
          valid={(val) => Number(val) == val}
        />
        <button
          className="tw-daisy-btn tw-daisy-btn-primary"
          onClick={() => loadMeasurementsSet(id, backend, loadMeasurements, update)}
        >
          Load set
        </button>
      </div>
    </div>
  )
}

async function loadMeasurementsSet(id, backend, loadMeasurements, update) {
  update.startLoading('getset', {
    msg: 'Loading measurements set from the FreeSewing backend',
    icon: 'spinner',
  })
  const result = await backend.getSet(id)
  if (result[0] === 200 && result[1].set) {
    loadMeasurements(result[1].set)
    update.clearLoading()
    update.notifySuccess(
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-flex-wrap tw-gap-2">
        <span>Measurements set loaded</span>
        <button
          className="tw-daisy-btn tw-daisy-btn-success tw-daisy-btn-outline tw-border-white"
          onClick={() => update.view('draft')}
        >
          <span className="tw-text-white">Load Draft View</span>
        </button>
      </div>
    )
  } else {
    update.clearLoading()
    update.notifyFailure('Failed to load measurements set', 'getsetko')
  }
}
