import { useState, useEffect } from 'react'
import orderBy from 'lodash.orderby'

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
  Swizzled,
}) => {
  // Swizzled components
  const { Popout, Link, PlusIcon, MeasurementsSetCard } = Swizzled.components
  // Swizzled hooks
  const { useBackend, useAccount } = Swizzled.hooks
  const backend = useBackend()
  // Swizzled methods
  const { t, hasRequiredMeasurements } = Swizzled.methods
  // Swizzled config
  const { config } = Swizzled

  // Local state
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
              {...{ set, Design, methods, config }}
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
                {...{ set, Design }}
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

export const BookmarkedSetPicker = ({
  Design,
  clickHandler,
  missingClickHandler,
  size = 'lg',
  Swizzled,
}) => {
  // Swizzled components
  const { Popout, Link, PlusIcon, MeasurementsSetCard } = Swizzled.components
  // Swizzled hooks
  const { useBackend, useAccount } = Swizzled.hooks
  const backend = useBackend()
  // Swizzled methods
  const { t, hasRequiredMeasurements } = Swizzled.methods
  // Swizzled config
  const { config } = Swizzled

  // Local state
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
              const [hasMeasies] = hasRequiredMeasurements(Design, set.data.set.measies)
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
            <MeasurementsSetCard
              href={false}
              {...{ set, Design, methods, config }}
              onClick={clickHandler}
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
              <MeasurementsSetCard
                href={false}
                {...{ set, Design }}
                onClick={missingClickHandler}
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

export const CuratedSetPicker = ({
  Design,
  clickHandler,
  missingClickHandler,
  size = 'lg',
  Swizzled,
  locale,
}) => {
  // Swizzled components
  const { CuratedMeasurementsSetLineup } = Swizzled.components
  // Swizzled hooks
  const { useBackend } = Swizzled.hooks
  const backend = useBackend()

  // Local state
  const [sets, setSets] = useState([])

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getCuratedSets()
      if (result.success) {
        const allSets = {}
        for (const set of result.data.curatedSets) {
          if (set.published) allSets[set.id] = set
        }
        setSets(allSets)
      }
    }
    getSets()
  }, [])

  return (
    <div className="max-w-7xl xl:pl-4">
      <CuratedMeasurementsSetLineup
        {...{ locale, clickHandler }}
        sets={orderBy(sets, 'height', 'asc')}
      />
    </div>
  )
}
