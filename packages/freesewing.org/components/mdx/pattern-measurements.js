import { configs } from 'shared/designs/index.js'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import PageLink from 'shared/components/page-link.js'

const PatternMeasurements = (props) => {
  const { t } = useTranslation(['measurements'])

  const sortMeasurements = (measurements) => {
    if (typeof measurements === 'undefined') return []
    let sorted = []
    let translated = {}
    for (let m of measurements) {
      let translation = intl.messages['measurements.' + m] || m
      translated[translation] = m
    }
    let order = Object.keys(translated)
    order.sort()
    for (let m of order) sorted.push(translated[m])

    return sorted
  }

  const measurements = {}
  for (const m of configs[props.pattern].measurements) {
    measurements[m] = {
      title: t(`measurements.${m}`),
      required: true
    }
  }
  for (const m of configs[props.pattern].measurements || []) {
    measurements[m] = {
      name: m,
      title: t(`measurements:${m}`),
      required: false
    }
  }


  return (
    <ol className="list-inside ml-8 my-4">
      {orderBy(measurements, ['title'], ['asc']).map(m => (
        <li key={m.name}>
          <PageLink href={'/docs/measurements/' + m.name.toLowerCase()} txt={m.title} />
        </li>
      ))}
    </ol>
  )
}

export default PatternMeasurements
