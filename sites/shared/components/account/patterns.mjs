// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { capitalize, shortDate, cloudflareImageUrl, horFlexClasses } from 'shared/utils.mjs'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { PageLink, Link, AnchorLink } from 'shared/components/link.mjs'
import { BackToAccountButton } from './shared.mjs'
import {
  StringInput,
  MarkdownInput,
  PassiveImageInput,
  ListInput,
} from 'shared/components/inputs.mjs'
import {
  OkIcon,
  NoIcon,
  TrashIcon,
  PlusIcon,
  CameraIcon,
  EditIcon,
  ResetIcon,
  UploadIcon,
  FreeSewingIcon,
  CloneIcon,
  BoolYesIcon,
  BoolNoIcon,
} from 'shared/components/icons.mjs'
import { DisplayRow } from './shared.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import Timeago from 'react-timeago'
import { TableWrapper } from 'shared/components/wrappers/table.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'patterns', 'status']

export const Pattern = ({ id, publicOnly = false }) => {
  // Hooks
  const { account, control } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  // FIXME: implement a solution for loading docs dynamically
  const docs = {}
  for (const option of ['name', 'units', 'public', 'notes', 'image']) {
    docs[option] = <DynamicOrgDocs language={i18n.language} path={`site/patterns/${option}`} />
  }

  // Context
  const { setModal } = useContext(ModalContext)

  const [edit, setEdit] = useState(false)
  const [pattern, setPattern] = useState()
  // Set fields for editing
  const [name, setName] = useState(pattern?.name)
  const [image, setImage] = useState(pattern?.image)
  const [isPublic, setIsPublic] = useState(pattern?.public ? true : false)
  const [notes, setNotes] = useState(pattern?.notes || '')

  // Effect
  useEffect(() => {
    const getPattern = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getPattern(id)
      if (result.success) {
        setPattern(result.data.pattern)
        setName(result.data.pattern.name)
        setImage(result.data.pattern.image)
        setIsPublic(result.data.pattern.public ? true : false)
        setNotes(result.data.pattern.notes)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
    }
    const getPublicPattern = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getPublicPattern(id)
      if (result.success) {
        setPattern({
          ...result.data,
          public: true,
        })
        setName(result.data.name)
        setImage(result.data.image)
        setIsPublic(true)
        setNotes(result.data.notes)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
    }
    if (id) {
      if (publicOnly) getPublicPattern()
      else getPattern()
    }
    console.log(' in useeffect')
  }, [id, publicOnly])

  const save = async () => {
    setLoadingStatus([true, 'gatheringInfo'])
    // Compile data
    const data = {}
    if (name || name !== pattern.name) data.name = name
    if (image || image !== pattern.image) data.img = image
    if ([true, false].includes(isPublic) && isPublic !== pattern.public) data.public = isPublic
    if (notes || notes !== pattern.notes) data.notes = notes
    setLoadingStatus([true, 'savingPattern'])
    const result = await backend.updatePattern(pattern.id, data)
    if (result.success) {
      setPattern(result.data.pattern)
      setEdit(false)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  if (!pattern) return null

  const heading = (
    <>
      <div className="flex flex-wrap md:flex-nowrap flex-row gap-2 w-full">
        <div className="w-full md:w-96 shrink-0">
          <PatternCard pattern={pattern} size="md" />
        </div>
        <div className="flex flex-col justify-end gap-2 mb-2 grow">
          {account.control > 3 && pattern?.public ? (
            <div className="flex flex-row gap-2 items-center">
              <a
                className="badge badge-secondary font-bold badge-lg"
                href={`${conf.backend}/patterns/${pattern.id}.json`}
              >
                JSON
              </a>
              <a
                className="badge badge-success font-bold badge-lg"
                href={`${conf.backend}/patterns/${pattern.id}.yaml`}
              >
                YAML
              </a>
            </div>
          ) : (
            <span></span>
          )}
          <button
            onClick={() =>
              setModal(
                <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                  <img src={cloudflareImageUrl({ type: 'public', id: pattern.img })} />
                </ModalWrapper>
              )
            }
            className={`btn btn-secondary btn-outline ${horFlexClasses}`}
          >
            <CameraIcon />
            {t('showImage')}
          </button>
          {pattern.userId === account.id && publicOnly && (
            <Link
              href={`/patterns/${pattern.id}/edit`}
              className={`btn btn-primary btn-outline ${horFlexClasses}`}
            >
              <FreeSewingIcon /> {t('updatePattern')}
            </Link>
          )}
          {account.username && (
            <Link
              href={`/patterns/${pattern.id}/clone`}
              className={`btn btn-primary btn-outline ${horFlexClasses}`}
            >
              <CloneIcon /> {t('clonePattern')}
            </Link>
          )}
          {!publicOnly && (
            <>
              {edit ? (
                <>
                  <button
                    onClick={() => setEdit(false)}
                    className={`btn btn-primary btn-outline ${horFlexClasses}`}
                  >
                    <ResetIcon />
                    {t('cancel')}
                  </button>
                  <button onClick={save} className={`btn btn-primary ${horFlexClasses}`}>
                    <UploadIcon />
                    {t('saveThing', { thing: t('account:pattern') })}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/patterns/${pattern.id}/edit`}
                    className={`btn btn-primary btn-outline ${horFlexClasses}`}
                  >
                    <FreeSewingIcon /> {t('updatePattern')}
                  </Link>
                  <button
                    onClick={() => setEdit(true)}
                    className={`btn btn-primary ${horFlexClasses}`}
                  >
                    <EditIcon /> {t('editThing', { thing: t('account:patternMetadata') })}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 text-sm items-center justify-between mb-2"></div>
    </>
  )

  if (!edit)
    return (
      <div className="max-w-2xl">
        {heading}
        <DisplayRow title={t('name')}>{pattern.name}</DisplayRow>
        {control >= controlLevels.sets.notes && (
          <DisplayRow title={t('notes')}>
            <Markdown>{pattern.notes}</Markdown>
          </DisplayRow>
        )}
        {control >= controlLevels.patterns.public && (
          <>
            <DisplayRow title={t('public')}>
              {pattern.public ? <BoolYesIcon /> : <BoolNoIcon />}
            </DisplayRow>
            {pattern.public && (
              <DisplayRow title={t('permalink')}>
                <PageLink href={`/patterns/${pattern.id}`} txt={`/patterns/${pattern.id}`} />
              </DisplayRow>
            )}
          </>
        )}
        {control >= controlLevels.sets.createdAt && (
          <DisplayRow title={t('created')}>
            <Timeago date={pattern.createdAt} />
            <span className="px-2 opacity-50">|</span>
            {shortDate(i18n.language, pattern.createdAt, false)}
          </DisplayRow>
        )}
        {control >= controlLevels.patterns.updatedAt && (
          <DisplayRow title={t('updated')}>
            <Timeago date={pattern.updatedAt} />
            <span className="px-2 opacity-50">|</span>
            {shortDate(i18n.language, pattern.updatedAt, false)}
          </DisplayRow>
        )}
        {control >= controlLevels.patterns.id && (
          <DisplayRow title={t('id')}>{pattern.id}</DisplayRow>
        )}
      </div>
    )

  return (
    <div className="max-w-2xl">
      {heading}
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

      {/* Name is always shown */}
      <span id="name"></span>
      <StringInput
        id="pattern-name"
        label={t('name')}
        update={setName}
        current={name}
        original={pattern.name}
        docs={docs.name}
        placeholder="Maurits Cornelis Escher"
        valid={(val) => val && val.length > 0}
      />

      {/* img: Control level determines whether or not to show this */}
      <span id="image"></span>
      {account.control >= conf.account.sets.img ? (
        <PassiveImageInput
          id="pattern-img"
          label={t('image')}
          update={setImage}
          current={image}
          docs={docs.image}
          valid={(val) => val.length > 0}
        />
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      <span id="public"></span>
      {account.control >= conf.account.patterns.public ? (
        <ListInput
          id="pattern-public"
          label={t('public')}
          update={setIsPublic}
          docs={docs.public}
          list={[
            {
              val: true,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('publicPattern')}</span>
                  <OkIcon
                    className="w-8 h-8 text-success bg-base-100 rounded-full p-1"
                    stroke={4}
                  />
                </div>
              ),
              desc: t('publicPatternDesc'),
            },
            {
              val: false,
              label: (
                <div className="flex flex-row items-center flex-wrap justify-between w-full">
                  <span>{t('privatePattern')}</span>
                  <NoIcon className="w-8 h-8 text-error bg-base-100 rounded-full p-1" stroke={3} />
                </div>
              ),
              desc: t('privatePatternDesc'),
            },
          ]}
          current={isPublic}
        />
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      <span id="notes"></span>
      {account.control >= conf.account.patterns.notes ? (
        <MarkdownInput
          id="pattern-notes"
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
        {t('saveThing', { thing: t('account:pattern') })}
      </button>
    </div>
  )
}

export const PatternCard = ({
  pattern,
  href = false,
  onClick = false,
  useA = false,
  size = 'md',
}) => {
  const sizes = {
    lg: 96,
    md: 52,
    sm: 36,
    xs: 20,
  }
  const s = sizes[size]

  const wrapperProps = {
    className: `bg-base-300 w-full mb-2 mx-auto flex flex-col items-start text-center justify-center rounded shadow py-4 h-${s} w-${s}`,
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w1000', id: pattern.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (pattern.img === 'default-avatar') wrapperProps.style.backgroundPosition = 'bottom right'

  const inner = null

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

// Component for the account/patterns page
export const Patterns = () => {
  const router = useRouter()
  const { locale } = router

  // Hooks
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)

  // State
  const [patterns, setPatterns] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Effects
  useEffect(() => {
    const getPatterns = async () => {
      const result = await backend.getPatterns()
      if (result.success) setPatterns(result.data.patterns)
    }
    getPatterns()
  }, [refresh])

  // Helper method to toggle single selection
  const toggleSelect = (id) => {
    const newSelected = { ...selected }
    if (newSelected[id]) delete newSelected[id]
    else newSelected[id] = 1
    setSelected(newSelected)
  }

  // Helper method to toggle select all
  const toggleSelectAll = () => {
    if (selCount === patterns.length) setSelected({})
    else {
      const newSelected = {}
      for (const pattern of patterns) newSelected[pattern.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more patterns
  const removeSelectedPatterns = async () => {
    let i = 0
    for (const pattern in selected) {
      i++
      await backend.removePattern(pattern)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingPatterns')} key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  return (
    <div className="max-w-4xl xl:pl-4">
      <p className="text-center md:text-right">
        <Link className="btn btn-primary capitalize w-full md:w-auto" href="/new/pattern">
          <PlusIcon />
          {t('patternNew')}
        </Link>
      </p>
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelectedPatterns}>
          <TrashIcon /> {selCount} {t('patterns')}
        </button>
      ) : null}
      <TableWrapper>
        <table className="table table-auto">
          <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
            <tr className="">
              <th className="">
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onClick={toggleSelectAll}
                  checked={patterns.length === selCount}
                />
              </th>
              <th>{t('account:img')}</th>
              <th>{t('account:name')}</th>
              <th>{t('account:design')}</th>
              <th>{t('account:createdAt')}</th>
              <th>{t('account:public')}</th>
            </tr>
          </thead>
          <tbody>
            {patterns.map((pattern, i) => (
              <tr key={i}>
                <td className="text-base font-medium">
                  <input
                    type="checkbox"
                    checked={selected[pattern.id] ? true : false}
                    className="checkbox checkbox-secondary"
                    onClick={() => toggleSelect(pattern.id)}
                  />
                </td>
                <td className="text-base font-medium">
                  <PatternCard
                    href={`/account/patterns/${pattern.id}`}
                    pattern={pattern}
                    size="xs"
                  />
                </td>
                <td className="text-base font-medium">
                  <PageLink href={`/account/patterns/${pattern.id}`} txt={pattern.name} />
                </td>
                <td className="text-base font-medium">
                  <PageLink href={`/designs/${pattern.design}`} txt={capitalize(pattern.design)} />
                </td>
                <td className="text-base font-medium">
                  {shortDate(locale, pattern.createdAt, false)}
                </td>
                <td className="text-base font-medium">
                  {pattern.public ? <BoolYesIcon /> : <BoolNoIcon />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
      <BackToAccountButton />
    </div>
  )
}
