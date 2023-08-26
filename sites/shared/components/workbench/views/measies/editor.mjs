import { nsMerge } from 'shared/utils.mjs'
import { MeasieInput, ns as inputNs } from 'shared/components/inputs.mjs'
import { useTranslation } from 'next-i18next'
import { DynamicOrgDocs } from 'shared/components/dynamic-docs/org.mjs'

export const ns = nsMerge('workbench', inputNs)

export const MeasiesEditor = ({ Design, settings, update }) => {
  const { t, i18n } = useTranslation(ns)
  const mset = { measies: settings.measurements, imperial: settings.units === 'imperial' }

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2>{t('editCurrentMeasiesHeader')}</h2>
      <p>{t('editCurrentMeasiesDesc')}</p>
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
