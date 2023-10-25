//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
import { siteConfig } from 'site/site.config.mjs'
import {
  horFlexClasses,
  objUpdate,
  shortDate,
  cloudflareImageUrl,
  capitalize,
  notEmpty,
} from 'shared/utils.mjs'
import { measurements } from 'config/measurements.mjs'
import { measurements as designMeasurements } from 'shared/prebuild/data/design-measurements.mjs'
import orderBy from 'lodash.orderby'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { DisplayRow } from './account/shared.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import Timeago from 'react-timeago'
import { MeasieVal } from './account/sets.mjs'
import {
  TrashIcon,
  CameraIcon,
  UploadIcon,
  OkIcon,
  NoIcon,
  BoolNoIcon,
  BoolYesIcon,
} from 'shared/components/icons.mjs'
import { Link, PageLink } from 'shared/components/link.mjs'
import {
  StringInput,
  PassiveImageInput,
  MarkdownInput,
  MeasieInput,
  DesignDropdown,
  ListInput,
  NumberInput,
  ns as inputNs,
} from 'shared/components/inputs.mjs'

export const ns = ['account', 'patterns', 'status', 'measurements', 'sets', inputNs]

const SetLineup = ({ sets = [], href = false, onClick = false }) => (
  <div
    className={`w-full flex flex-row ${
      sets.length > 1 ? 'justify-start px-8' : 'justify-center'
    } overflow-x-scroll`}
    style={{
      backgroundImage: `url(/img/lineup-backdrop.svg)`,
      width: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
    }}
  >
    {sets.map((set) => {
      const props = {
        className: 'aspect-[1/3] w-auto h-96',
        style: {
          backgroundImage: `url(${cloudflareImageUrl({ id: `cset-${set.id}`, type: 'lineup' })})`,
          width: 'auto',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      }
      if (onClick) props.onClick = () => onClick(set)
      else if (typeof href === 'function') props.href = href(set.id)

      if (onClick) return <button {...props} key={set.id}></button>
      else if (href) return <Link {...props} key={set.id}></Link>
      else return <div {...props} key={set.id}></div>
    })}
  </div>
)

const ShowCuratedSet = ({ cset }) => {
  const { control } = useAccount()
  const { t, i18n } = useTranslation(ns)
  const lang = i18n.language
  const { setModal } = useContext(ModalContext)

  if (!cset) return null

  return (
    <>
      <h2>{cset[`name${capitalize(lang)}`]}</h2>
      <div className="w-full">
        <SetLineup sets={[cset]} />
      </div>

      <div className="flex flex-wrap flex-row gap-2 w-full mt-4 items-center justify-end">
        {control > 3 && (
          <>
            <a
              className="badge badge-secondary font-bold badge-lg"
              href={`${conf.backend}/curated-sets/${cset.id}.json`}
            >
              JSON
            </a>
            <a
              className="badge badge-success font-bold badge-lg"
              href={`${conf.backend}/curated-sets/${cset.id}.yaml`}
            >
              YAML
            </a>
          </>
        )}
        <button
          onClick={() =>
            setModal(
              <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                <img src={cloudflareImageUrl({ type: 'lineup', id: `cset-${cset.id}` })} />
              </ModalWrapper>
            )
          }
          className={`btn btn-secondary btn-outline flex flex-row items-center justify-between w-48 grow-0`}
        >
          <CameraIcon />
          {t('showImage')}
        </button>
      </div>

      <h2>{t('data')}</h2>
      <DisplayRow title={t('name')}>
        <PageLink href={`/curated-set?id=${cset.id}`} txt={cset[`name${capitalize(lang)}`]} />
      </DisplayRow>
      <DisplayRow title={t('height')}>{cset.height}cm</DisplayRow>
      {control >= controlLevels.sets.notes && (
        <DisplayRow title={t('notes')}>
          <Mdx md={cset[`notes${capitalize(lang)}`]} />
        </DisplayRow>
      )}
      {control >= controlLevels.sets.createdAt && (
        <DisplayRow title={t('created')}>
          <Timeago date={cset.createdAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(i18n.language, cset.createdAt, false)}
        </DisplayRow>
      )}
      {control >= controlLevels.sets.updatedAt && (
        <DisplayRow title={t('updated')}>
          <Timeago date={cset.updatedAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(i18n.language, cset.updatedAt, false)}
        </DisplayRow>
      )}
      {control >= controlLevels.sets.id && <DisplayRow title={t('id')}>{cset.id}</DisplayRow>}

      <h2>{t('measies')}</h2>
      {Object.entries(cset.measies).map(([m, val]) =>
        val > 0 ? (
          <DisplayRow title={<MeasieVal m={m} val={val} />} key={m}>
            <span className="font-medium">{t(m)}</span>
          </DisplayRow>
        ) : null
      )}
    </>
  )
}

export const CuratedSet = ({ id }) => {
  // Hooks
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()

  // State
  const [cset, setCset] = useState()

  // Effect
  useEffect(() => {
    const getCset = async () => {
      setLoadingStatus([true, 'status:contactingBackend'])
      const result = await backend.getCuratedSet(id)
      if (result.success) {
        setCset(result.data.curatedSet)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    if (id) getCset()
  }, [id])

  if (!id || !cset) return null

  return (
    <div className="max-w-2xl">
      <ShowCuratedSet cset={cset} />
    </div>
  )
}

// Picker version
export const CuratedSetPicker = (props) => <CuratedSets {...props} />

// Component for the curated-sets page
export const CuratedSets = ({ href = false, clickHandler = false, published = true }) => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

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
      <SetLineup {...lineupProps} />
      {selected && <ShowCuratedSet cset={sets[selected]} />}
    </div>
  )
}

// Component for the maintaining the list of curated-sets
export const CuratedSetsList = ({ href = false }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)
  const [refresh, setRefresh] = useState(0)

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState(false)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      setLoadingStatus([true, 'contactingBackend'])
      const result = await backend.getCuratedSets()
      if (result.success) {
        const allSets = []
        for (const set of result.data.curatedSets) allSets.push(set)
        setSets(allSets)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    getSets()
  }, [refresh])

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Helper method to toggle single selection
  const toggleSelect = (id) => {
    const newSelected = { ...selected }
    if (newSelected[id]) delete newSelected[id]
    else newSelected[id] = 1
    setSelected(newSelected)
  }

  // Helper method to toggle select all
  const toggleSelectAll = () => {
    if (selCount === selected.length) setSelected({})
    else {
      const newSelected = {}
      for (const set of selected) newSelected[set.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more sets
  const removeSelected = async () => {
    let i = 0
    for (const key in selected) {
      i++
      await backend.removeCuratedMeasurementsSet(key)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingRecords')} key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  const lineupProps = {
    sets: Object.values(sets),
  }
  if (typeof href === 'function') lineupProps.href = href
  else lineupProps.onClick = setSelected

  return (
    <div className="max-w-7xl xl:pl-4">
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelected}>
          <TrashIcon /> {selCount} {t('curate:sets')}
        </button>
      ) : null}
      <table className="table table-auto">
        <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
          <tr className="b">
            <th className="text-base-300 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                onClick={toggleSelectAll}
                checked={selected.length === selCount}
              />
            </th>
            <th className="text-base-300 text-base">{t('curate:id')}</th>
            <th className="text-base-300 text-base">{t('curate:img')}</th>
            <th className="text-base-300 text-base">{t('curate:name')}</th>
            <th className="text-base-300 text-base">{t('curate:published')}</th>
            <th className="text-base-300 text-base">{t('curate:height')}</th>
            <th className="text-base-300 text-base">{t('curate:createdAt')}</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => (
            <tr key={set.id}>
              <td className="text-base font-medium">
                <input
                  type="checkbox"
                  checked={selected[set.id] ? true : false}
                  className="checkbox checkbox-secondary"
                  onClick={() => toggleSelect(set.id)}
                />
              </td>
              <td>
                <PageLink href={typeof href === 'function' ? href(set.id) : href} txt={set.id} />
              </td>
              <td>
                <img
                  src={cloudflareImageUrl({ id: `cset-${set.id}`, variant: 'sq100' })}
                  className="mask mask-squircle w-12 h-12"
                />
              </td>
              <td>
                <PageLink
                  href={typeof href === 'function' ? href(set.id) : href}
                  txt={set.nameEn}
                />
              </td>
              <td>{set.published ? <BoolYesIcon /> : <BoolNoIcon />}</td>
              <td>{set.height}cm</td>
              <td>{set.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetLineup {...lineupProps} />
    </div>
  )
}

export const EditCuratedSet = ({ id }) => {
  // Hooks
  const { account } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [filter, setFilter] = useState(false)
  const [cset, setCset] = useState()
  const [data, setData] = useState({})

  // Effect
  useEffect(() => {
    const getCuratedSet = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getCuratedSet(id)
      if (result.success) {
        setCset(result.data.curatedSet)
        const initData = {
          img: result.data.curatedSet.img,
          published: result.data.curatedSet.published,
          measies: { ...result.data.curatedSet.measies },
        }
        for (const lang of siteConfig.languages) {
          let k = `name${capitalize(lang)}`
          initData[k] = result.data.curatedSet[k]
          k = `notes${capitalize(lang)}`
          initData[k] = result.data.curatedSet[k]
        }
        setData(initData)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
    }
    if (id) getCuratedSet()
  }, [id])

  const filterMeasurements = () => {
    if (!filter) return measurements.map((m) => t(`measurements:${m}`) + `|${m}`).sort()
    else return designMeasurements[filter].map((m) => t(`measurements:${m}`) + `|${m}`).sort()
  }

  if (!id || !cset) return <p>nope {id}</p> //null

  const updateData = (path, val) => setData(objUpdate({ ...data }, path, val))

  const save = async () => {
    setLoadingStatus([true, 'savingSet'])
    const changes = { measies: {} }
    for (const lang of siteConfig.languages) {
      let k = `name${capitalize(lang)}`
      if (data[k] !== cset[k]) changes[k] = data[k]
      k = `notes${capitalize(lang)}`
      if (data[k] !== cset[k]) changes[k] = data[k]
    }
    if (data.height !== cset.height) changes.height = Number(data.height)
    if (data.img !== cset.img) changes.img = data.img
    if (data.published !== cset.published) changes.published = data.published
    for (const m in data.measies) {
      if (data.measies[m] !== cset.measies[m]) changes.measies[m] = data.measies[m]
    }
    const result = await backend.updateCuratedSet(cset.id, changes)
    if (result.success) {
      setCset(result.data.curatedSet)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-2xl">
      <PageLink href={`/curated-set?id=${id}`} txt={`/curated-set?id=${id}`} />
      <ListInput
        label={t('curate:published')}
        update={(val) => updateData('published', val)}
        list={[
          {
            val: true,
            label: (
              <div className="flex flex-row items-center flex-wrap justify-between w-full">
                <span>{t('curate:published')}</span>
                <OkIcon className="w-8 h-8 text-success bg-base-100 rounded-full p-1" stroke={4} />
              </div>
            ),
            desc: t('curate:publishedDesc'),
          },
          {
            val: false,
            label: (
              <div className="flex flex-row items-center flex-wrap justify-between w-full">
                <span>{t('curate:unpublished')}</span>
                <NoIcon className="w-8 h-8 text-error bg-base-100 rounded-full p-1" stroke={3} />
              </div>
            ),
            desc: t('curate:unpublishedDesc'),
          },
        ]}
        current={data.published}
      />

      <NumberInput
        min={42}
        max={215}
        step={1}
        key="height"
        label="Height"
        update={(val) => updateData('height', val)}
        current={Number(data.height)}
        valid={notEmpty}
      />

      <h2 id="measies">{t('measies')}</h2>
      <div className="bg-secondary px-4 pt-1 pb-4 rounded-lg shadow bg-opacity-10">
        <DesignDropdown
          update={setFilter}
          label={t('filterByDesign')}
          current={filter}
          firstOption={<option value="">{t('noFilter')}</option>}
        />
      </div>
      {filterMeasurements().map((mplus) => {
        const [translated, m] = mplus.split('|')

        return (
          <MeasieInput
            id={`measie-${m}`}
            key={m}
            m={m}
            imperial={account.imperial}
            label={translated}
            current={data.measies?.[m]}
            original={cset.measies?.[m]}
            update={(name, val) => updateData(['measies', m], val)}
          />
        )
      })}

      <h2>{t('account:data')}</h2>
      <h3>{t('account:name')}</h3>

      {/* Name is always shown */}
      {siteConfig.languages.map((lang) => {
        const key = `name${capitalize(lang)}`

        return (
          <StringInput
            key={key}
            label={`${t('account:name')} (${lang.toUpperCase()})`}
            update={(val) => updateData(key, val)}
            current={data[key]}
            valid={notEmpty}
          />
        )
      })}

      <h3>{t('account:notes')}</h3>

      {/* notes: Control level determines whether or not to show this */}
      {siteConfig.languages.map((lang) => {
        const key = `notes${capitalize(lang)}`

        return (
          <MarkdownInput
            key={lang}
            label={`${t('account:notes')} (${lang.toUpperCase()})`}
            update={(val) => updateData(key, val)}
            current={data[key]}
            placeholder={t('mdSupport')}
          />
        )
      })}

      {/* img: Control level determines whether or not to show this */}
      <PassiveImageInput
        label={t('curate:img')}
        update={(val) => updateData('img', val)}
        current={data.img}
        valid={notEmpty}
      />

      <button onClick={save} className={`btn btn-primary btn-lg ${horFlexClasses} mt-8`}>
        <UploadIcon />
        {t('saveThing', { thing: t('curate:curatedSet') })}
      </button>
    </div>
  )
}
