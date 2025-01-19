import React from 'react'
import mustache from 'mustache'
import { defaultConfig } from '../config/index.mjs'
import { flattenFlags } from '../lib/index.mjs'
import {
  ChatIcon,
  ErrorIcon,
  ExpandIcon,
  DocsIcon,
  FixmeIcon,
  FlagIcon,
  OptionsIcon,
  TipIcon,
  WarningIcon,
  WrenchIcon,
} from '@freesewing/react/components/Icon'
import { SubAccordion } from './Accordion.mjs'

/*
 * Helper object to look up flag icons
 */
const flagIcons = {
  error: ErrorIcon,
  expand: ExpandIcon,
  fixme: WrenchIcon,
  info: DocsIcon,
  note: ChatIcon,
  otions: OptionsIcon,
  tip: TipIcon,
  warning: WarningIcon,
}

export const FlagTypeIcon = ({ type, className = 'tw-w-6 tw-h-6' }) => {
  const Icon = flagIcons[type] || FixmeIcon

  return <Icon className={className} />
}

export const Flag = ({ data, handleUpdate }) => {
  const btnIcon = data.suggest?.icon ? (
    <FlagTypeIcon type={data.suggest.icon} className="tw-w-5 tw-h-6 sm:tw-w-6 tw-h-6" />
  ) : null

  const button =
    data.suggest?.text && data.suggest?.update ? (
      <button
        className={`tw-btn tw-btn-secondary tw-btn-outline tw-flex tw-flex-row tw-items-center ${
          btnIcon ? 'tw-gap-6' : ''
        }`}
        onClick={() => handleUpdate(data.suggest.update)}
      >
        {btnIcon}
        {data.suggest.text}
      </button>
    ) : null

  const desc = data.replace ? mustache.render(data.desc, data.replace) : data.desc
  const notes = data.notes
    ? Array.isArray(data.notes)
      ? '\n\n' +
        data.notes
          .map((note) => (data.replace ? mustache.render(note, data.replace) : note))
          .join('\n\n')
      : '\n\n' + (data.replace ? mustache.render(data.notes, data.replace) : data.notes)
    : null

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start">
      <div className="first:tw-mt-0 tw-grow md flag">
        <pre>{desc}</pre>
        <pre>{notes}</pre>
      </div>
      {button ? (
        <div className="tw-mt-2 tw-w-full tw-flex tw-flex-row tw-justify-end">{button}</div>
      ) : null}
    </div>
  )
}

export const FlagsAccordionTitle = ({ flags }) => {
  const flagList = flattenFlags(flags)

  if (Object.keys(flagList).length < 1) return null

  return (
    <>
      <h5 className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-between tw-w-full">
        <span className="tw-text-left">Flags ({Object.keys(flagList).length})</span>
        <FlagTypeIcon className="tw-w-8 tw-h-8" />
      </h5>
      <p className="tw-text-left">
        {Object.keys(flagList).length > 1
          ? 'Some issues about your current pattern need your attention.'
          : 'A specific issue about your current pattern needs your attention.'}
      </p>
    </>
  )
}

export const FlagsAccordionEntries = ({ flags, update }) => {
  const flagList = flattenFlags(flags)

  if (Object.keys(flagList).length < 1) return null

  const handleUpdate = (config) => {
    if (config.settings) update.settings(...config.settings)
    if (config.ui) update.ui(...config.settings)
  }

  return (
    <SubAccordion
      items={Object.entries(flagList).map(([key, flag], i) => {
        const title = flag.replace ? mustache.render(flag.title, flag.replace) : flag.title

        return [
          <div className="tw-w-full tw-flex tw-flex-row tw-gap2 tw-justify-between" key={i}>
            <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
              <div className="tw-no-shrink">
                <FlagIcon type={flag.type} />
              </div>
              <span className="tw-font-medium tw-text-left">{title}</span>
            </div>
            <span className="tw-uppercase tw-font-bold">{flag.type}</span>
          </div>,
          <Flag key={key} data={flag} handleUpdate={handleUpdate} />,
          key,
        ]
      })}
    />
  )
}
