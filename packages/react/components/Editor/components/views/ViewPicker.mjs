import React, { useState } from 'react'
import { defaultConfig as config } from '../../config/index.mjs'
import { viewIcons, viewLabels } from './index.mjs'
// Components
import { Popout } from '@freesewing/react/components/Popout'
import { H2, H4, H5 } from '@freesewing/react/components/Heading'

/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param (object) props - All the props
 * @param {object} designs - Object holding all designs
 * @param {object} update - ViewWrapper state update object
 */
export const ViewPicker = ({ Design, update, state }) => {
  const [showDev, setShowDev] = useState(false)

  /*
   * If we don't have the measurements, only present measurements free views
   */
  if (state._.missingMeasurements.length > 1)
    return (
      <div className="tw-text-center tw-mt-8 tw-mb-24 tw-px-4 tw-max-w-xl tw-mx-auto">
        <H2>Choose a view</H2>
        <div className="tw-flex tw-flex-col tw-mx-auto tw-justify-center tw-gap-2 tw-mt-4">
          {config.measurementsFreeViews
            .filter((view) => view !== 'picker')
            .map((view) => (
              <MainCard key={view} {...{ view, update, Design }} />
            ))}
          <Popout note>
            <div className="tw-text-left">
              <H5>pe:measurementsFreeViewsOnly.t:</H5>
              <p>pe:measurementsFreeViewsOnly.d</p>
            </div>
          </Popout>
        </div>
      </div>
    )

  return (
    <div className="tw-text-center tw-mt-8 tw-mb-24 tw-px-4">
      <H2>Choose an Editor View</H2>
      <div className="tw-max-w-6xl tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-mx-auto tw-justify-center tw-gap-2 lg:tw-gap-4 tw-mt-4">
        {config.mainViews.map((view) => (
          <MainCard key={view} {...{ view, update, Design }} />
        ))}
      </div>
      <div className="tw-max-w-6xl tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-mx-auto tw-justify-center tw-gap-2 lg:tw-gap-4 tw-mt-4">
        {config.extraViews.map((view) => (
          <ExtraCard key={view} {...{ view, update }} />
        ))}
      </div>
      {showDev || state.ui.ux > 3 ? (
        <div className="tw-max-w-6xl tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-mx-auto tw-justify-center tw-gap-2 lg:tw-gap-4 tw-mt-4">
          {config.devViews.map((view) => (
            <ExtraCard key={view} {...{ view, update }} />
          ))}
        </div>
      ) : null}
      {state.ui.ux < 4 ? (
        <button
          className="tw-daisy-btn tw-daisy-btn-ghost tw-mt-2"
          onClick={() => setShowDev(!showDev)}
        >
          {showDev ? 'Hide' : 'Show'} Advanced Views
        </button>
      ) : null}
    </div>
  )
}

const MainCard = ({ view, update, Design }) => {
  const Icon = viewIcons[view]

  return (
    <button
      className={`tw-border tw-shadow tw-p-4 tw-rounded-lg tw-w-full hover:tw-bg-secondary hover:tw-bg-opacity-20 tw-flex tw-flex-col`}
      title={viewLabels[view].t}
      onClick={() => update.view(view)}
    >
      <H4>
        <div
          className={`tw-flex tw-flex-row tw-items-start tw-justify-between tw-p-0 tw-mb-2 tw-text-left`}
        >
          <span>{viewLabels[view].t}</span>
          <Icon className="tw-w-10 tw-h-10" />
        </div>
      </H4>
      <p className={`tw-text-left tw-text-lg tw-m-0 tw-p-0 tw-grow-2 tw-font-medium`}>
        {viewLabels[view].d}
      </p>
    </button>
  )
}

const ExtraCard = ({ view, update }) => {
  const Icon = viewIcons[view]
  return (
    <button
      className="tw-border tw-shadow tw-p-3 tw-rounded-lg tw-w-full hover:tw-bg-secondary hover:tw-bg-opacity-20 tw-flex tw-flex-col"
      title={viewLabels[view].t}
      onClick={() => update.view(view)}
    >
      <H5>
        <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-p-0 tw-mb-1 tw-text-left">
          <span>{viewLabels[view].t}</span>
          <Icon className="tw-w-8 tw-h-8" />
        </div>
      </H5>
      <p className="tw-text-left tw-m-0 tw-p-0 tw-grow-2">{viewLabels[view].d}</p>
    </button>
  )
}
