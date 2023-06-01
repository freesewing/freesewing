// Dependencies
import { useState, useEffect, useContext, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import { capitalize } from 'shared/utils.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useDropzone } from 'react-dropzone'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import Link from 'next/link'
import { PageLink } from 'shared/components/page-link.mjs'
import { Collapse, MimicCollapseLink } from 'shared/components/collapse.mjs'
import { BackToAccountButton, Choice } from './shared.mjs'
import {
  OkIcon,
  NoIcon,
  TrashIcon,
  SettingsIcon,
  DownloadIcon,
  PageIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import { Tab } from './bio.mjs'
import Timeago from 'react-timeago'
import { Spinner } from 'shared/components/spinner.mjs'

export const ns = ['account', 'patterns', 'toast']

export const StandAloneNewSet = () => {
  const { t } = useTranslation(['account'])
  const toast = useToast()
  const { account, token } = useAccount()
  const backend = useBackend(token)

  return (
    <div className="max-w-xl">
      <NewSet {...{ t, account, backend, toast }} title={false} standalone={true} />
    </div>
  )
}

export const NewSet = ({
  t,
  refresh,
  closeCollapseButton,
  backend,
  toast,
  title = true,
  standalone = false,
}) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const router = useRouter()

  // State
  const [name, setName] = useState('')

  // Helper method to create a new set
  const createSet = async () => {
    startLoading()
    const result = await backend.createSet({
      name,
    })
    if (result.success) {
      toast.success(<span>{t('nailedIt')}</span>)
      if (standalone) router.push('/account/sets/')
      else {
        refresh()
        closeCollapseButton()
      }
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div>
      {title ? <h2>{t('newSet')}</h2> : null}
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

const EditField = (props) => {
  if (props.field === 'name') return <EditName {...props} />
  if (props.field === 'notes') return <EditNotes {...props} />
  if (props.field === 'public') return <EditPublic {...props} />
  if (props.field === 'img') return <EditImg {...props} />

  return <p>FIXME: No edit component for this field</p>
}

export const EditRow = (props) => (
  <Collapse
    color="secondary"
    openTitle={props.title}
    title={
      <>
        <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">
          {props.title}
        </div>
        <div className="grow">{props.children}</div>
      </>
    }
  >
    <EditField field="name" {...props} />
  </Collapse>
)

const EditImg = ({ t, pattern, account, backend, toast, refresh }) => {
  const [img, setImg] = useState(pattern.img)
  const { startLoading, stopLoading } = useContext(LoadingContext)

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const save = async () => {
    startLoading()
    const result = await backend.updatePattern(pattern.id, { img })
    if (result.success) {
      toast.for.settingsSaved()
      refresh()
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div>
      <div>
        <img
          alt="img"
          src={img || account.img}
          className="shadow mb-4 mask mask-squircle bg-neutral aspect-square"
        />
        <div
          {...getRootProps()}
          className={`
          flex rounded-lg w-full flex-col items-center justify-center
          lg:h-64 lg:border-4 lg:border-secondary lg:border-dashed
        `}
        >
          <input {...getInputProps()} />
          <p className="hidden lg:block p-0 m-0">{t('imgDragAndDropImageHere')}</p>
          <p className="hidden lg:block p-0 my-2">{t('or')}</p>
          <button className={`btn btn-secondary btn-outline mt-4 px-8`}>
            {t('imgSelectImage')}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-center mt-2">
        <button className="btn btn-secondary" onClick={save}>
          {t('save')}
        </button>
      </div>
    </div>
  )
}

const EditName = ({ t, pattern, backend, toast, refresh }) => {
  const [value, setValue] = useState(pattern.name)
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== value) {
      setValue(evt.target.value)
    }
  }

  const save = async () => {
    startLoading()
    const result = await backend.updatePattern(pattern.id, { name: value })
    if (result.success) {
      refresh()
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <input
        value={value}
        onChange={update}
        className="input w-full input-bordered flex flex-row"
        type="text"
        placeholder={t('name')}
      />
      <button className="btn btn-secondary" onClick={save} disabled={value === pattern.name}>
        <span className="flex flex-row items-center gap-2">
          {loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
            </>
          ) : (
            t('save')
          )}
        </span>
      </button>
    </div>
  )
}

const EditNotes = ({ t, pattern, backend, toast, refresh }) => {
  const [value, setValue] = useState(pattern.notes)
  const [activeTab, setActiveTab] = useState('edit')
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== value) {
      setValue(evt.target.value)
    }
  }

  const save = async () => {
    startLoading()
    const result = await backend.updatePattern(pattern.id, { notes: value })
    if (result.success) {
      refresh()
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  return (
    <div>
      <div className="tabs w-full">
        <Tab id="edit" {...tabProps} />
        <Tab id="preview" {...tabProps} />
      </div>
      <div className="flex flex-row items-center mt-4">
        {activeTab === 'edit' ? (
          <textarea
            rows="5"
            className="textarea textarea-bordered textarea-lg w-full"
            placeholder={t('placeholder')}
            onChange={update}
            value={value}
          />
        ) : (
          <div className="text-left px-4 border w-full">
            <Markdown>{value}</Markdown>
          </div>
        )}
      </div>
      <div className="my-2 flex gap-2 items-center justify-center">
        <button className="btn btn-secondary" onClick={save} disabled={value === pattern.notes}>
          <span className="flex flex-row items-center gap-2">
            {loading ? (
              <>
                <Spinner />
                <span>{t('processing')}</span>
              </>
            ) : (
              t('save')
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

const EditPublic = ({ t, pattern, backend, toast, refresh }) => {
  const [selection, setSelection] = useState(pattern.public)
  const { startLoading, stopLoading } = useContext(LoadingContext)

  const update = async (val) => {
    setSelection(val)
    if (val !== pattern.public) {
      startLoading()
      const result = await backend.updatePattern(pattern.id, { public: val })
      if (result.success) {
        refresh()
        toast.for.settingsSaved()
      } else toast.for.backendError()
      stopLoading()
    }
  }

  return (
    <>
      {[true, false].map((val) => (
        <Choice val={val} t={t} update={update} current={selection} bool key={val}>
          <div className="flex flex-row gap-2 text-lg leading-5 items-center">
            {val ? (
              <>
                <OkIcon className="w-6 h-6 text-success" /> <span>{t('publicPattern')}</span>
              </>
            ) : (
              <>
                <NoIcon className="w-6 h-6 text-error" /> <span>{t('privatePattern')}</span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-2 text-normal font-light normal-case pt-1 items-center">
            {val ? t('publicPatternDesc') : t('privatePatternDesc')}
          </div>
        </Choice>
      ))}
    </>
  )
}

export const EditSectionTitle = ({ title }) => (
  <h5 className="border border-solid border-b-2 border-r-0 border-l-0 border-t-0 border-primary mt-4 mb-2">
    {title}
  </h5>
)

const EditPattern = (props) => {
  const { account, pattern, t } = props

  return (
    <div className="p-2 lg:p-4">
      {/* Meta info */}
      {account.control > 2 ? (
        <div className="flex flex-row gap-2 text-sm items-center justify-center mb-2">
          <div className="flex flex-row gap-2 items-center">
            <b>{t('permalink')}:</b>
            {pattern.public ? (
              <PageLink href={`/patterns/${pattern.id}`} txt={`/patterns/${pattern.id}`} />
            ) : (
              <NoIcon className="w-4 h-4 text-error" />
            )}
          </div>
          <div>
            <b>{t('created')}</b>: <Timeago date={pattern.createdAt} />
          </div>
          <div>
            <b>{t('updated')}</b>: <Timeago date={pattern.updatedAt} />
          </div>
        </div>
      ) : null}

      {/* JSON & YAML links */}
      {account.control > 3 ? (
        <div className="flex flex-row gap-2 text-sm items-center justify-center">
          <a
            className="badge badge-secondary font-bold"
            href={`${conf.backend}/patterns/${pattern.id}.json`}
          >
            JSON
          </a>
          <a
            className="badge badge-success font-bold"
            href={`${conf.backend}/patterns/${pattern.id}.yaml`}
          >
            YAML
          </a>
        </div>
      ) : null}

      <EditSectionTitle title={t('data')} />

      {/* Name is always shown */}
      <EditRow title={t('name')} field="name" {...props}>
        {pattern.name}
      </EditRow>

      {/* img: Control level determines whether or not to show this */}
      {account.control >= conf.account.patterns.img ? (
        <EditRow title={t('image')} field="img" {...props}>
          <img src={pattern.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
        </EditRow>
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      {account.control >= conf.account.patterns.public ? (
        <EditRow title={t('public')} field="public" {...props}>
          <div className="flex flex-row gap-2">
            {pattern.public ? (
              <>
                <OkIcon className="h-6 w-6 text-success" /> <span>{t('publicPattern')}</span>
              </>
            ) : (
              <>
                <NoIcon className="h-6 w-6 text-error" /> <span>{t('privatePattern')}</span>
              </>
            )}
          </div>
        </EditRow>
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      {account.control >= conf.account.patterns.notes ? (
        <EditRow title={t('notes')} field="notes" {...props}>
          <Markdown>{pattern.notes}</Markdown>
        </EditRow>
      ) : null}
    </div>
  )
}

const Pattern = ({ pattern, t, account, backend, refresh }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const { setModal } = useContext(ModalContext)

  // Hooks
  const toast = useToast()

  const remove = async () => {
    startLoading()
    const result = await backend.removePattern(pattern.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    refresh()
    stopLoading()
  }

  const removeModal = () => {
    setModal(
      <ModalWrapper slideFrom="top">
        <h2>{t('areYouCertain')}</h2>
        <p>{t('deleteSetWarning')}</p>
        <p className="flex flex-row gap-4 items-center justify-center">
          <button className="btn btn-neutral btn-outline px-8">{t('cancel')}</button>
          <button className="btn btn-error px-8" onClick={remove}>
            {t('delete')}
          </button>
        </p>
      </ModalWrapper>
    )
  }

  const title = (
    <>
      <img src={pattern.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-2 lg:justify-between w-full">
        {pattern.set?.img && (
          <img src={pattern.set.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
        )}
        {pattern.cset?.img && (
          <img
            src={pattern.cset.img}
            className="w-10 mask mask-squircle bg-neutral aspect-square"
          />
        )}
        <b>{capitalize(pattern.design)}</b>
        <span>{pattern.name}</span>
        {pattern.set?.name && <span>{pattern.set.name}</span>}
        {pattern.cset?.nameEn && <span>{pattern.cset.nameEn}</span>}
      </div>
    </>
  )

  return (
    <>
      <MimicCollapseLink
        href={`/patterns/${pattern.id}`}
        className="block lg:hidden"
        title={title}
      />
      <Collapse
        primary
        top
        className="hidden lg:flex"
        title={title}
        openTitle={`${capitalize(pattern.design)} | ${pattern.name}`}
        buttons={[
          <Link
            key="view"
            className="btn btn-success hover:text-success-content border-0 hidden lg:flex"
            href={`/patterns/${pattern.id}`}
            title={t('showPattern')}
          >
            <PageIcon />
          </Link>,
          <Link
            key="edit"
            className="btn btn-secondary hover:text-secondary-content border-0 hidden lg:flex"
            href={`/patterns/${pattern.id}/edit#view="draft"`}
            title={t('removePattern')}
          >
            <SettingsIcon />
          </Link>,
          <Link
            key="export"
            className="btn btn-primary hover:text-primary-content border-0 hidden lg:flex"
            href={`/patterns/${pattern.id}/edit#view="export"`}
            title={t('removePattern')}
          >
            <DownloadIcon />
          </Link>,
          <button
            key="rm"
            className="btn btn-error hover:text-error-content border-0"
            onClick={account.control > 4 ? remove : removeModal}
            title={t('removePattern')}
          >
            <TrashIcon />
          </button>,
        ]}
      >
        <EditPattern {...{ t, pattern, account, backend, toast, refresh, setModal }} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <Link
            key="view"
            className="btn btn-success w-full"
            href={`/patterns/${pattern.id}`}
            title={t('showPattern')}
          >
            <PageIcon />
            <span className="pl-2">{t('showPattern')}</span>
          </Link>
          <Link
            key="draft"
            className="btn btn-secondary w-full"
            href={`/patterns/${pattern.id}/edit#view="draft"`}
            title={t('draftPattern')}
          >
            <SettingsIcon />
            <span className="pl-2">{t('draftPattern')}</span>
          </Link>
          <Link
            key="download"
            className="btn btn-primary w-full"
            href={`/patterns/${pattern.id}/edit#view="export"`}
            title={t('exportPattern')}
          >
            <DownloadIcon />
            <span className="pl-2">{t('exportPattern')}</span>
          </Link>
        </div>
      </Collapse>
    </>
  )
}

// Component for the account/patterns page
export const Patterns = ({ standAlone = false }) => {
  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)

  // State
  const [patterns, setPatterns] = useState([])
  const [changes, setChanges] = useState(0)

  // Effects
  useEffect(() => {
    const getPatterns = async () => {
      const result = await backend.getPatterns()
      if (result.success) setPatterns(result.data.patterns)
    }
    getPatterns()
  }, [changes])

  // Helper method to force a refresh
  const refresh = () => {
    setChanges(changes + 1)
  }

  return (
    <div className="max-w-4xl xl:pl-4">
      {orderBy(patterns, ['name'], ['asc']).map((pattern) => (
        <Pattern {...{ account, pattern, t, backend, refresh }} key={pattern.id} />
      ))}
      <Link href="/new/pattern" className="btn btn-primary w-full capitalize mt-4">
        {t('createANewPattern')}
      </Link>
      {standAlone ? null : <BackToAccountButton />}
    </div>
  )
}
