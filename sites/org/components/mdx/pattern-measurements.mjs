import { configs } from 'shared/designs/index.js'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import { PageLink } from 'shared/components/link.js'

const PatternMeasurements = ({ pattern, before = null, after = null }) => {
  const { t } = useTranslation(['measurements'])

  const measurements = {}
  for (const m of configs[pattern].measurements) {
    measurements[m] = {
      title: t(`measurements.${m}`),
      required: true,
    }
  }
  for (const m of configs[pattern].measurements || []) {
    measurements[m] = {
      name: m,
      title: t(`measurements:${m}`),
      required: false,
    }
  }

  // Not all patterns require measurements
  if (Object.keys(measurements).length < 1) return null

  return (
    <div>
      {before}
      <ol className="list-inside ml-8 my-4">
        {orderBy(measurements, ['title'], ['asc']).map((m) => (
          <li key={m.name}>
            <PageLink href={'/docs/measurements/' + m.name.toLowerCase()} txt={m.title} />
          </li>
        ))}
      </ol>
      {after}
    </div>
  )
}

export default PatternMeasurements
