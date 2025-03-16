import React from 'react'
import mustache from 'mustache'
import { flattenFlags, stripNamespace, bundlePatternTranslations } from '../lib/index.mjs'
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
import { MiniTip, MiniNote } from '@freesewing/react/components/Mini'
import Markdown from 'react-markdown'

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

export const Flag = ({ data, handleUpdate, strings }) => {
  const btnIcon = data.suggest?.icon ? (
    <FlagTypeIcon type={data.suggest.icon} className="tw-w-5 tw-h-6 sm:tw-w-6 tw-h-6" />
  ) : null

  const button =
    data.suggest?.text && data.suggest?.update ? (
      <button
        className={`tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline tw-flex tw-flex-row tw-items-center ${
          btnIcon ? 'tw-gap-6' : ''
        }`}
        onClick={() => handleUpdate(data.suggest.update)}
      >
        {btnIcon}
        {strings[data.suggest.text] || data.suggest.text}
      </button>
    ) : null

  const desc = data.replace
    ? mustache.render(strings[data.desc] || data.desc, data.replace)
    : strings[data.desc] || data.desc
  const notes = data.notes
    ? Array.isArray(data.notes)
      ? '\n\n' +
        data.notes
          .map((note) =>
            data.replace
              ? mustache.render(strings[note] || note, data.replace)
              : strings[note] || note
          )
          .join('\n\n')
      : '\n\n' +
        (data.replace
          ? mustache.render(strings[data.notes] || data.notes, data.replace)
          : strings[data.notes] || data.notes)
    : null

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start">
      <div className="first:tw-mt-0 tw-grow md flag tw-flex tw-flex-col tw-gap-2">
        {desc ? (
          <MiniTip>
            <Markdown>{strings[desc] || desc}</Markdown>
          </MiniTip>
        ) : null}
        {notes ? (
          <MiniNote>
            <Markdown>{strings[notes] || notes}</Markdown>
          </MiniNote>
        ) : null}
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

export const FlagsAccordionEntries = ({ flags, update, pattern, strings }) => {
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
              <span className="tw-font-medium tw-text-left">{strings[title] || title}</span>
            </div>
            <span className="tw-uppercase tw-font-bold">{flag.type}</span>
          </div>,
          <Flag key={key} data={flag} strings={strings} handleUpdate={handleUpdate} />,
          key,
        ]
      })}
    />
  )
}
