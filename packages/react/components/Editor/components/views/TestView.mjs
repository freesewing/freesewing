// Dependencies
import React, { useMemo, useCallback } from 'react'
import { sample, missingMeasurements, menuDesignOptionsStructure } from '../../lib/index.mjs'
import { measurements as measurementsTranslations } from '@freesewing/i18n'
import { orderBy } from '@freesewing/utils'
// Components
import { Null } from '../Null.mjs'
import { ZoomablePattern } from '../ZoomablePattern.mjs'
import { PatternLayout } from '../PatternLayout.mjs'
import { HeaderMenu } from '../HeaderMenu.mjs'
import { H1, H3, H4, H5 } from '@freesewing/react/components/Heading'

/**
 * The test view allows users to test options and measurements
 *
 * @param (object) props - All the props
 * @param {function} props.config - The editor configuration
 * @param {function} props.Design - The design constructor
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @return {function} DraftView - React component
 */
export const TestView = ({ Design, state, update, config }) => {
  /*
   * Don't trust that we have all measurements
   *
   * We do not need to change the view here. That is done in the central
   * ViewWrapper componenet. However, checking the measurements against
   * the design takes a brief moment, so this component will typically
   * render before that happens, and if measurements are missing it will
   * throw and error.
   *
   * So when measurements are missing, we just return here and the view
   * will switch on the next render loop.
   */
  if (missingMeasurements(state)) return <Null />

  const { settings } = state
  if (settings.sample) {
    const { pattern } = sample(Design, settings)
    const renderProps = pattern.getRenderProps()
    const output = (
      <ZoomablePattern
        renderProps={renderProps}
        patternLocale={state.locale || 'en'}
        rotate={state.ui.rotate}
      />
    )

    return <PatternLayout {...{ update, Design, output, state, pattern, config }} />
  }

  // Translated measurements
  const trm = orderBy(
    Design.patternConfig.measurements.map((m) => ({ m, t: measurementsTranslations[m] })),
    't',
    'ASC'
  )
  const tom = orderBy(
    Design.patternConfig.optionalMeasurements.map((m) => ({ m, t: measurementsTranslations[m] })),
    't',
    'ASC'
  )

  return (
    <>
      <HeaderMenu state={state} {...{ config, update, Design }} />
      <div className="tw-m-auto tw-mt-8 tw-max-w-4xl tw-px-4 tw-mb-8">
        <H1>Test Pattern</H1>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <H3>Test Design Options</H3>
            <SampleOptionsMenu {...{ Design, state, update }} />
          </div>
          {trm.length > 0 ? (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <H3>Test Measurements</H3>
              <H4>Required Measurements</H4>
              <div className="">
                {trm.map(({ t, m }) => (
                  <button
                    key={m}
                    className="tw-my-0.5 tw-block tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline tw-daisy-btn-xs"
                    onClick={() =>
                      update.settings(['sample'], { type: 'measurement', measurement: m })
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tom.length > 0 ? (
                <div className="tw-flex tw-flex-col tw-gap-4">
                  <H4>Optional Measurements</H4>
                  <div className="">
                    {tom.map(({ t, m }) => (
                      <button
                        key={m}
                        className="tw-my-0.5 tw-block tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline tw-daisy-btn-xs"
                        onClick={() =>
                          update.settings(['sample'], { type: 'measurement', measurement: m })
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

const SampleOptionsMenu = ({ Design, state, update }) => {
  const structure = useMemo(
    () =>
      menuDesignOptionsStructure(
        Design.designConfig.data.id,
        Design.patternConfig.options,
        state.settings
      ),
    [Design.designConfig.data.id, Design.patternConfig, state.settings]
  )

  return <SampleOptionsSubMenu structure={structure} update={update} />
}

const SampleOptionsSubMenu = ({ structure, update, level = 1 }) => {
  const output = []
  /*
   * Show entries alphabetic, but force groups last, and advanced last among them
   */
  const titles = Object.keys(structure)
    .filter((key) => key !== 'isGroup')
    .sort()
  const order = [
    ...titles.filter((key) => key !== 'advanced'),
    ...titles.filter((key) => key === 'advanced'),
  ]
  // Non-groups first
  for (const name of order) {
    const struct = structure[name]
    if (!struct.isGroup)
      output.push(
        <button
          key={name}
          className="tw-my-0.5 tw-block tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline tw-daisy-btn-xs"
          onClick={() => update.settings(['sample'], { type: 'option', option: name })}
        >
          {struct.title}
        </button>
      )
  }
  // Then groups
  for (const name of order) {
    const struct = structure[name]
    if (struct.isGroup) {
      output.push(
        <H5 key={name}>
          <span className="tw-capitalize">{name}</span>
        </H5>
      )
      output.push(
        <SampleOptionsSubMenu
          structure={struct}
          update={update}
          level={level + 1}
          key={name + 's'}
        />
      )
    }
  }

  return <div className="tw-pl-2 tw-border-l-2">{output}</div>
}
