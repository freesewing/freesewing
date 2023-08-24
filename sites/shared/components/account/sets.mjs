// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { measurements } from 'config/measurements.mjs'
import { measurements as designMeasurements } from 'shared/prebuild/data/design-measurements.mjs'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { AnchorLink, PageLink, Link } from 'shared/components/link.mjs'
import {
  OkIcon,
  NoIcon,
  TrashIcon,
  EditIcon,
  UploadIcon,
  ResetIcon,
  MeasieIcon,
  CalendarIcon,
  PlusIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import Timeago from 'react-timeago'
import { DisplayRow } from './shared.mjs'
import { shortDate, cloudflareImageUrl, formatMm } from 'shared/utils.mjs'
import { isDegreeMeasurement } from 'config/measurements.mjs'
import { TextOnBg } from 'shared/components/text-on-bg.mjs'
import { DynamicOrgDocs } from 'shared/components/dynamic-docs/org.mjs'

import {
  StringInput,
  PassiveImageInput,
  ListInput,
  MarkdownInput,
  MeasieInput,
  DesignDropdown,
  ns as inputNs,
} from 'shared/components/inputs.mjs'

export const ns = [inputNs, 'account', 'patterns', 'status', 'measurements']

export const NewSet = () => {
  // Hooks
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const router = useRouter()

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
      <LoadingStatus />
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

export const MsetBanner = ({ set, control, onClick = false, href = false }) => {
  const { t, i18n } = useTranslation(ns)
  const info = []
  if (control > 1)
    info.push([
      <CalendarIcon key="a" />,
      <b key="b">
        <TextOnBg txt={shortDate(i18n.language, set.createdAt, false)} />
      </b>,
    ])
  info.push([
    <MeasieIcon key="c" />,
    <b key="d">
      <TextOnBg txt={(set.measies ? Object.keys(set.measies).length : 0) + ' ' + t('measies')} />
    </b>,
  ])
  if (control > 2)
    info.push([
      set.public ? (
        <OkIcon className="w-6 h-6 text-success" stroke={4} key="e" />
      ) : (
        <NoIcon className="w-6 h-6 text-error" stroke={3} key="e" />
      ),
      <b key="f">
        <TextOnBg txt={t(set.public ? 'publicSet' : 'privateSet')} />
      </b>,
    ])
  const inner = (
    <>
      <h2 className="bg-base-100 px-4 rounded-lg bg-opacity-50 py-2 rounded-l-none">
        <TextOnBg txt={set.name} />
      </h2>
      {info.map((item) => (
        <div
          className="flex flex-row flex-wrap gap-2 bg-base-100 p-4 rounded bg-opacity-50 py-1 mt-2 rounded-l-none"
          key={item[0]}
        >
          {item[0]}
          {item[1]}
        </div>
      ))}
    </>
  )
  const props = {
    className:
      'bg-base-100 w-full mb-2 mx-auto flex flex-col items-start text-center justify-center rounded shadow py-4',
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w1000', id: set.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }

  return onClick ? (
    <button {...props} onClick={onClick}>
      {inner}
    </button>
  ) : (
    <Link {...props} href={href}>
      {inner}
    </Link>
  )
}

export const Mset = ({ id, publicOnly = false }) => {
  // Hooks
  const { account, control } = useAccount()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  // FIXME: implement a solution for loading docs dynamically the is simple and work as expected
  const docs = {}
  for (const option of ['name', 'units', 'public', 'notes', 'image']) {
    docs[option] = <DynamicOrgDocs language={i18n.language} path={`site/sets/${option}`} />
  }
  // FIXME: implement a solution for loading docs dynamically the is simple and work as expected
  const measieDocs = {}
  for (const m of measurements) {
    measieDocs[m] = <DynamicOrgDocs language={i18n.language} path={`measurements/${m}`} />
  }

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
      <MsetBanner
        set={mset}
        control={control}
        onClick={() =>
          setModal(
            <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
              <img src={cloudflareImageUrl({ type: 'public', id: mset.img })} />
            </ModalWrapper>
          )
        }
      />
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
              <DisplayRow title={<MeasieVal m={m} val={val} />} key={m}>
                <span className="font-medium">{t(m)}</span>
              </DisplayRow>
            ))}
          </>
        )}

        <h2>{t('data')}</h2>
        <DisplayRow title={t('name')}>{mset.name}</DisplayRow>
        <DisplayRow title={t('units')}>
          {mset.imperial ? t('imerialUnits') : t('metricUnits')}
        </DisplayRow>
        {control >= controlLevels.sets.notes && (
          <DisplayRow title={t('notes')}>
            <Markdown>{mset.notes}</Markdown>
          </DisplayRow>
        )}
        {control >= controlLevels.sets.public && (
          <>
            <DisplayRow title={t('public')}>
              {mset.public ? (
                <OkIcon className="w-6 h-6 text-success" stroke={4} />
              ) : (
                <NoIcon className="w-6 h-6 text-error" stroke={3} />
              )}
            </DisplayRow>
            {mset.public && (
              <DisplayRow title={t('permalink')}>
                <PageLink href={`/sets/${mset.id}`} txt={`/sets/${mset.id}`} />
              </DisplayRow>
            )}
          </>
        )}
        {control >= controlLevels.sets.createdAt && (
          <DisplayRow title={t('created')}>
            <Timeago date={mset.createdAt} />
            <span className="px-2 opacity-50">|</span>
            {shortDate(i18n.language, mset.createdAt, false)}
          </DisplayRow>
        )}
        {control >= controlLevels.sets.createdAt && (
          <DisplayRow title={t('updated')}>
            <Timeago date={mset.updatedAt} />
            <span className="px-2 opacity-50">|</span>
            {shortDate(i18n.language, mset.createdAt, false)}
          </DisplayRow>
        )}
        {control >= controlLevels.sets.id && <DisplayRow title={t('id')}>{mset.id}</DisplayRow>}
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
          <li>
            <AnchorLink id="name" txt={t('name')} />
          </li>
          {account.control >= conf.account.sets.img ? (
            <li>
              <AnchorLink id="image" txt={t('image')} />
            </li>
          ) : null}
          {['public', 'units', 'notes'].map((id) =>
            account.control >= conf.account.sets[id] ? (
              <li key={id}>
                <AnchorLink id="units" txt={t(id)} />
              </li>
            ) : null
          )}
        </ul>
      </ul>

      <h2 id="measies">{t('measies')}</h2>
      <div className="bg-secondary px-4 pt-1 pb-4 rounded-lg shadow bg-opacity-10">
        <DesignDropdown
          update={setFilter}
          label={t('filterByDesign')}
          current={filter}
          firstOption={<option value="">{t('noFilter')}</option>}
          docs={
            <div className="max-w-prose">
              <h2>
                {t('measies')}: {t('filterByDesign')}
              </h2>
              <p>
                If you have a specific design in mind, you can <b>filter by design</b> to only list
                those measurements that are required for this design.
              </p>
            </div>
          }
        />
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
  const { control } = useAccount()
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
      <p className="text-center md:text-right">
        <Link
          className="btn btn-primary capitalize w-full md:w-auto"
          bottom
          primary
          href="/new/set"
        >
          <PlusIcon />
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
            <th className="text-base-300 text-base w-4 px-1">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                onClick={toggleSelectAll}
                checked={sets.length === selCount}
              />
            </th>
            <th className="text-base-300 text-base">{t('set')}</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, i) => (
            <tr key={i}>
              <td className="text-base font-medium px-0">
                <input
                  type="checkbox"
                  checked={selected[set.id] ? true : false}
                  className="checkbox checkbox-secondary"
                  onClick={() => toggleSelect(set.id)}
                />
              </td>
              <td className="text-base font-medium px-0">
                <MsetBanner control={control} href={`/account/sets/${set.id}`} set={set} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToAccountButton />
    </div>
  )
}
