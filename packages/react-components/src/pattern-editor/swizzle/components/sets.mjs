//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
//import { measurements } from 'config/measurements.mjs'
//import { measurements as designMeasurements } from 'shared/prebuild/data/design-measurements.mjs'
//import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
//import { isDegreeMeasurement } from 'config/measurements.mjs'
//import {
//  shortDate,
//  cloudflareImageUrl,
//  formatMm,
//  hasRequiredMeasurements,
//  capitalize,
//  horFlexClasses,
//} from 'shared/utils.mjs'
//// Hooks
//import { useState, useEffect, useContext } from 'react'
//import { useTranslation } from 'next-i18next'
//import { useAccount } from 'shared/hooks/use-account.mjs'
//import { useBackend } from 'shared/hooks/use-backend.mjs'
//import { useRouter } from 'next/router'
//// Context
//import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
//import { ModalContext } from 'shared/context/modal-context.mjs'
//// Components
//import { Popout } from 'shared/components/popout/index.mjs'
//import { BackToAccountButton } from './shared.mjs'
//import { AnchorLink, PageLink, Link } from 'shared/components/link.mjs'
//import { Json } from 'shared/components/json.mjs'
//import { Yaml } from 'shared/components/yaml.mjs'
//import {
//  OkIcon,
//  NoIcon,
//  TrashIcon,
//  EditIcon,
//  UploadIcon,
//  ResetIcon,
//  PlusIcon,
//  WarningIcon,
//  CameraIcon,
//  CsetIcon,
//  BoolYesIcon,
//  BoolNoIcon,
//  CloneIcon,
//} from 'shared/components/icons.mjs'
//import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
//import { Mdx } from 'shared/components/mdx/dynamic.mjs'
//import Timeago from 'react-timeago'
//import { DisplayRow } from './shared.mjs'
//import {
//  StringInput,
//  ToggleInput,
//  PassiveImageInput,
//  ListInput,
//  MarkdownInput,
//  MeasieInput,
//  DesignDropdown,
//  ns as inputNs,
//} from 'shared/components/inputs.mjs'
//import { BookmarkButton } from 'shared/components/bookmarks.mjs'
//import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

//export const ns = [inputNs, 'account', 'patterns', 'status', 'measurements', 'sets']

export const MeasieVal = ({ val, m, imperial }) =>
  isDegreeMeasurement(m) ? (
    <span>{val}°</span>
  ) : (
    <span dangerouslySetInnerHTML={{ __html: formatMm(val, imperial) }}></span>
  )

export const MsetButton = (props) => <MsetCard {...props} href={false} />
export const MsetLink = (props) => <MsetCard {...props} onClick={false} useA={false} />
export const MsetA = (props) => <MsetCard {...props} onClick={false} useA={true} />

export const UserSetPicker = ({
  design,
  t,
  href,
  clickHandler,
  missingClickHandler,
  size = 'lg',
}) => {
  // Hooks
  const backend = useBackend()
  const { control } = useAccount()

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
      const [hasMeasies] = hasRequiredMeasurements(
        designMeasurements[design],
        sets[setId].measies,
        true
      )
      if (hasMeasies) okSets.push(sets[setId])
      else lackingSets.push(sets[setId])
    }
  }

  if (!hasSets)
    return (
      <div className="w-full max-w-3xl mx-auto">
        <Popout tip>
          <h5>{t('account:noOwnSets')}</h5>
          <p className="text-lg">{t('account:pleaseMtm')}</p>
          <p className="text-lg">{t('account:noOwnSetsMsg')}</p>
          <p className="text-center md:text-right">
            <Link
              className="btn btn-primary capitalize w-full md:w-auto"
              bottom
              primary
              href="/new/set"
            >
              <PlusIcon />
              {t('account:newSet')}
            </Link>
          </p>
        </Popout>
      </div>
    )

  return (
    <>
      {okSets.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {okSets.map((set) => (
            <MsetButton
              {...{ set, control, design }}
              onClick={clickHandler}
              href={href}
              requiredMeasies={measurements[design]}
              key={set.id}
              size={size}
            />
          ))}
        </div>
      )}
      {lackingSets.length > 0 && (
        <div className="my-4">
          <Popout note compact>
            {t('account:someSetsLacking')}
          </Popout>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            {lackingSets.map((set) => (
              <MsetButton
                {...{ set, control, design }}
                onClick={missingClickHandler}
                href={href}
                requiredMeasies={measurements[design]}
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
            {t('account:someSetsLacking')}
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
