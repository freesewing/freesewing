import { Fragment, useEffect } from 'react'
import { horFlexClasses } from '../../utils.mjs'

const iconClasses = { className: 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0', stroke: 1.5 }

/**
 * The measurements view is loaded to update/set measurements
 *
 * It will be automatically loaded if we do not have all required measurements for a design.
 *
 * @param {Object} props - All the props
 * @param {Object} props.Swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {Function} props.Design - The design constructor
 * @param {string} props.design - The design name
 * @param {Object} props.state - The editor state object
 * @param {Object} props.update - Helper object for updating the ViewWrapper state
 * @param {Array} props.missingMeasurements - List of missing measurements for the current design
 * @return {Function} MeasurementsView - React component
 */
export const MeasurementsView = ({
  Design,
  design,
  missingMeasurements,
  update,
  Swizzled,
  state,
}) => {
  // Swizzled components
  const {
    Accordion,
    Popout,
    MeasurementsEditor,
    MeasurementsSetIcon,
    UserSetPicker,
    BookmarkIcon,
    BookmarkedSetPicker,
    CuratedMeasurementsSetIcon,
    CuratedSetPicker,
    EditIcon,
  } = Swizzled.components
  // Swizzled methods
  const { t, designMeasurements, capitalize } = Swizzled.methods
  // Swizzled config
  const { config } = Swizzled
  // Editor state
  const { locale } = state

  /*
   * If there is no view set, completing measurements will switch to the view picker
   * Which is a bit confusing. So in this case, set the view to measurements.
   */
  useEffect(() => {
    if (!config.views.includes(state.view)) update.view('measurements')
  }, [state.view])

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    // Save the measurement set name to pattern settings
    if (set[`name${capitalize(locale)}`])
      // Curated measurement set
      update.settings([[['metadata'], { setName: set[`name${capitalize(locale)}`] }]])
    else if (set?.name)
      // User measurement set
      update.settings([[['metadata'], { setName: set.name }]])
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
  if (config.enableBackend)
    items.push(
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h5 id="ownsets">{t('pe:chooseFromOwnSets')}</h5>
            <MeasurementsSetIcon {...iconClasses} />
          </div>
          <p className="text-left">{t('pe:chooseFromOwnSetsDesc')}</p>
        </Fragment>,
        <UserSetPicker
          key={2}
          size="md"
          clickHandler={loadMeasurements}
          missingClickHandler={loadMeasurements}
          {...{ Swizzled, Design }}
        />,
        'ownSets',
      ],
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h5 id="bookmarkedsets">{t('pe:chooseFromBookmarkedSets')}</h5>
            <BookmarkIcon {...iconClasses} />
          </div>
          <p className="text-left">{t('pe:chooseFromBookmarkedSetsDesc')}</p>
        </Fragment>,
        <BookmarkedSetPicker
          key={2}
          size="md"
          clickHandler={loadMeasurements}
          missingClickHandler={loadMeasurements}
          {...{ Swizzled, Design }}
        />,
        'bmSets',
      ],
      [
        <Fragment key={1}>
          <div className={horFlexClasses}>
            <h5 id="curatedsets">{t('pe:chooseFromCuratedSets')}</h5>
            <CuratedMeasurementsSetIcon {...iconClasses} />
          </div>
          <p className="text-left">{t('pe:chooseFromCuratedSetsDesc')}</p>
        </Fragment>,
        <CuratedSetPicker
          key={2}
          clickHandler={loadMeasurements}
          {...{ Swizzled, Design, locale }}
        />,
        'csets',
      ]
    )
  // Manual editing is always an option
  items.push([
    <Fragment key={1}>
      <div className={horFlexClasses}>
        <h5 id="editmeasurements">{t('pe:editMeasurements')}</h5>
        <EditIcon {...iconClasses} />
      </div>
      <p className="text-left">{t('pe:editMeasurementsDesc')}</p>
    </Fragment>,
    <MeasurementsEditor key={2} {...{ Design, Swizzled, update, state }} />,
    'edit',
  ])

  return (
    <div className="max-w-7xl mt-8 mx-auto px-4">
      <h2>{t('pe:measurements')}</h2>
      {missingMeasurements && missingMeasurements.length > 0 ? (
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
      ) : (
        <Popout tip dense noP>
          <h5>{t('pe:measurementsAreOk')}</h5>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            <button className="btn btn-primary lg:btn-lg" onClick={() => update.view('draft')}>
              {t('pe:view.draft.t')}
            </button>
            <button
              className="btn btn-primary btn-outline lg:btn-lg"
              onClick={() => update.view('picker')}
            >
              {t('pe:chooseAnotherActivity')}
            </button>
          </div>
        </Popout>
      )}
      {items.length > 1 ? <Accordion items={items} /> : items}
    </div>
  )
}
