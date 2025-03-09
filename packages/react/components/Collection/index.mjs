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
  measurements,
  requiredMeasurements,
  optionalMeasurements,
} from '@freesewing/collection'
import { capitalize, linkClasses, mutateObject } from '@freesewing/utils'
import { measurements as measurementsTranslations } from '@freesewing/i18n'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useContext, Fragment } from 'react'
import { useAtom } from 'jotai'

// Components
import { Link as WebLink, AnchorLink } from '@freesewing/react/components/Link'
import {
  CircleIcon,
  CisFemaleIcon,
  DocsIcon,
  FilterIcon,
  HeartIcon,
  NewPatternIcon,
  ResetIcon,
  ShowcaseIcon,
} from '@freesewing/react/components/Icon'
import {
  lineDrawingsFront as lineDrawings,
  lineDrawingsBack,
} from '@freesewing/react/components/LineDrawing'
import { IconButton } from '@freesewing/react/components/Button'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { KeyVal } from '@freesewing/react/components/KeyVal'

const filterAtom = atomWithHash('filter', { example: true })

export const useFilter = () => {
  return useAtom(filterAtom)
}

/**
 * React component to show the FreeSewing collection and pick a design
 *
 * @param {object} props - All React props
 * @param {function} Link - An optional framework specific Link component for client-side routing
 * @param {bool} editor - Set this to when loaded in the editor (this will make the display more dense)
 * @param {bool} onClick - Set this to trigger an onClick event, rather than using links
 */
