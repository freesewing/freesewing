
const PatternMeasurements = (props) => {
  return null
  const intl = useIntl()
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

  return (
    <ul className="links">
      {sortMeasurements(measurements[props.pattern]).map((m) => (
        <li key={m}>
          <Link to={'/docs/measurements/' + m.toLowerCase()}>
            <FormattedMessage id={'measurements.' + m} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PatternMeasurements
