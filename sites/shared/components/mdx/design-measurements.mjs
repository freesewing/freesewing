import { useTranslation } from 'next-i18next'
import { useDesign } from 'site/hooks/use-design.mjs'
import { PageLink } from 'shared/components/link.mjs'

export const ns = ['measurements', 'account']

export const DesignMeasurements = ({ design }) => {
  const { t } = useTranslation(ns)
  const Design = useDesign(design)
  const config = Design.patternConfig

  // Translate measurements
  const measies = { required: {}, optional: {} }
  if (config?.measurements) {
    for (const m of config.measurements) measies.required[m] = t(`measurements:${m}`)
  }
  if (config?.optionalMeasurements) {
    for (const m of config.optionalMeasurements) measies.optional[m] = t(`measurements:${m}`)
  }

  return (
    <>
      {Object.keys(measies.required).length > 0 ? (
        <>
          <h6 className="mt-4">{t('account:requiredMeasurements')}</h6>
          <ul className="list list-disc list-inside pl-2">
            {Object.keys(measies.required)
              .sort()
              .map((m) => (
                <li key={m}>
                  <PageLink
                    href={`/docs/measurements/${m.toLowerCase()}`}
                    txt={measies.required[m]}
                  />
                </li>
              ))}
          </ul>
        </>
      ) : null}

      {Object.keys(measies.optional).length > 0 ? (
        <>
          <h6 className="mt-4">{t('account:optionalMeasurements')}</h6>
          <ul className="list list-disc list-inside pl-2">
            {Object.keys(measies.optional)
              .sort()
              .map((m) => (
                <li key={m}>
                  <PageLink
                    href={`/docs/measurements/${m.toLowerCase()}`}
                    txt={measies.optional[m]}
                  />
                </li>
              ))}
          </ul>
        </>
      ) : null}
    </>
  )
}
