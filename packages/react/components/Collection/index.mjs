// Dependencies
import { atomWithHash } from 'jotai-location'
import {
  about,
  collection,
  tags,
  techniques,
  designers,
  developers,
  examples,
} from '@freesewing/collection'
import { mutateObject } from '@freesewing/utils'

//import { urls } from '@freesewing/config'
//import { measurements as measurementTranslations } from '@freesewing/i18n'
//import { measurements as designMeasurements } from '@freesewing/collection'

// Context
//import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useContext } from 'react'
//import { useAccount } from '@freesewing/react/hooks/useAccount'
//import { useBackend } from '@freesewing/react/hooks/useBackend'
import { useAtom } from 'jotai'

// Components
import { Link as WebLink, AnchorLink } from '@freesewing/react/components/Link'
import {
  CircleIcon,
  CisFemaleIcon,
  FilterIcon,
  ResetIcon,
  ShowcaseIcon,
} from '@freesewing/react/components/Icon'
import { lineDrawingsFront as lineDrawings } from '@freesewing/react/components/LineDrawing'

/*
import { designs, tags, techniques } from 'shared/config/designs.mjs'
import { DesignCard, DesignLink, ns as designNs } from 'shared/components/designs/design.mjs'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { FilterIcon, ShowcaseIcon, CisFemaleIcon, ResetIcon } from 'shared/components/icons.mjs'
import { capitalize, objUpdate } from 'shared/utils.mjs'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { collection } from 'site/hooks/use-design.mjs'

export const ns = designNs
*/
const filterAtom = atomWithHash('filter', { example: true })

export const useFilter = () => {
  return useAtom(filterAtom)
}
/**
 * React component to show the FreeSewing collection and pick a design
 *
 * @param {object} props - All React props
 * @param {function} Link - An optional framework specific Link component for client-side routing
 */
