//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { nsMerge } from 'shared/utils.mjs'
import { MeasieInput, ns as inputNs } from 'shared/components/inputs.mjs'
import { useTranslation } from 'next-i18next'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

export const ns = nsMerge('workbench', inputNs)

export const MeasiesEditor = ({ Design, settings, update }) => {
  const { i18n } = useTranslation(ns)

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {Design.patternConfig.measurements.map((m) => (
        <MeasieInput
          key={m}
          m={m}
          imperial={settings.units === 'umperial' ? true : false}
          original={settings.measurements?.[m]}
          update={(m, newVal) => onUpdate(m, newVal)}
          id={`edit-${m}`}
          docs={
            <DynamicMdx language={i18n.language} slug={`docs/measurements/${m.toLowerCase()}`} />
          }
        />
      ))}
    </div>
  )
}
