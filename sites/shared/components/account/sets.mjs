// Dependencies
import { useState, useEffect, useContext, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import { measurements } from 'config/measurements.mjs'
import { measurements as designMeasurements } from 'shared/prebuild/data/design-measurements.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useDropzone } from 'react-dropzone'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { BackToAccountButton, Choice } from './shared.mjs'
import { AnchorLink, PageLink, Link } from 'shared/components/link.mjs'
import { ModalDesignPicker } from 'shared/components/modal/design-picker.mjs'
import {
  FilterIcon,
  ClearIcon,
  OkIcon,
  NoIcon,
  TrashIcon,
  EditIcon,
  UploadIcon,
  CancelIcon,
  ResetIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import { Tab } from './bio.mjs'
import Timeago from 'react-timeago'
import { Spinner } from 'shared/components/spinner.mjs'
import { MeasieRow } from 'shared/components/sets/measie-input.mjs'
import { Row } from './shared.mjs'
import { shortDate, cloudflareImageUrl, formatMm } from 'shared/utils.mjs'
import { useSetDocs } from 'shared/hooks/use-set-docs.mjs'
import { useMeasurementDocs } from 'shared/hooks/use-measurement-docs.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { isDegreeMeasurement } from 'config/measurements.mjs'

import {
  StringInput,
  PassiveImageInput,
  ListInput,
  MarkdownInput,
  MeasieInput,
} from 'shared/components/inputs.mjs'

export const ns = ['account', 'patterns', 'status', 'measurements']

export const NewSet = () => {
  // Hooks
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const { account } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const router = useRouter()

  // State
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  // State
  const [name, setName] = useState('')

  // Helper method to create a new set
  const createSet = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.createSet({ name })
    if (result.success) {
      setLoadingStatus([true, t('nailedIt'), true, true])
      router.push(`/account/sets/${result.data.set.id}`)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <h5>{t('name')}</h5>
      <p>{t('setNameDesc')}</p>
      <input
        autoFocus
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        className="input w-full input-bordered flex flex-row"
        type="text"
        placeholder={'Georg Cantor'}
      />
      <div className="flex flex-row gap-2 items-center w-full mt-8 mb-2">
        <button
          className="btn btn-primary grow capitalize"
          disabled={name.length < 1}
          onClick={createSet}
        >
          {t('newSet')}
        </button>
      </div>
    </div>
  )
}

export const MeasieVal = ({ val, m, imperial }) =>
  isDegreeMeasurement(m) ? <span>{val}°</span> : <span>{formatMm(val, imperial)}</span>

export const Mset = ({ id, publicOnly = false }) => {
  // Hooks
  const { account } = useAccount()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const router = useRouter()
  const { locale } = router
  const docs = useSetDocs(locale)
  const measieDocs = useMeasurementDocs(locale)

  // Context
  const { setModal } = useContext(ModalContext)

  const [filter, setFilter] = useState(false)
  const [edit, setEdit] = useState(false)
  const [mset, setMset] = useState()
  // Set fields for editing
  const [name, setName] = useState(mset?.name)
  const [image, setImage] = useState(mset?.image)
  const [isPublic, setIsPublic] = useState(mset?.public ? true : false)
  const [imperial, setImperial] = useState(mset?.imperial ? true : false)
  const [notes, setNotes] = useState(mset?.notes || '')
  const [measies, setMeasies] = useState({})

  // Effect
  useEffect(() => {
    const getSet = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getSet(id)
      if (result.success) {
        setMset(result.data.set)
        setName(result.data.set.name)
        setImage(result.data.set.image)
        setIsPublic(result.data.set.public ? true : false)
        setImperial(result.data.set.imperial ? true : false)
        setNotes(result.data.set.notes)
        setMeasies(result.data.set.measies)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
    }
    const getPublicSet = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getPublicSet(id)
      if (result.success) {
        setMset({
          ...result.data,
          public: true,
          measies: result.data.measurements,
        })
        setName(result.data.name)
        setImage(result.data.image)
        setIsPublic(result.data.public ? true : false)
        setImperial(result.data.imperial ? true : false)
        setNotes(result.data.notes)
        setMeasies(result.data.measurements)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
    }
    if (id) {
      if (publicOnly) getPublicSet()
      else getSet()
    }
  }, [id, publicOnly])

  const filterMeasurements = () => {
    if (!filter) return measurements.map((m) => t(`measurements:${m}`) + `|${m}`).sort()
    else return designMeasurements[filter].map((m) => t(`measurements:${m}`) + `|${m}`).sort()
  }

  if (!id || !mset) return null

  const updateMeasies = (m, val) => {
    const newMeasies = { ...measies }
    newMeasies[m] = val
    setMeasies(newMeasies)
  }

  const save = async () => {
    setLoadingStatus([true, 'gatheringInfo'])
    // Compile data
    const data = { measies: {} }
    if (name || name !== mset.name) data.name = name
    if (image || image !== mset.image) data.img = image
    if ([true, false].includes(isPublic) && isPublic !== mset.public) data.public = isPublic
    if ([true, false].includes(imperial) && imperial !== mset.imperial) data.imperial = imperial
    if (notes || notes !== mset.notes) data.notes = notes
    // Add measurements
    for (const m of measurements) {
      console.log(m)
      if (measies[m] || measies[m] !== mset.measies[m]) data.measies[m] = measies[m]
    }
    setLoadingStatus([true, 'savingSet'])
    console.log({ measies, data })
    const result = await backend.updateSet(mset.id, data)
    if (result.success) {
      setMset(result.data.set)
      setEdit(false)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const heading = (
    <div className="flex flex-row flex-wrap gap-4 text-sm items-center justify-between mb-2">
      <LoadingStatus />
      <button
        className="bg-base-100 w-full h-36 mb-2 mx-auto flex flex-col items-center text-center justify-center rounded shadow"
        style={{
          backgroundImage: `url(${cloudflareImageUrl({ type: 'w1000', id: mset.img })})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50%',
        }}
        onClick={() =>
          setModal(
            <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
              <img src={cloudflareImageUrl({ type: 'public', id: mset.img })} />
            </ModalWrapper>
          )
        }
      >
        <h2 className="bg-base-100 px-4 rounded-lg bg-opacity-70 py-2">{mset.name}</h2>
      </button>
      {account.control > 3 && mset.public ? (
        <div className="flex flex-row gap-2 items-center">
          <a
            className="badge badge-secondary font-bold badge-lg"
            href={`${conf.backend}/sets/${mset.id}.json`}
          >
            JSON
          </a>
          <a
            className="badge badge-success font-bold badge-lg"
            href={`${conf.backend}/sets/${mset.id}.yaml`}
          >
            YAML
          </a>
        </div>
      ) : (
        <span></span>
      )}
      {!publicOnly && (
        <>
          {edit ? (
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setEdit(false)}
                className="btn btn-primary btn-outline flex flex-row items-center gap-4"
              >
                <ResetIcon />
                {t('cancel')}
              </button>
              <button onClick={save} className="btn btn-primary flex flex-row items-center gap-4">
                <UploadIcon />
                {t('saveThing', { thing: t('account:set') })}
              </button>
            </div>
          ) : (
            <button onClick={() => setEdit(true)} className="btn btn-primary">
              <EditIcon /> {t('editThing', { thing: t('account:set') })}
            </button>
          )}
        </>
      )}
    </div>
  )

  if (!edit)
    return (
      <div className="max-w-2xl">
        {heading}
        {Object.keys(mset.measies).length > 0 && (
          <>
            <h2>{t('measies')}</h2>
            {Object.entries(mset.measies).map(([m, val]) => (
              <Row title={<MeasieVal m={m} val={val} />} key={m}>
                <span className="font-medium">{t(m)}</span>
              </Row>
            ))}
          </>
        )}

        <h2>{t('data')}</h2>
        <Row title={t('name')}>{mset.name}</Row>
        <Row title={t('image')}>
          <img
            src={cloudflareImageUrl({ type: 'sq100', id: mset.img })}
            className="w-8 h-8 aspect-square rounded-full shadow"
          />
        </Row>
        <Row title={t('units')}>{mset.imperial ? t('imerialUnits') : t('metricUnits')}</Row>
        <Row title={t('notes')}>
          <Markdown>{mset.notes}</Markdown>
        </Row>
        <Row title={t('public')}>
          {mset.public ? (
            <OkIcon className="w-6 h-6 text-success" stroke={4} />
          ) : (
            <NoIcon className="w-6 h-6 text-error" stroke={3} />
          )}
        </Row>
        {mset.public && (
          <Row title={t('permalink')}>
            <PageLink href={`/sets/${mset.id}`} txt={`/sets/${mset.id}`} />
          </Row>
        )}
        <Row title={t('created')}>
          <Timeago date={mset.createdAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(locale, mset.createdAt, false)}
        </Row>
        <Row title={t('updated')}>
          <Timeago date={mset.updatedAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(locale, mset.createdAt, false)}
        </Row>
        <Row title={t('id')}>{mset.id}</Row>
      </div>
    )

  return (
    <div className="max-w-2xl">
      {heading}
      <ul className="list list-disc list-inside ml-4">
        {['measies', 'data'].map((s) => (
          <li key={s}>
            <AnchorLink id={s} txt={t(s)} />
          </li>
        ))}
        <ul className="list list-disc list-inside ml-4">
          {['name', 'image', 'public', 'units', 'notes'].map((id) => (
            <li>
              <AnchorLink id={id} txt={t(id)} />
            </li>
          ))}
        </ul>
      </ul>

      <h2 id="measies">{t('measies')}</h2>
      <div className="flex flex-row items-center justify-center">
        <button
          className="btn btn-secondary btn-outline flex flex-row gap-4 rounded-r-none"
          onClick={() =>
            setModal(
              <ModalDesignPicker
                designs={Object.keys(designMeasurements)}
                setModal={setModal}
                setter={setFilter}
              />
            )
          }
        >
          <FilterIcon />
          {filter ? t(`designs:${filter}.t`) : t(`designs:allDesigns`)}
        </button>
        <button
          className="btn btn-secondary btn-outline rounded-l-none border-l-0"
          onClick={() => setFilter(false)}
        >
          <ClearIcon />
        </button>
      </div>
      {filterMeasurements().map((mplus) => {
        const [translated, m] = mplus.split('|')

        return (
          <MeasieInput
            key={m}
            m={m}
            docs={measieDocs[m]}
            imperial={mset.imperial}
            label={translated}
            current={mset.measies[m]}
            original={mset.measies[m]}
            update={updateMeasies}
          />
        )
      })}

      <h2 id="data">{t('data')}</h2>

      {/* Name is always shown */}
      <span id="name"></span>
      <StringInput
        label={t('name')}
        update={setName}
        current={name}
        original={mset.name}
        docs={docs.name}
        placeholder="Georg Cantor"
        valid={(val) => val && val.length > 0}
      />

      {/* img: Control level determines whether or not to show this */}
      <span id="image"></span>
      {account.control >= conf.account.sets.img ? (
        <PassiveImageInput
          label={t('image')}
          update={setImage}
          current={image}
          docs={docs.image}
          valid={(val) => val.length > 0}
        />
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      <span id="public"></span>
      {account.control >= conf.account.sets.public ? (
        <ListInput
          label={t('public')}
          update={setIsPublic}
          docs={docs.public}
          list={[
            {
              val: true,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('publicSet')}</span>
                  <OkIcon
                    className="w-8 h-8 text-success bg-base-100 rounded-full p-1"
                    stroke={4}
                  />
                </div>
              ),
              desc: t('publicSetDesc'),
            },
            {
              val: false,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('privateSet')}</span>
                  <NoIcon className="w-8 h-8 text-error bg-base-100 rounded-full p-1" stroke={3} />
                </div>
              ),
              desc: t('privateSetDesc'),
            },
          ]}
          current={isPublic}
        />
      ) : null}

      {/* units: Control level determines whether or not to show this */}
      <span id="units"></span>
      {account.control >= conf.account.sets.units ? (
        <ListInput
          label={t('units')}
          docs={docs.units}
          update={setImperial}
          list={[
            {
              val: false,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('metricUnits')}</span>
                  <span className="text-inherit text-2xl pr-2">cm</span>
                </div>
              ),
              desc: t('metricUnitsd'),
            },
            {
              val: true,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('imperialUnits')}</span>
                  <span className="text-inherit text-4xl pr-2">″</span>
                </div>
              ),
              desc: t('imperialUnitsd'),
            },
          ]}
          current={imperial}
        />
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      <span id="notes"></span>
      {account.control >= conf.account.sets.notes ? (
        <MarkdownInput
          label={t('notes')}
          update={setNotes}
          docs={docs.notes}
          current={notes}
          placeholder={t('mdSupport')}
        />
      ) : null}
      <button
        onClick={save}
        className="btn btn-primary btn-lg flex flex-row items-center gap-4 mx-auto mt-8"
      >
        <UploadIcon />
        {t('saveThing', { thing: t('account:set') })}
      </button>
    </div>
  )
}

// Component for the account/sets page
export const Sets = ({ title = true }) => {
  // Hooks
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus, LoadingProgress } = useLoadingStatus()

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) setSets(result.data.sets)
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
    if (selCount === sets.length) setSelected({})
    else {
      const newSelected = {}
      for (const set of sets) newSelected[set.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more measurements sets
  const removeSelectedSets = async () => {
    let i = 0
    for (const id in selected) {
      i++
      await backend.removeSet(id)
      setLoadingStatus([true, <LoadingProgress val={i} max={selCount} msg={t('removingSets')} />])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  return (
    <div className="max-w-4xl xl:pl-4">
      <LoadingStatus />
      <p className="text-right">
        <Link className="btn btn-primary capitalize btn-lg" bottom primary href="/new/set">
          {t('newSet')}
        </Link>
      </p>
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelectedSets}>
          <TrashIcon /> {selCount} {t('sets')}
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
                checked={sets.length === selCount}
              />
            </th>
            <th className="text-base-300 text-base">{t('keyName')}</th>
            <th className="text-base-300 text-base">
              <span className="hidden md:inline">{t('keyLevel')}</span>
              <span role="img" className="inline md:hidden">
                🔐
              </span>
            </th>
            <th className="text-base-300 text-base">{t('keyExpires')}</th>
            <th className="text-base-300 text-base hidden md:block">{t('apiCalls')}</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, i) => (
            <tr key={i}>
              <td className="text-base font-medium">
                <input
                  type="checkbox"
                  checked={selected[set.id] ? true : false}
                  className="checkbox checkbox-secondary"
                  onClick={() => toggleSelect(set.id)}
                />
              </td>
              <td className="text-base font-medium">
                <PageLink href={`/account/sets/${set.id}`} txt={set.name} />
              </td>
              <td className="text-base font-medium"></td>
              <td className="text-base font-medium"></td>
              <td className="text-base font-medium hidden md:block"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToAccountButton />
    </div>
  )
}
