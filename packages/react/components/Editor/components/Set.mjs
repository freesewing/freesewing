// Dependencies
import { capitalize, cloudflareImageUrl, hasRequiredMeasurements, orderBy } from '@freesewing/utils'
// Hooks
import React, { useState, useEffect } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Popout } from '@freesewing/react/components/Popout'
import { MsetCard } from '@freesewing/react/components/Account'

export const UserSetPicker = ({
  Design,
  clickHandler,
  missingClickHandler,
  size = 'lg',
  config,
}) => {
  // Hooks
  const backend = useBackend()

  // State (local)
  const [sets, setSets] = useState({})

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const [status, body] = await backend.getSets()
      if (status === 200 && body.result === 'success') {
        const all = {}
        for (const set of body.sets) all[set.id] = set
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
      <div className="tw-w-full tw-max-w-3xl tw-mx-auto">
        <Popout tip>
          <h5> You do not (yet) have any of your own measurements sets</h5>
          <p>
            You can store your measurements as a measurements set, after which you can generate as
            many patterns as you want for them.
          </p>
          {config.hrefNewSet ? (
            <a
              href={config.hrefNewSet}
              className="tw-daisy-btn tw-daisy-btn-accent tw-capitalize"
              target="_BLANK"
              rel="nofollow"
            >
              Create a new measurements set
            </a>
          ) : null}
          <p className="tw-text-sm">
            Because our patterns are bespoke, we strongly suggest you take accurate measurements.
          </p>
        </Popout>
      </div>
    )

  return (
    <>
      {okSets.length > 0 && (
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
          {okSets.map((set) => (
            <MsetCard
              href={false}
              design={Design.designConfig.data.id}
              {...{ set, Design, config }}
              onClick={clickHandler}
              key={set.id}
              size={size}
            />
          ))}
        </div>
      )}
      {lackingSets.length > 0 ? (
        <div className="tw-my-4">
          <Popout note>
            <h5>
              Some of your measurements sets lack the measurements required to generate this pattern
            </h5>
          </Popout>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-2">
            {lackingSets.map((set) => (
              <MsetCard
                {...{ set, Design }}
                design={Design.designConfig.data.id}
                onClick={missingClickHandler}
                href={false}
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
  config,
  clickHandler,
  missingClickHandler,
  size = 'lg',
}) => {
  // Hooks
  const backend = useBackend()

  // State (local)
  const [sets, setSets] = useState({})

  // Effects
  useEffect(() => {
    const getBookmarks = async () => {
      const [status, body] = await backend.getBookmarks()
      const loadedSets = {}
      if (status === 200 && body.result === 'success') {
        for (const bookmark of body.bookmarks.filter((bookmark) => bookmark.type === 'set')) {
          let set
          try {
            const [status, body] = await backend.getSet(bookmark.url.slice(6))
            if (status === 200 && body.result === 'success') {
              const [hasMeasies] = hasRequiredMeasurements(Design, body.set.measies)
              loadedSets[body.set.id] = { ...body.set, hasMeasies }
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
        <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-2">
          {okSets.map((set) => (
            <MsetCard
              href={false}
              {...{ set, Design, config }}
              design={Design.designConfig.data.id}
              onClick={clickHandler}
              key={set.id}
              size={size}
            />
          ))}
        </div>
      )}
      {lackingSets.length > 0 && (
        <div className="tw-my-4">
          <Popout note>
            <h5>
              Some of these measurements sets lack the measurements required to generate this
              pattern
            </h5>
          </Popout>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-2">
            {lackingSets.map((set) => (
              <MsetCard
                href={false}
                {...{ set, Design }}
                design={Design.designConfig.data.id}
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

export const CuratedSetPicker = ({ clickHandler }) => {
  // Hooks
  const backend = useBackend()

  // State (local)
  const [sets, setSets] = useState([])

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const [status, body] = await backend.getCuratedSets()
      if (status === 200 && body.result === 'success') {
        const allSets = {}
        for (const set of body.curatedSets) {
          if (set.published) allSets[set.id] = set
        }
        setSets(allSets)
      }
    }
    getSets()
  }, [])

  return (
    <div className="tw-max-w-7xl">
      <CuratedMeasurementsSetLineup
        clickHandler={clickHandler}
        sets={orderBy(sets, 'height', 'asc')}
      />
    </div>
  )
}

export const CuratedMeasurementsSetLineup = ({ sets = [], clickHandler }) => (
  <div
    className={`tw-w-full tw-flex tw-flex-row ${
      sets.length > 1 ? 'tw-justify-start tw-px-8' : 'tw-justify-center'
    } tw-overflow-x-scroll`}
    style={{
      backgroundImage: `url(/img/lineup-backdrop.svg)`,
      width: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
    }}
  >
    {sets.map((set) => {
      const props = {
        className:
          'tw-aspect-[1/3] tw-w-auto tw-h-96 tw-bg-transparent tw-border-0 hover:tw-cursor-pointer tw-grayscale hover:tw-grayscale-0',
        style: {
          backgroundImage: `url(${cloudflareImageUrl({
            id: `cset-${set.id}`,
            type: 'lineup',
          })})`,
          width: 'auto',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        onClick: () => clickHandler(set),
      }

      return (
        <div className="tw-flex tw-flex-col tw-items-center" key={set.id}>
          <button {...props} key={set.id}></button>
          <b>{set.nameEn}</b>
        </div>
      )
    })}
  </div>
)
