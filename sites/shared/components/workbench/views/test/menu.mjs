import { Fragment } from 'react'
import { ns as optionsNs } from './options.mjs'
import { ns as measieNs } from './measurements.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import { useTranslation } from 'next-i18next'
import { nsMerge } from 'shared/utils.mjs'
import { OptionsIcon, MeasieIcon, CommunityIcon } from 'shared/components/icons.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'
import { V3Wip } from 'shared/components/v3-wip.mjs'

export const ns = nsMerge('workbench', optionsNs, measieNs)

const flattenOptions = (options, list = false, path = []) => {
  if (list === false) return flattenOptions(optionsMenuStructure(options), new Set())

  for (const [key, option] of Object.entries(options)) {
    if (key !== 'isGroup') {
      if (!option.isGroup) list.add({ key, option, path })
      else list = flattenOptions(option, list, [...path, key])
    }
  }

  return list
}

const spacer = <span className="px-2 opacity-50">/</span>

export const TestMenu = ({
  design,
  patternConfig,
  settings,
  update,
  //language,
  //account,
  //DynamicDocs,
}) => {
  const { t } = useTranslation(ns)

  const allOptions = flattenOptions(patternConfig.options)

  return (
    <Accordion
      items={[
        [
          <Fragment key={1}>
            <h5 className="flex flex-row gap-2 items-center justify-between w-full">
              <span>{t('workbench:testOptions')}</span>
              <OptionsIcon className="w-8 h-8" />
            </h5>
            <p>{t('workbench:testOptionsDesc')}</p>
          </Fragment>,
          <ListInput
            key={2}
            list={[...allOptions].map((option, i) => ({
              key: i,
              label: [
                ...option.path.map((p) => (
                  <>
                    <span>{t(`${p}.t`)}</span>
                    {spacer}
                  </>
                )),
                <span key={1}>{t(`${design}:${option.key}.t`)}</span>,
              ],
              val: option.key,
            }))}
            update={(value) => {
              if (value) update.settings(['sample'], { type: 'option', option: value })
              else update.settings(['sample'])
            }}
            current={settings?.sample?.option}
          />,
        ],
        [
          <Fragment key="a">
            <h5 className="flex flex-row gap-2 items-center justify-between w-full">
              <span>{t('workbench:testMeasurements')}</span>
              <MeasieIcon className="w-8 h-8" />
            </h5>
            <p>{t('workbench:testOptionsDesc')}</p>
          </Fragment>,
          <ListInput
            key="b"
            list={patternConfig.measurements.map((m) => ({
              label: t(m),
              val: m,
            }))}
            update={(value) => {
              if (value) update.settings(['sample'], { type: 'measurement', measurement: value })
              else update.settings(['sample'])
            }}
            current={settings?.sample?.measurement}
          />,
        ],
        [
          <Fragment key="a">
            <h5 className="flex flex-row gap-2 items-center justify-between w-full">
              <span>{t('workbench:testSets')}</span>
              <CommunityIcon className="w-8 h-8" />
            </h5>
            <p>{t('workbench:testSetsDesc')}</p>
          </Fragment>,
          <V3Wip key="b" />,
        ],
      ]}
    />
  )
}
