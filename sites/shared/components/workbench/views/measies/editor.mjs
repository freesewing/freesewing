import { MeasieInput, ns as inputNs } from 'shared/components/sets/measie-input.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['wbmeasies', ...inputNs]
const emptyFunc = () => {}

export const MeasiesEditor = ({ Design, settings, update }) => {
  const { t } = useTranslation(ns)
  const mset = { measies: settings.measurements, imperial: settings.units === 'imperial' }

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div>
      {Design.patternConfig.measurements.map((m) => (
        <MeasieInput
          {...{ t, m, mset, onUpdate, startLoading: emptyFunc, stopLoading: emptyFunc }}
          key={m}
        >
          <span className="label">{t(m)}</span>
        </MeasieInput>
      ))}
    </div>
  )
}
