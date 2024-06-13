import { useState, useEffect } from 'react'

export const MeasieVal = ({ val, m, imperial }) =>
  isDegreeMeasurement(m) ? (
    <span>{val}°</span>
  ) : (
    <span dangerouslySetInnerHTML={{ __html: formatMm(val, imperial) }}></span>
  )

export const UserSetPicker = ({
  Design,
  href,
  clickHandler,
  missingClickHandler,
  size = 'lg',
  components,
  hooks,
  methods,
  config,
}) => {
  // Components that can be swizzled
  const { Popout, Link, PlusIcon, MeasurementsSetCard } = components
  // Hooks that can be swizzled
  const { useBackend, useAccount } = hooks
  const backend = useBackend()
  const { control } = useAccount()
  // Methods that can be swizzled
  const { t, hasRequiredMeasurements } = methods

  // State
  const [sets, setSets] = useState({})

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) {
        const all = {}
        for (const set of result.data.sets) all[set.id] = set
        setSets(all)
      }
    }
    getSets()
  }, [backend])
  let hasSets = false
  const okSets = []
  const lackingSets = []
  if (Object.keys(sets).length > 0) {
    hasSets = true
    for (const setId in sets) {
      const [hasMeasies] = hasRequiredMeasurements(Design, sets[setId].measies)
      if (hasMeasies) okSets.push(sets[setId])
      else lackingSets.push(sets[setId])
    }
  }

  if (!hasSets)
    return (
      <div className="w-full max-w-3xl mx-auto">
        <Popout tip>
          <h5>{t('pe:noOwnSets')}</h5>
          <p className="">{t('pe:noOwnSetsMsg')}</p>
          {config.hrefNewSet ? (
            <a
              href={config.hrefNewSet}
              className="btn btn-accent capitalize"
              target="_BLANK"
              rel="nofollow"
            >
              {t('pe:newSet')}
            </a>
          ) : null}
          <p className="text-sm">{t('pe:pleaseMtm')}</p>
        </Popout>
      </div>
    )

  return (
    <>
      {okSets.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {okSets.map((set) => (
            <MeasurementsSetCard
              href={false}
              {...{ set, control, Design, methods, config }}
              onClick={clickHandler}
              href={href}
              key={set.id}
              size={size}
            />
          ))}
        </div>
      )}
      {lackingSets.length > 0 ? (
        <div className="my-4">
          <Popout note compact>
            {t('pe:someSetsLacking')}
          </Popout>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            {lackingSets.map((set) => (
              <MeasurementsSetCard
                href={false}
                {...{ set, control, Design }}
                onClick={missingClickHandler}
                href={href}
                key={set.id}
                size={size}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export const BookmarkedSetPicker = ({ design, clickHandler, t, size, href }) => {
  // Hooks
  const { control } = useAccount()
  const backend = useBackend()

  // State
  const [sets, setSets] = useState({})

  // Effects
  useEffect(() => {
    const getBookmarks = async () => {
      const result = await backend.getBookmarks()
      const loadedSets = {}
      if (result.success) {
        for (const bookmark of result.data.bookmarks.filter(
          (bookmark) => bookmark.type === 'set'
        )) {
          let set
          try {
            set = await backend.getSet(bookmark.url.slice(6))
            if (set.success) {
              const [hasMeasies] = hasRequiredMeasurements(
                designMeasurements[design],
                set.data.set.measies,
                true
              )
              loadedSets[set.data.set.id] = { ...set.data.set, hasMeasies }
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
      setSets(loadedSets)
    }
    getBookmarks()
  }, [])

  const okSets = Object.values(sets).filter((set) => set.hasMeasies)
  const lackingSets = Object.values(sets).filter((set) => !set.hasMeasies)

  return (
    <>
      {okSets.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {okSets.map((set) => (
            <MsetButton
              {...{ set, control, design }}
              onClick={clickHandler}
              href={href}
              requiredMeasies={designMeasurements[design]}
              key={set.id}
              size={size}
            />
          ))}
        </div>
      )}
      {lackingSets.length > 0 && (
        <div className="my-4">
          <Popout note compact>
            {t('pe:someSetsLacking')}
          </Popout>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            {lackingSets.map((set) => (
              <MsetLink
                {...{ set, control, design }}
                onClick={clickHandler}
                requiredMeasies={designMeasurements[design]}
                key={set.id}
                size={size}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const CuratedSetPicker = ({ href = false, clickHandler = false, published = true }) => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { i18n } = useTranslation(ns)
  const lang = i18n.language

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState(false)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      setLoadingStatus([true, 'contactingBackend'])
      const result = await backend.getCuratedSets()
      if (result.success) {
        const allSets = {}
        for (const set of result.data.curatedSets) {
          if (!published || set.published) allSets[set.id] = set
        }
        setSets(allSets)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    getSets()
  }, [])

  const lineupProps = {
    sets: orderBy(sets, 'height', 'asc'),
  }
  if (typeof href === 'function') lineupProps.href = href
  else lineupProps.onClick = clickHandler ? clickHandler : (set) => setSelected(set.id)

  return (
    <div className="max-w-7xl xl:pl-4">
      <SetLineup {...lineupProps} lang={lang} />
      {selected && <ShowCuratedSet cset={sets[selected]} />}
    </div>
  )
}
