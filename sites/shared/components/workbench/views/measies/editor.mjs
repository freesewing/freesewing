import { nsMerge } from 'shared/utils.mjs'
import { MeasieInput, ns as inputNs } from 'shared/components/inputs.mjs'
import { useTranslation } from 'next-i18next'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

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
          update={(val) => onUpdate(m, val)}
          docs={<DynamicOrgDocs language={i18n.language} path={`measurements/${m}`} />}
          id={`edit-${m}`}
        />
      ))}
    </div>
  )
}
