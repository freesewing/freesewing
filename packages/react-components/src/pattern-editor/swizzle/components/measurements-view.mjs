import { Fragment } from 'react'
import { horFlexClasses } from '../../utils.mjs'

const iconClasses = { className: 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0', stroke: 1.5 }

/**
 * The measurements view is loaded to update/set measurements
 *
 * It will be automatically loaded if we do not have all required measurements for a design.
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.components - The possibly swizzled components
 * @param {object} props.methods - The possibly swizzled methods
 * @param {function} props.methods.t - The translation method
 * @param {object} props.config - The possibly swizzled pattern editor configuration
 * @return {function} MeasurementsView - React component
 */
export const MeasurementsView = (props) => {
  // Passed down regular props
  const { Design, missingMeasurements, update } = props
  // Passed down components
  const {
    Accordion,
    Popout,
    MeasurementsEditor,
    MeasurementsSetIcon,
    UserSetPicker,
    BookmarkIcon,
    BookmarkedSetPicker,
    EditIcon,
  } = props.components
  // Passed down methods
  const { t, designMeasurements, capitalize } = props.methods
  // Passed down hooks
  const { useBackend, useAccount } = props.hooks
  // Passed down ViewWrapper state
  const { settings } = props.state

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    // Save the measurement set name to pattern settings
    if (set[`name${capitalize(props.locale)}`])
      // Curated measurement set
      update.settings([[['metadata'], { setName: set[`name${capitalize(lang)}`] }]])
    else if (set?.name)
      // User measurement set
      update.settings([[['metadata'], { setName: set.name }]])
    //setView('draft')
  }

  const loadMissingMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    //setView('measurements')
  }

  // Construct accordion items based on the editor configuration
  const items = []
  if (props.config.enableBackend)
    items.push([
      <Fragment key={1}>
        <div className={horFlexClasses}>
          <h5 id="ownsets">{t('pe:chooseFromOwnSets')}</h5>
          <MeasurementsSetIcon {...iconClasses} />
        </div>
        <p className="text-left">{t('pe:chooseFromOwnSetsDesc')}</p>
      </Fragment>,
      <UserSetPicker
        key={2}
        Design={Design}
        clickHandler={loadMeasurements}
        missingClickHandler={loadMeasurements}
        t={t}
        size="md"
        hooks={props.hooks}
        components={props.components}
        config={props.config}
      />,
      'ownSets',
    ])
  // Manual editing is always an option
  items.push([
    <Fragment key={1}>
      <div className={horFlexClasses}>
        <h5 id="editmeasurements">{t('pe:editMeasurements')}</h5>
        <EditIcon {...iconClasses} />
      </div>
      <p className="text-left">{t('pe:editMeasurementsDesc')}</p>
    </Fragment>,
    <MeasurementsEditor
      key={2}
      Design={Design}
      update={props.update}
      state={props.state}
      methods={props.methods}
    />,
  ])

  return (
    <div className="max-w-7xl mt-8 mx-auto px-4">
      <h2>{t('pe:measurements')}</h2>
      {missingMeasurements && (
        <Popout note dense noP>
          <h5>{t('pe:missingMeasurementsInfo')}:</h5>
          <ol className="list list-inside flex flex-row flex-wrap">
            {missingMeasurements.map((m, i) => (
              <li key={i}>
                {i > 0 ? <span className="pr-2">,</span> : null}
                <span className="font-medium">{t(`measurements:${m}`)}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm m-0 p-0 pt-2">
            ({missingMeasurements.length} {t('pe:missingMeasurements')})
          </p>
        </Popout>
      )}
      {!missingMeasurements && (
        <Popout note ompact>
          <span className="text-lg">{t('pe:measurementsAreOk')}</span>
          <pre>{JSON.stringify(typeof missingMeasurements, null, 2)}</pre>
          test
        </Popout>
      )}
      {items.length > 1 ? <Accordion items={items} /> : items}
    </div>
  )
}

/*
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="bookmarkedsets">{t('workbench:chooseFromBookmarkedSets')}</h5>
                <BookmarkIcon {...iconClasses} />
              </div>
              <p>{t('workbench:chooseFromBookmarkedSetsDesc')}</p>
            </Fragment>,
            <BookmarkedSetPicker
              Design={Design}
              clickHandler={loadMeasurements}
              t={t}
              size="md"
              key={2}
            />,
            'bmSets',
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="curatedsets">{t('workbench:chooseFromCuratedSets')}</h5>
                <CsetIcon {...iconClasses} />
              </div>
              <p>{t('workbench:chooseFromCuratedSetsDesc')}</p>
            </Fragment>,
            <CuratedSetPicker design={design} clickHandler={loadMeasurements} t={t} key={2} />,
            'csets',
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="editmeasies">{t('workbench:editMeasiesByHand')}</h5>
                <EditIcon {...iconClasses} />
              </div>
              <p>{t('workbench:editMeasiesByHandDesc')}</p>
            </Fragment>,
            <MeasiesEditor {...{ Design, settings, update }} key={2} />,
            'editor',
          ],

*/
