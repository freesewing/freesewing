//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { Fragment } from 'react'
import { ns as optionsNs } from './options.mjs'
import { ns as measieNs } from './measurements.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import { useTranslation } from 'next-i18next'
import { nsMerge } from 'shared/utils.mjs'
import { OptionsIcon, MeasieIcon } from 'shared/components/icons.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'

export const ns = nsMerge('workbench', optionsNs, measieNs)

const flattenOptions = (options, settings, list = false, path = []) => {
  if (list === false)
    return flattenOptions(optionsMenuStructure(options, settings), settings, new Set())

  for (const [key, option] of Object.entries(options)) {
    if (key !== 'isGroup') {
      if (!option.isGroup) list.add({ key, option, path })
      else list = flattenOptions(option, settings, list, [...path, key])
    }
  }

  return list
}

const spacer = <span className="px-2 opacity-50">/</span>

export const TestMenu = ({ design, patternConfig, settings, update }) => {
  const { t } = useTranslation(ns)

  const allOptions = flattenOptions(patternConfig.options, settings)
  const allMeasurements = patternConfig.measurements
    .concat(patternConfig.optionalMeasurements)
    .sort((a, b) => {
      const ta = t(`measurements:${a}`)
      const tb = t(`measurements:${b}`)
      if (ta < tb) return -1
      else if (ta > tb) return 1
      else return 0
    })

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
                    <span>{t([`${design}:${p}.t`, `workbench:${p}`])}</span>
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
          'testOptions',
        ],
        [
          <Fragment key="a">
            <h5 className="flex flex-row gap-2 items-center justify-between w-full">
              <span>{t('workbench:testMeasurements')}</span>
              <MeasieIcon className="w-8 h-8" />
            </h5>
            <p className="text-left">{t('workbench:testMeasurementsDesc')}</p>
          </Fragment>,
          <ListInput
            key="b"
            list={allMeasurements.map((m) => ({
              label: t(`measurements:${m}`),
              val: m,
            }))}
            update={(value) => {
              if (value) update.settings(['sample'], { type: 'measurement', measurement: value })
              else update.settings(['sample'])
            }}
            current={settings?.sample?.measurement}
          />,
          'testMeasurements',
        ],
        // FIXME: Implement this once v3 is ready
        //[
        //  <Fragment key="a">
        //    <h5 className="flex flex-row gap-2 items-center justify-between w-full">
        //      <span>{t('workbench:testSets')}</span>
        //      <CommunityIcon className="w-8 h-8" />
        //    </h5>
        //    <p>{t('workbench:testSetsDesc')}</p>
        //  </Fragment>,
        //  <V3Wip key="b" />,
        //  'testSets',
        //],
      ]}
    />
  )
}