export const Collection = ({ Link = false, linkTo = 'about', editor = false, onClick = false }) => {
  if (!Link) Link = WebLink

  // State
  const [filter, setFilter] = useFilter()
  const [showFilters, setShowFilters] = useState(false)

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
            .map((d) =>
              onClick ? (
                <button
                  key={d}
                  onClick={() => onClick(d)}
                  className="tw-text-secondary tw-decoration-2 tw-underline tw-capitalize hover:tw-decoration-4 hover:tw-text-secondary tw-bg-transparent tw-border-0 tw-font-medium tw-p-0 tw-text-base hover:tw-cursor-pointer"
                >
                  {d}
                </button>
              ) : (
                <Link
                  key={d}
                  href={linkBuilders[linkTo](d)}
                  className="tw-text-secondary tw-decoration-2 tw-underline tw-capitalize hover:tw-decoration-4 hover:tw-text-secondary"
                >
                  {d}
                </Link>
              )
            )}
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
      <div
        className={`tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-4 tw-justify-center sm:tw-grid-cols-3 md:tw-grid-cols-4 ${editor ? 'lg:tw-grid-cols-6 2xl:tw-grid-cols-12' : ''} tw-mb-8`}
      >
        {Object.keys(filtered)
          .sort()
          .map((d) => (
            <DesignCard
              name={d}
              key={d}
              linkTo={linkTo}
              onClick={onClick}
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

const DesignCard = ({ name, lineDrawing = false, linkTo, Link, onClick }) => {
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

  const inner = (
    <div
      className={`tw-flex tw-flex-col tw-flex-nowrap tw-items-start tw-justify-between tw-gap-2 tw-border-neutral-500 group-hover:tw-border-secondary
      tw-w-full tw-h-full tw-border tw-border-2 tw-border-solid tw-p-0 tw-relative tw-rounded-lg tw-rounded-lg`}
      style={bg}
    >
      <h5
        className={`tw-text-center tw-py-2 tw-px-4 tw-rounded-t tw-m-0 tw-w-full group-hover:tw-no-underline group-hover:tw-bg-secondary group-hover:tw-bg-opacity-70
      ${lineDrawing ? '' : 'tw-bg-neutral tw-text-neutral-content tw-bg-opacity-80'}`}
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
        <Difficulty score={about[name].difficulty} className="group-hover:tw-text-secondary" />
      </div>
    </div>
  )

  return onClick ? (
    <button
      onClick={() => onClick(name)}
      className="hover:tw-bg-secondary hover:tw-bg-opacity-10 tw-rounded-lg tw-group hover:tw-no-underline tw-bg-transparent tw-border-0 hover:tw-cursor-pointer tw-p-0"
      title={about[name].description}
    >
      {inner}
    </button>
  ) : (
    <Link
      href={linkTo === 'new' ? `/-/` : `/designs/${name}/`}
      className="hover:tw-bg-secondary hover:tw-bg-opacity-10 tw-rounded-lg tw-group hover:tw-no-underline"
      title={about[name].description}
    >
      {inner}
    </Link>
  )
}

/*
 * A helper component to show difficulety of a design
 *
 * @param {object} props - All React props
 * @param {number} props.score - The difficulty score of the design (1-5)
 */
const Difficulty = ({ score = 0, className = '' }) => (
  <div className={`tw-flex tw-flex-row tw-items-center ${className}`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <CircleIcon key={i} fill={i < score ? true : false} className={`tw-w-4 tw-h-4`} />
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

/**
 * React component to show info about a FreeSewing design
 *
 * @param {object} props - All React props
 * @param {string} design - The name/id of the design
 * @param {function} Link - An optional framework specific Link component for client-side routing
 */
export const DesignInfo = ({ Link = false, design = false, noDocsLink = false }) => {
  if (!Link) Link = WebLink

  // State
  const [back, setBack] = useState(false)

  // Context
  const { setModal, clearModal } = useContext(ModalContext)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  if (!design) return null
  if (['teagan', 'trayvon'].includes(design))
    return (
      <p>
        We are not rendering the design info for {design} because of a bug we are still working on.
      </p>
    )

  // Line drawings
  const LineDrawing = lineDrawings[design] || []
  const LineDrawingBack = lineDrawingsBack[design] || []
  const hasBack = !Array.isArray(LineDrawingBack)

  // Make sure these always hold arrays, that way we can just map() over them in the JSX output
  const codeBy = Array.isArray(about[design].code) ? about[design].code : [about[design].code]
  const designBy = Array.isArray(about[design].design)
    ? about[design].design
    : [about[design].design]
  const tags = about[design].tags || []
  const techniques = about[design].techniques || []
  const colors = {
    1: 'success',
    2: 'success',
    3: 'warning',
    4: 'warning',
    5: 'error',
  }

  const makeButton = (
    <div className={`tw-grid tw-grid-cols-1 tw-gap-2 tw-mb-4`}>
      <IconButton href={`/editor/#s={"design"%3A"${design}"%2C"view"%3A"draft"}`} color="primary">
        <NewPatternIcon className="tw-w-8 tw-h-8" />
        New {capitalize(design)} pattern
      </IconButton>
    </div>
  )
  const buttons = noDocsLink ? (
    makeButton
  ) : (
    <div className={`tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2 tw-mb-4`}>
      <IconButton href={`/docs/designs/${design}`} color="secondary">
        <DocsIcon className="tw-w-8 tw-h-8" />
        Documentation
      </IconButton>
      {makeButton}
    </div>
  )

  return (
    <>
      <div className="lg:tw-hidden">{buttons}</div>
      <div className={`tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2`}>
        <div className="tw-relative">
          <div className="tw tw-top-0 tw-left-0">
            {back ? <LineDrawingBack /> : <LineDrawing />}
          </div>
          {Array.isArray(LineDrawingBack) ? null : (
            <button
              className="tw-absolute tw-top-2 tw-right-4 tw-start-auto tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-outline tw-daisy-btn-xs"
              onClick={() => setBack(!back)}
            >
              {back ? 'Front' : 'Back'} view
            </button>
          )}
        </div>
        <div className="">
          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">Description</div>
          <span className="tw-text-xl">{about[design].description}</span>

          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">By</div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 items-center">
            {codeBy.map((code) => (
              <KeyVal key={code} k="code" val={code} color="secondary" />
            ))}
            {designBy.map((code) => (
              <KeyVal key={code} k="design" val={code} color="secondary" />
            ))}
          </div>

          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">Difficulty</div>
          <Difficulty score={about[design].difficulty} />

          {optionalMeasurements[design].length > 0 ? (
            <>
              <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">
                Optional Measurements
              </div>
              <div className="">
                {optionalMeasurements[design].map((m, i) => (
                  <Fragment key={m}>
                    <Link
                      href={`/docs/measurements/${m.toLowerCase()}`}
                      key={m}
                      className={linkClasses}
                    >
                      {measurementsTranslations[m]}
                    </Link>
                    {i < optionalMeasurements[design].length - 1 ? <span>, </span> : null}
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}

          {requiredMeasurements[design].length > 0 ? (
            <>
              <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">
                Required Measurements
              </div>
              <div className="">
                {requiredMeasurements[design].map((m, i) => (
                  <Fragment key={m}>
                    <Link
                      href={`/docs/measurements/${m.toLowerCase()}`}
                      key={m}
                      className={linkClasses}
                    >
                      {measurementsTranslations[m]}
                    </Link>
                    {i < requiredMeasurements[design].length - 1 ? <span>, </span> : null}
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}

          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">Tags</div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 items-center">
            {tags.map((tag) => (
              <Link
                key={tag}
                className="tw-daisy-badge tw-daisy-badge-primary tw-font-medium hover:tw-shadow hover:tw-cursor-pointer"
                href={`/designs/#filter={"example"%3Atrue%2C"tag"%3A["${tag}"]}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">Techniques</div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 items-center">
            {techniques.map((tech) => (
              <Link
                key={tech}
                className="tw-daisy-badge tw-daisy-badge-accent tw-font-medium hover:tw-shadow hover:tw-cursor-pointer"
                href={`/designs/#filter={"example"%3Atrue%2C"tag"%3A["${tech}"]}`}
              >
                {tech}
              </Link>
            ))}
          </div>

          <div className="tw-mt-2 tw-text-sm tw-opacity-70 tw-font-medium">Examples</div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 items-center">
            <KeyVal
              k="FreeSewing"
              val="showcase"
              color="secondary"
              href={`/showcase/tags/aaron`}
              Link={Link}
            />
            <KeyVal
              k="Instagram"
              val={`#FreeSewing${capitalize(design)}`}
              color="secondary"
              href={`https://www.instagram.com/explore/search/keyword/?q=%23FreeSewing${capitalize(design)}`}
            />
          </div>
          <div className="tw-my-4">{buttons}</div>
        </div>
      </div>
    </>
  )
}

const SharingIsCaring = ({ design }) => (
  <>
    <h2>
      Use <b>#FreeSewing{capitalize(design)}</b> to facilitate discovery
    </h2>
    <p>
      Please use the{' '}
      <b>
        <code>#FreeSewing{capitalize(design)}</code>
      </b>{' '}
      hashtag when discussing FreeSewing&apos;s <b>{capitalize(design)}</b> pattern online.
      <br />
      Doing so can help others discover your post, which really is a win-win.
    </p>
    <p>If you like, you can copy the hashtag below:</p>
  </>
)

/*
//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import {
  nsMerge,
  capitalize,
  optionsMenuStructure,
  optionType,
  cloudflareImageUrl,
  horFlexClasses,
} from 'shared/utils.mjs'
import { designs } from 'shared/config/designs.mjs'
import { examples } from 'site/components/design-examples.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useDesign } from 'site/hooks/use-design.mjs'
import { useContext, Fragment } from 'react'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { lineDrawings } from 'shared/components/designs/linedrawings/index.mjs'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { PageLink, AnchorLink, Link } from 'shared/components/link.mjs'
import { DocsLink, DocsTitle } from 'shared/components/mdx/docs-helpers.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { NewPatternIcon, DocsIcon } from 'shared/components/icons.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

// Translation namespaces used on this page
export const ns = nsMerge(
  'account',
  'tags',
  'techniques',
  'measurements',
  'workbench',
  'designs',
  'tags'
)

const Option = ({ id, option, design }) =>
  optionType(option) === 'constant' ? null : (
    <li key={option.name}>
      <DocsLink site="org" slug={`docs/designs/${design}/options/${id.toLowerCase()}`} />
    </li>
  )

const OptionGroup = ({ id, group, t, design }) => (
  <li key={id}>
    <b>{t(`workbench:${id}`)}</b>
    <ul className="list list-inside list-disc pl-2">
      {Object.entries(group).map(([sid, entry]) =>
        entry.isGroup ? (
          <OptionGroup id={sid} key={sid} t={t} group={entry} design={design} />
        ) : (
          <Option key={sid} id={sid} option={entry} design={design} />
        )
      )}
    </ul>
  </li>
)
export const SimpleOptionsList = ({ options, t, design }) => {
  const structure = optionsMenuStructure(options, {}, true)
  const output = []
  for (const [key, entry] of Object.entries(structure)) {
    const shared = { key, t, design, id: key }
    if (entry.isGroup) output.push(<OptionGroup {...shared} group={entry} />)
    else output.push(<Option {...shared} option={entry} />)
  }

  return <ul className="list list-inside pl-2 list-disc">{output}</ul>
}

export const DesignInfo = ({ design, docs = false, workbench = false, modal = false }) => {
  const { setModal } = useContext(ModalContext)
  const { t, i18n } = useTranslation([...ns, design])
  const { language } = i18n
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

  // Linedrawing
  const LineDrawing = lineDrawings[design]
    ? lineDrawings[design]
    : ({ className }) => <div className={className}></div>

  // Docs content
  const docsContent = (
    <>
      <h2 id="docs">{t('account:docs')}</h2>
      <ul className="list list-disc list-inside pl-2">
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/cutting`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/instructions`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/needs`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/fabric`} />
        </li>
        {Object.keys(config.options).length > 0 ? (
          <li>
            <DocsLink site="org" slug={`docs/designs/${design}/options`} />
          </li>
        ) : null}
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/notes`} />
        </li>
      </ul>
    </>
  )

  return (
    <>
      <h5 className="-mt-6 text-accent font-medium">#FreeSewing{capitalize(design)}</h5>
      <p className="text-xl">{t(`designs:${design}.d`)}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {workbench ? null : (
          <Link
            className={`${horFlexClasses} btn btn-primary btn-lg flex md:hidden`}
            href={`/new/${design}`}
          >
            <NewPatternIcon className="w-8 h-8" />
            {t('tags:newThingPattern', { thing: capitalize(design) })}
          </Link>
        )}
        {docs ? null : (
          <Link
            className={`${horFlexClasses} btn btn-secondary btn-lg flex md:hidden`}
            href={`/docs/designs/${design}`}
          >
            <DocsIcon className="w-8 h-8" />
            {t('account:docs')}
          </Link>
        )}
      </div>
      {docs || workbench || modal ? null : (
        <div className="flex flex-row flex-wrap gap-2 md:gap-4 items-center p-4 border rounded-lg bg-secondary bg-opacity-5 max-w-4xl">
          <b>Jump to:</b>
          <AnchorLink id="notes">
            <DocsTitle
              slug={`docs/designs/${design}/notes`}
              language={language}
              format={(t) => t.split(':').pop().trim()}
            />
          </AnchorLink>
          {examples && <AnchorLink id="examples" txt={t('acount:examples')} />}
          {['needs', 'fabric'].map((page) => (
            <AnchorLink id={page} key={page}>
              <DocsTitle
                slug={`docs/designs/${design}/${page}`}
                language={language}
                format={(t) => t.split(':').pop().trim()}
              />
            </AnchorLink>
          ))}
          <AnchorLink id="docs" txt={t('account:docs')} />
          <AnchorLink id="specs" txt={t('account:specifications')} />
        </div>
      )}

      <div className={`mt-8 w-full ${docs ? '' : 'flex flex-row flex-wrap justify-between'}`}>
        <div className={`w-full max-w-2xl ${docs ? '' : 'md:w-2/3 pr-0 md:pr-8'}`}>
          <LineDrawing className="w-full text-base-content" />
          {docs ? null : (
            <>
              <h2 id="notes">
                <DocsTitle
                  slug={`docs/designs/${design}/notes`}
                  language={language}
                  format={(t) => t.split(':').pop().trim()}
                />
              </h2>
              <DynamicMdx
                site="org"
                slug={`docs/designs/${design}/notes`}
                language={language}
                title={false}
              />
            </>
          )}
          {docs ? docsContent : null}
          {examples ? (
            <>
              <h2 id="examples">{t('account:examples')}</h2>
              {examples[design] ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
                  {examples[design].map((ex) => (
                    <button
                      key={ex}
                      onClick={() =>
                        setModal(
                          <ModalWrapper
                            flex="col"
                            justify="top lg:justify-center"
                            slideFrom="right"
                          >
                            <img
                              className="w-full shadow rounded-lg"
                              src={cloudflareImageUrl({ id: `showcase-${ex}`, variant: 'public' })}
                            />
                            <p className="text-center">
                              <PageLink href={`/showcase/${ex}`} txt={t('account:visitShowcase')} />
                            </p>
                          </ModalWrapper>
                        )
                      }
                    >
                      <img
                        className="w-full shadow rounded-lg"
                        src={cloudflareImageUrl({ id: `showcase-${ex}`, variant: 'sq500' })}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <Popout note>
                  <h5>{t('account:noExamples')}</h5>
                  <p>{t('account:noExamplesMsg')}</p>
                  <p className="text-right">
                    <Link className="btn btn-primary" href="/new/showcase">
                      {t('account:showcaseNew')}
                    </Link>
                  </p>
                </Popout>
              )}
            </>
          ) : null}
          {docs
            ? null
            : ['needs', 'fabric'].map((page) => (
                <Fragment key={page}>
                  <h2 id={page}>
                    <DocsTitle
                      slug={`docs/designs/${design}/${page}`}
                      language={language}
                      format={(t) => t.split(':').pop().trim()}
                    />
                  </h2>
                  <DynamicMdx
                    site="org"
                    slug={`docs/designs/${design}/${page}`}
                    language={language}
                    title={false}
                  />
                </Fragment>
              ))}

          {docs ? null : docsContent}
        </div>

        <div className={`w-full ${docs ? '' : 'md:w-1/3'}`}>
          {workbench ? null : (
            <Link
              className={`${horFlexClasses} btn btn-primary btn-lg hidden md:flex mb-2`}
              href={`/new/${design}`}
            >
              <NewPatternIcon className="w-8 h-8" />
              {t('tags:newThingPattern', { thing: capitalize(design) })}
            </Link>
          )}
          {docs ? null : (
            <Link
              className={`${horFlexClasses} btn btn-secondary btn-lg hidden md:flex`}
              href={`/docs/designs/${design}`}
            >
              <DocsIcon className="w-8 h-8" />
              {t('account:docs')}
            </Link>
          )}
          <h2 id="specs">{t('account:specifications')}</h2>

          <h6 className="mt-4">{t('account:design')}</h6>
          <ul>
            {designs[design].design.map((person) => (
              <li key={person}>{person}</li>
            ))}
          </ul>

          <h6 className="mt-4">{t('account:code')}</h6>
          <ul>
            {designs[design].code.map((person) => (
              <li key={person}>{person}</li>
            ))}
          </ul>

          <h6 className="mt-4">{t('tags:difficulty')}</h6>
          <Difficulty score={designs[design].difficulty} />

          <h6 className="mt-4">{t('tags:tags')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designs[design].tags.map((tag) => (
              <span className="badge badge-primary font-medium" key={tag}>
                {t(`tags:${tag}`)}
              </span>
            ))}
          </div>

          <h6 className="mt-4">{t('techniques:techniques')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designs[design].techniques.map((tech) => (
              <span className="badge badge-accent font-medium" key={tech}>
                {t(`techniques:${tech}`)}
              </span>
            ))}
          </div>

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

          {Object.keys(config.options).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:designOptions')}</h6>
              <SimpleOptionsList options={config.options} t={t} design={design} />
            </>
          ) : null}

          <h6 className="mt-4">{t('account:parts')}</h6>
          <ul className="list list-disc list-inside pl-2">
            {config.draftOrder.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>

          {Object.keys(config.plugins).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:plugins')}</h6>
              <ul className="list list-disc list-inside pl-2">
                {Object.keys(config.plugins).map((plugin) => (
                  <li key={plugin}>{plugin}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
*/
