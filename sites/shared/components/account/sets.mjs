//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { measurements } from 'config/measurements.mjs'
import { measurements as designMeasurements } from 'shared/prebuild/data/design-measurements.mjs'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
import { isDegreeMeasurement } from 'config/measurements.mjs'
import {
  shortDate,
  cloudflareImageUrl,
  formatMm,
  hasRequiredMeasurements,
  capitalize,
  horFlexClasses,
} from 'shared/utils.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import { BackToAccountButton } from './shared.mjs'
import { AnchorLink, PageLink, Link } from 'shared/components/link.mjs'
import { Json } from 'shared/components/json.mjs'
import { Yaml } from 'shared/components/yaml.mjs'
import {
  OkIcon,
  NoIcon,
  TrashIcon,
  EditIcon,
  UploadIcon,
  ResetIcon,
  PlusIcon,
  WarningIcon,
  CameraIcon,
  CsetIcon,
  BoolYesIcon,
  BoolNoIcon,
  CloneIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import Timeago from 'react-timeago'
import { DisplayRow } from './shared.mjs'
import {
  StringInput,
  ToggleInput,
  PassiveImageInput,
  ListInput,
  MarkdownInput,
  MeasieInput,
  DesignDropdown,
  ns as inputNs,
} from 'shared/components/inputs.mjs'
import { BookmarkButton } from 'shared/components/bookmarks.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

export const ns = [inputNs, 'account', 'patterns', 'status', 'measurements', 'sets']

export const NewSet = () => {
  // Hooks
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const router = useRouter()
  const { account } = useAccount()

  // State
  const [name, setName] = useState('')

  // Use account setting for imperial
  const imperial = account.imperial

  // Helper method to create a new set
  const createSet = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.createSet({ name, imperial })
    if (result.success) {
      setLoadingStatus([true, t('nailedIt'), true, true])
      router.push(`/account/set?id=${result.data.set.id}`)
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
  isDegreeMeasurement(m) ? (
    <span>{val}°</span>
  ) : (
    <span dangerouslySetInnerHTML={{ __html: formatMm(val, imperial) }}></span>
  )

export const MsetCard = ({
  set,
  onClick = false,
  href = false,
  useA = false,
  design = false,
  language = false,
  size = 'lg',
}) => {
  const sizes = {
    lg: 96,
    md: 52,
    sm: 36,
  }
  const s = sizes[size]
  const { t } = useTranslation(ns)

  const wrapperProps = {
    className: `bg-base-300 aspect-square h-${s} w-${s} mb-2
      mx-auto flex flex-col items-start text-center justify-between rounded-none md:rounded shadow`,
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w500', id: set.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (!set.img || set.img === 'default-avatar')
    wrapperProps.style.backgroundPosition = 'bottom right'

  let icon = <span></span>
  let missingMeasies = ''
  let linebreak = ''
  const maxLength = 75
  if (design) {
    const [hasMeasies, missing] = hasRequiredMeasurements(
      designMeasurements[design],
      set.measies,
      true
    )
    const iconClasses = 'w-8 h-8 p-1 rounded-full -mt-2 -ml-2 shadow'
    icon = hasMeasies ? (
      <OkIcon className={`${iconClasses} bg-success text-success-content`} stroke={4} />
    ) : (
      <NoIcon className={`${iconClasses} bg-error text-error-content`} stroke={3} />
    )
    if (missing.length > 0) {
      const translated = missing.map((m) => {
        return t(m)
      })
      let missingString = t('missing') + ': ' + translated.join(', ')
      if (missingString.length > maxLength) {
        const lastSpace = missingString.lastIndexOf(', ', maxLength)
        missingString = missingString.substring(0, lastSpace) + ', ' + t('andMore') + '...'
      }
      const measieClasses = 'font-normal text-xs'
      missingMeasies = <span className={`${measieClasses}`}>{missingString}</span>
      linebreak = <br />
    }
  }

  const inner = (
    <>
      {icon}
      <span className="bg-neutral text-neutral-content px-4 w-full bg-opacity-50 py-2 rounded rounded-t-none font-bold leading-5">
        {language ? set[`name${capitalize(language)}`] : set.name}
        {linebreak}
        {missingMeasies}
      </span>
    </>
  )

  // Is it a button with an onClick handler?
  if (onClick)
    return (
      <button {...wrapperProps} onClick={() => onClick(set)}>
        {inner}
      </button>
    )

  // Returns a link to an internal page
  if (href && !useA)
    return (
      <Link {...wrapperProps} href={href}>
        {inner}
      </Link>
    )

  // Returns a link to an external page
  if (href && useA)
    return (
      <a {...wrapperProps} href={href}>
        {inner}
      </a>
    )

  // Returns a div
  return <div {...wrapperProps}>{inner}</div>
}

export const Mset = ({ id, publicOnly = false }) => {
  // Hooks
  const { account, control } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)

  // Context
  const { setModal } = useContext(ModalContext)

  const [filter, setFilter] = useState(false)
  const [edit, setEdit] = useState(false)
  const [suggest, setSuggest] = useState(false)
  const [mset, setMset] = useState()
  // Set fields for editing
  const [name, setName] = useState(mset?.name)
  const [image, setImage] = useState(mset?.image)
  const [isPublic, setIsPublic] = useState(mset?.public ? true : false)
  const [imperial, setImperial] = useState(mset?.imperial ? true : false)
  const [notes, setNotes] = useState(mset?.notes || '')
  const [measies, setMeasies] = useState({})
  const [displayAsMetric, setDisplayAsMetric] = useState(mset?.imperial ? false : true)

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
      if (measies[m] || measies[m] !== mset.measies[m]) data.measies[m] = measies[m]
    }
    setLoadingStatus([true, 'savingSet'])
    const result = await backend.updateSet(mset.id, data)
    if (result.success) {
      setMset(result.data.set)
      setEdit(false)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const togglePublic = async () => {
    setLoadingStatus([true, 'gatheringInfo'])
    const result = await backend.updateSet(mset.id, { public: !mset.public })
    if (result.success) {
      setMset(result.data.set)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const importSet = async () => {
    setLoadingStatus([true, t('account.importing')])
    // Compile data
    const data = {
      ...mset,
      userId: account.id,
      measies: { ...mset.measies },
    }
    delete data.img
    const result = await backend.createSet(data)
    if (result.success) {
      setMset(result.data.set)
      setEdit(false)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const docs = {}
  for (const option of ['name', 'units', 'public', 'notes', 'image']) {
    docs[option] = <DynamicMdx language={i18n.language} slug={`docs/about/site/sets/${option}`} />
  }

  const heading = (
    <>
      <div className="flex flex-wrap md:flex-nowrap flex-row gap-2 w-full">
        <div className="w-full md:w-96 shrink-0">
          <MsetCard set={mset} control={control} />
        </div>
        <div className="flex flex-col justify-end gap-2 mb-2 grow">
          {account.control > 2 && mset.public && mset.userId !== account.id ? (
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
          {account.control > 3 && mset.userId === account.id ? (
            <div className="flex flex-row gap-2 items-center">
              <button
                className="badge badge-secondary font-bold badge-lg"
                onClick={() =>
                  setModal(
                    <ModalWrapper keepOpenOnClick>
                      <Json js={mset} />
                    </ModalWrapper>
                  )
                }
              >
                JSON
              </button>
              <button
                className="badge badge-success font-bold badge-lg"
                onClick={() =>
                  setModal(
                    <ModalWrapper keepOpenOnClick>
                      <Yaml js={mset} />
                    </ModalWrapper>
                  )
                }
              >
                YAML
              </button>
            </div>
          ) : (
            <span></span>
          )}
          {account.id && account.control > 2 && mset.public && mset.userId !== account.id ? (
            <button className="btn btn-primary" title={t('account:importSet')} onClick={importSet}>
              <div className="flex flex-row gap-4 justify-between items-center w-full">
                <UploadIcon />
                {t('account:importSet')}
              </div>
            </button>
          ) : null}
          {account.control > 2 ? (
            <BookmarkButton slug={`sets/${mset.id}`} title={mset.name} type="set" thing="set" />
          ) : null}
          <button
            onClick={() =>
              setModal(
                <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                  <img src={cloudflareImageUrl({ type: 'public', id: mset.img })} />
                </ModalWrapper>
              )
            }
            className={`btn btn-secondary btn-outline ${horFlexClasses}`}
          >
            <CameraIcon />
            {t('showImage')}
          </button>
          {!publicOnly && (
            <>
              {account.control > 2 ? (
                <button
                  onClick={() => {
                    setSuggest(!suggest)
                    setEdit(false)
                  }}
                  className={`btn ${
                    suggest ? 'btn-neutral' : 'btn-primary'
                  } btn-outline ${horFlexClasses}`}
                >
                  {suggest ? <ResetIcon /> : <CsetIcon />}
                  {t(suggest ? 'account:cancel' : 'account:suggestForCuration')}
                </button>
              ) : null}
              {edit ? (
                <>
                  <button
                    onClick={() => {
                      setEdit(false)
                      setSuggest(false)
                    }}
                    className={`btn btn-neutral btn-outline ${horFlexClasses}`}
                  >
                    <ResetIcon />
                    {t('cancel')}
                  </button>
                  <button onClick={save} className={`btn btn-primary ${horFlexClasses}`}>
                    <UploadIcon />
                    {t('saveThing', { thing: t('account:set') })}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEdit(true)
                    setSuggest(false)
                  }}
                  className={`btn btn-primary ${horFlexClasses}`}
                >
                  <EditIcon /> {t('editThing', { thing: t('account:set') })}
                </button>
              )}
            </>
          )}
          {account.control > 2 && mset.userId === account.id ? (
            <button className="btn btn-neutral" title={t('account:cloneSet')} onClick={importSet}>
              <div className="flex flex-row gap-4 justify-between items-center w-full">
                <CloneIcon />
                {t('account:cloneSet')}
              </div>
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 text-sm items-center justify-between mb-2"></div>
    </>
  )

  if (suggest)
    return (
      <div className="max-w-2xl">
        {heading}
        <SuggestCset {...{ mset, setLoadingStatus, backend, t }} />
      </div>
    )

  if (!edit)
    return (
      <div className="max-w-2xl">
        {heading}

        <h2>{t('data')}</h2>
        <DisplayRow title={t('name')}>{mset.name}</DisplayRow>
        <DisplayRow title={t('units')}>
          {mset.imperial ? t('imperialUnits') : t('metricUnits')}
        </DisplayRow>
        {control >= controlLevels.sets.notes && (
          <DisplayRow title={t('notes')}>
            <Mdx md={mset.notes} />
          </DisplayRow>
        )}
        {control >= controlLevels.sets.public && (
          <>
            {mset.userId === account.id && (
              <DisplayRow title={t('public')}>
                <div className="flex flex-row gap-2 items-center justify-between">
                  {mset.public ? (
                    <OkIcon className="w-6 h-6 text-success" stroke={4} />
                  ) : (
                    <NoIcon className="w-6 h-6 text-error" stroke={3} />
                  )}
                  <button className="btn btn-secondary btn-sm" onClick={togglePublic}>
                    {t(`account:make${mset.public ? 'Private' : 'Public'}`)}
                  </button>
                </div>
              </DisplayRow>
            )}
            {mset.public && (
              <DisplayRow title={t('permalink')}>
                <PageLink href={`/set?id=${mset.id}`} txt={`/set?id=${mset.id}`} />
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
        {control >= controlLevels.sets.updatedAt && (
          <DisplayRow title={t('updated')}>
            <Timeago date={mset.updatedAt} />
            <span className="px-2 opacity-50">|</span>
            {shortDate(i18n.language, mset.updatedAt, false)}
          </DisplayRow>
        )}
        {control >= controlLevels.sets.id && <DisplayRow title={t('id')}>{mset.id}</DisplayRow>}

        {Object.keys(mset.measies).length > 0 && (
          <>
            <h2>{t('measies')}</h2>
            <ToggleInput
              label={false}
              labels={[t('account:metricUnits'), t('account:imperialUnits')]}
              update={() => setDisplayAsMetric(!displayAsMetric)}
              current={displayAsMetric}
            />
            {Object.entries(mset.measies).map(([m, val]) =>
              val > 0 ? (
                <DisplayRow
                  title={<MeasieVal {...{ m, val, imperial: !displayAsMetric }} />}
                  key={m}
                >
                  <span className="font-medium">{t(m)}</span>
                </DisplayRow>
              ) : null
            )}
          </>
        )}
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
        />
      </div>
      {filterMeasurements().map((mplus) => {
        const [translated, m] = mplus.split('|')

        return (
          <MeasieInput
            id={`measie-${m}`}
            key={m}
            m={m}
            imperial={mset.imperial}
            label={translated}
            current={mset.measies[m]}
            original={mset.measies[m]}
            update={updateMeasies}
            docs={
              <DynamicMdx language={i18n.language} slug={`docs/measurements/${m.toLowerCase()}`} />
            }
          />
        )
      })}

      <h2 id="data">{t('data')}</h2>

      {/* Name is always shown */}
      <span id="name"></span>
      <StringInput
        id="set-name"
        label={t('name')}
        update={setName}
        current={name}
        original={mset.name}
        placeholder="Georg Cantor"
        valid={(val) => val && val.length > 0}
        docs={docs.name}
      />

      {/* img: Control level determines whether or not to show this */}
      <span id="image"></span>
      {account.control >= conf.account.sets.img ? (
        <PassiveImageInput
          id="set-img"
          label={t('image')}
          update={setImage}
          current={image}
          valid={(val) => val.length > 0}
          docs={docs.image}
        />
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      <span id="public"></span>
      {account.control >= conf.account.sets.public ? (
        <ListInput
          id="set-public"
          label={t('public')}
          update={setIsPublic}
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
          docs={docs.public}
        />
      ) : null}

      {/* units: Control level determines whether or not to show this */}
      <span id="units"></span>
      {account.control >= conf.account.sets.units ? (
        <>
          <ListInput
            id="set-units"
            label={t('units')}
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
            docs={docs.units}
          />
          <span className="text-large text-warning">{t('unitsMustSave')}</span>
        </>
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      <span id="notes"></span>
      {account.control >= conf.account.sets.notes ? (
        <MarkdownInput
          id="set-notes"
          label={t('notes')}
          update={setNotes}
          current={notes}
          placeholder={t('mdSupport')}
          docs={docs.notes}
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
export const Sets = () => {
  // Hooks
  const { control } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)

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
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingSets')} key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  return (
    <div className="max-w-7xl xl:pl-4">
      {sets.length > 0 ? (
        <>
          <p className="text-center md:text-right">
            <Link
              className="btn btn-primary btn-outline capitalize w-full md:w-auto mr-2"
              bottom
              primary
              href="/account/import"
            >
              <UploadIcon />
              {t('account:importSets')}
            </Link>
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
          <div className="flex flex-row gap-2 border-b-2 mb-4 pb-4 mt-8 h-14 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              onClick={toggleSelectAll}
              checked={sets.length === selCount}
            />
            <button className="btn btn-error" onClick={removeSelectedSets} disabled={selCount < 1}>
              <TrashIcon /> {selCount} {t('sets')}
            </button>
          </div>
        </>
      ) : (
        <Link
          className="btn btn-primary capitalize w-full md:w-auto btn-lg"
          bottom
          primary
          href="/new/set"
        >
          <PlusIcon />
          {t('newSet')}
        </Link>
      )}
      <div className="flex flex-row flex-wrap gap-2">
        {sets.map((set, i) => (
          <div
            key={i}
            className={`flex flex-row items-start gap-1 border-2
          ${
            selected[set.id] ? 'border-solid border-secondary' : 'border-dotted border-base-300'
          } rounded-lg p-2`}
          >
            <label className="w-8 h-full shrink-0">
              <input
                type="checkbox"
                checked={selected[set.id] ? true : false}
                className="checkbox checkbox-secondary"
                onClick={() => toggleSelect(set.id)}
              />
            </label>
            <div className="w-full">
              <MsetCard control={control} href={`/account/set?id=${set.id}`} set={set} size="md" />
            </div>
          </div>
        ))}
      </div>
      <BackToAccountButton />
    </div>
  )
}

export const SetCard = ({
  set,
  requiredMeasies = [],
  href = false,
  onClick = false,
  useA = false,
}) => {
  // Hooks
  const { t } = useTranslation(['sets'])

  const [hasMeasies] = hasRequiredMeasurements(requiredMeasies, set.measies, true)

  const wrapperProps = {
    className:
      'bg-base-300 w-full mb-2 mx-auto flex flex-col items-start text-center justify-center rounded shadow py-4',
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w1000', id: set.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (set.img === 'default-avatar') wrapperProps.style.backgroundPosition = 'bottom right'

  const inner = hasMeasies ? null : (
    <div className="flex flex-row gap-2 items-center">
      <WarningIcon className="w-6 h-6 shrink-0 text-error" />
      <span>{t('setLacksMeasiesForDesign')}</span>
    </div>
  )

  // Is it a button with an onClick handler?
  if (onClick)
    return (
      <button {...wrapperProps} onClick={onClick}>
        {inner}
      </button>
    )

  // Returns a link to an internal page
  if (href && !useA)
    return (
      <Link {...wrapperProps} href={href}>
        {inner}
      </Link>
    )

  // Returns a link to an external page
  if (href && useA)
    return (
      <a {...wrapperProps} href={href}>
        {inner}
      </a>
    )

  // Returns a div
  return <div {...wrapperProps}>{inner}</div>
}

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

const SuggestCset = ({ mset, backend, setLoadingStatus, t }) => {
  // State
  const [height, setHeight] = useState('')
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [submission, setSubmission] = useState(false)

  // Method to submit the form
  const suggestSet = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.suggestCset({ set: mset.id, height, img, name, notes })
    if (result.success && result.data.submission) {
      setSubmission(result.data.submission)
      setLoadingStatus([true, 'status:nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const missing = []
  for (const m of measurements) {
    if (typeof mset.measies[m] === 'undefined') missing.push(m)
  }

  if (submission) {
    const url = `/curate/sets/suggested/${submission.id}`

    return (
      <>
        <h2>{t('account:thankYouVeryMuch')}</h2>
        <p>{t('account:csetSuggestedMsg')}</p>
        <p>
          {t('account:itIsAvailableAt')}: <PageLink href={url} txt={url} />
        </p>
      </>
    )
  }

  return (
    <>
      <h2>{t('account:suggestCset')}</h2>
      <h4 className="flex flex-row items-center gap-2">
        {missing.length > 0 ? <BoolNoIcon /> : <BoolYesIcon />}
        {t('account:measurements')}
      </h4>
      {missing.length > 0 ? (
        <>
          <p>{t('account:csetAllMeasies')}</p>
          <p>{t('account:csetMissing')}:</p>
          <ul className="list list-inside list-disc ml-4">
            {missing.map((m) => (
              <li key={m}>{t(`measurements:${m}`)}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>{t('account:allMeasiesAvailable')}</p>
      )}
      <h4 className="flex flex-row items-center gap-2">
        {name.length > 1 ? <BoolYesIcon /> : <BoolNoIcon />}
        {t('account:name')}
      </h4>
      <p>{t('account:csetNameMsg')}</p>
      <StringInput
        label={t('account:name')}
        current={name}
        update={setName}
        valid={(val) => val.length > 1}
      />
      <h4 className="flex flex-row items-center gap-2">
        {height.length > 1 ? <BoolYesIcon /> : <BoolNoIcon />}
        {t('measurements:height')}
      </h4>
      <p>{t('account:csetHeightMsg1')}</p>
      <StringInput
        label={t('measurements:height')}
        current={height}
        update={setHeight}
        valid={(val) => val.length > 1}
      />
      <h4 className="flex flex-row items-center gap-2 mt-4">
        {img.length > 0 ? <BoolYesIcon /> : <BoolNoIcon />}
        {t('account:img')}
      </h4>
      <p>
        {t('account:csetImgMsg')}:{' '}
        <PageLink href="/docs/about/site/csets">{t('account:docs')}</PageLink>
      </p>
      <PassiveImageInput
        label={t('account:img')}
        current={img}
        update={setImg}
        valid={(val) => val.length > 1}
      />
      <h4 className="flex flex-row items-center gap-2 mt-4">
        <BoolYesIcon />
        {t('account:notes')}
      </h4>
      <p>{t('account:csetNotesMsg')}</p>
      <Popout tip compact>
        {t('account:mdSupport')}
      </Popout>
      <MarkdownInput
        label={t('account:notes')}
        current={notes}
        update={setNotes}
        valid={() => true}
      />
      <button
        className="btn btn-primary w-full mt-4"
        disabled={!(missing.length === 0 && height.length > 1 && img.length > 0)}
        onClick={suggestSet}
      >
        {t('account:suggestForCuration')}
      </button>
    </>
  )
}