export const Collection = ({ Link = false, linkTo = 'about' }) => {
  if (!Link) Link = WebLink

  // State
  const [filter, setFilter] = useFilter()
  const [showFilters, setShowFilters] = useState(false)
  console.log(tags)

  /*
   * Apply filter
   */
  const filtered = {}
  for (const d of collection) {
    let skip = false
    if (
      filter.tag &&
      filter.tag.filter((tag) => about[d].tags.includes(tag)).length < filter.tag.length
    )
      skip = true
    if (
      filter.tech &&
      filter.tech.filter((tech) => about[d].techniques.includes(tech)).length < filter.tech.length
    )
      skip = true
    if (filter.difficulty && filter.difficulty !== about[d].difficulty) skip = true
    if (!skip) filtered[d] = d
  }

  const updateFilter = (path, val) => {
    // Allow clicking the same difficulty to remove it as a filter
    if (path === 'difficulty' && val === filter.difficulty) val = 'unset'
    const newFilter = mutateObject({ ...filter }, path, val)
    setFilter(newFilter)
  }

  const toggle = (type, val) => {
    const current = filter[type] || []
    const newSet = new Set(current)
    if (newSet.has(val)) newSet.delete(val)
    else newSet.add(val)
    updateFilter(type, [...newSet])
  }

  return (
    <>
      <div className="tw-max-w-7xl tw-m-auto">
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-justify-center tw-font-medium tw-mb-2">
          {Object.keys(filtered)
            .sort()
            .map((d) => (
              <Link
                key={d}
                href={linkBuilders[linkTo](d)}
                className="tw-text-secondary tw-decoration-2 tw-underline tw-capitalize hover:tw-decoration-4 hover:tw-text-secondary"
              >
                {d}
              </Link>
            ))}
        </div>
        {showFilters ? (
          <>
            <h6 className="tw-text-center tw-mb-0 tw-mt-4">
              Filters ({Object.keys(filtered).length}/{collection.length})
            </h6>
            <div className="tw-flex tw-flex-row tw-gap-1 tw-items-center tw-justify-center tw-flex-wrap tw-my-2">
              <b>Tags:</b>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`tw-daisy-badge tw-font-medium hover:tw-shadow hover:tw-cursor-pointer
                  ${
                    filter?.tag && Array.isArray(filter.tag) && filter.tag.includes(tag)
                      ? 'tw-daisy-badge-success hover:tw-daisy-badge-error'
                      : 'tw-daisy-badge-primary hover:tw-daisy-badge-success'
                  }`}
                  onClick={() => toggle('tag', tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="tw-flex tw-flex-row tw-gap-1 tw-items-center tw-justify-center tw-flex-wrap tw-my-4">
              <b>Techniques</b>
              {techniques.sort().map((tech) => (
                <button
                  key={tech}
                  className={`tw-daisy-badge tw-font-medium hover:tw-shadow
                 ${
                   filter?.tech && Array.isArray(filter.tech) && filter.tech.includes(tech)
                     ? 'tw-daisy-badge tw-daisy-badge-success hover:tw-daisy-badge-error'
                     : 'tw-daisy-badge tw-daisy-badge-accent hover:tw-daisy-badge-success'
                 }`}
                  onClick={() => toggle('tech', tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-center tw-flex-wrap tw-my-4">
              <b>Difficulty:</b>
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  onClick={() => updateFilter('difficulty', score)}
                  key={score}
                  className={`tw-daisy-btn tw-daisy-btn-sm ${
                    filter.difficulty === score
                      ? 'tw-daisy-btn-secondary tw-daisy-btn-outline'
                      : 'tw-daisy-btn-ghost'
                  }`}
                >
                  <Difficulty score={score} />
                </button>
              ))}
            </div>
            <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-flex-wrap tw-my-2">
              <button
                className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline"
                onClick={() => updateFilter('example', !filter.example)}
              >
                {filter.example ? <CisFemaleIcon /> : <ShowcaseIcon />}
                {filter.example ? 'Show Line Drawings' : 'Show Examples'}
              </button>
              <button
                className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline"
                onClick={() => setFilter({ example: 1 })}
              >
                <ResetIcon />
                Clear Filter
              </button>
              <button
                className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline"
                onClick={() => setShowFilters(false)}
              >
                <FilterIcon />
                Hide Filters
              </button>
            </div>
          </>
        ) : (
          <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-flex-wrap tw-my-2">
            <button
              className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline"
              onClick={() => updateFilter('example', !filter.example)}
            >
              {filter.example ? <CisFemaleIcon /> : <ShowcaseIcon />}
              {filter.example ? 'Show Line Drawings' : 'Show Examples'}
            </button>
            <button
              className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline"
              onClick={() => setShowFilters(true)}
            >
              <FilterIcon />
              Show Filters
            </button>
          </div>
        )}
      </div>
      <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-4 tw-justify-center sm:tw-grid-cols-3 md:tw-grid-cols-4 tw-mb-8">
        {Object.keys(filtered)
          .sort()
          .map((d) => (
            <DesignCard
              name={d}
              key={d}
              linkTo={linkTo}
              lineDrawing={filter.example ? false : true}
            />
          ))}
      </div>
    </>
  )
}

/*
 * A helper component to show a design technique
 *
 * @param {object} props - All React props
 * @param {function} props.Link - A Link component, typically specific to the framework for client-side routing
 * @param {string} props.technique - The technique name/id
 */
const Technique = ({ Link = WebLink, technique }) => (
  <Link
    href={`/designs/techniques/${technique}`}
    className="tw-daisy-badge tw-daisy-badge-accent hover:tw-daisy-badge-secondary hover:tw-shadow tw-font-medium"
  >
    {technique}
  </Link>
)

/*
 * A helper component to show a design tag
 *
 * @param {object} props - All React props
 * @param {function} props.Link - A Link component, typically specific to the framework for client-side routing
 * @param {string} props.tag - The tag name/id
 */
const Tag = ({ Link = WebLink, technique }) => (
  <Link
    href={`/designs/tags/${tag}`}
    className="tw-daisy-badge tw-daisy-badge-primary hover:tw-daisy-badge-secondary hover:tw-shadow tw-font-medium"
  >
    {tag}
  </Link>
)

const DesignCard = ({ name, lineDrawing = false, linkTo, Link }) => {
  if (!Link) Link = WebLink

  const LineDrawing =
    lineDrawing && lineDrawings[name]
      ? lineDrawings[name]
      : ({ className }) => <div className={className}></div>
  const exampleImageUrl = examples.href[name] ? examples.href[name] : noExample
  const bg = { aspectRatio: '1/1.4' }
  if (!lineDrawing) {
    bg.backgroundImage = `url(${exampleImageUrl}`
    bg.backgroundSize = 'cover'
    bg.backgroundPosition = 'center center'
  }

  return (
    <Link href={linkTo === 'new' ? `/-/` : `/designs/${name}/`}>
      <div
        className={`tw-flex tw-flex-col tw-flex-nowrap tw-items-start tw-justify-between tw-gap-2 tw-border-neutral-500
        tw-w-full tw-h-full tw-border tw-border-2 tw-border-solid tw-p-0 tw-relative tw-rounded-lg tw-rounded-lg`}
        style={bg}
      >
        <h5
          className={`tw-text-center tw-py-2 tw-px-4 tw-rounded-t tw-m-0 tw-w-full
        ${lineDrawing ? '' : 'tw-bg-neutral tw-text-neutral-content tw-bg-opacity-70'}`}
        >
          {about[name].name}
        </h5>
        {lineDrawing ? (
          <div className="tw-p-1 tw-grow tw-w-full tw-h-auto tw-square tw-text-center">
            <LineDrawing className="tw-max-w-full tw-m-auto tw-my-4 tw-text-base-content" />
          </div>
        ) : (
          <span />
        )}
        <div
          className={`tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-1 tw-px-2 tw-rounded-b tw-m-0 tw-w-full
        ${lineDrawing ? '' : `tw-text-neutral-content`}`}
        >
          <Difficulty score={about[name].difficulty} />
        </div>
      </div>
    </Link>
  )
}

/*
 * A helper component to show difficulety of a design
 *
 * @param {object} props - All React props
 * @param {number} props.score - The difficulty score of the design (1-5)
 */
const Difficulty = ({ score = 0 }) => (
  <div className="tw-flex tw-flex-row">
    {[0, 1, 2, 3, 4].map((i) => (
      <CircleIcon fill={i < score ? true : false} className={`tw-w-4 tw-h-4`} />
    ))}
  </div>
)

const linkBuilders = {
  new: (design) => `/-/?d=${design.toLowerCase()}`,
  docs: (design) => `/docs/designs/${design.toLowerCase()}/`,
  about: (design) => `/designs/${design.toLowerCase()}/`,
}

const noExample =
  'https://images.pexels.com/photos/5626595/pexels-photo-5626595.jpeg?cs=srgb&fm=jpg&w=640&h=427'
