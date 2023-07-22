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
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { BackToAccountButton, Choice } from './shared.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { ModalDesignPicker } from 'shared/components/modal/design-picker.mjs'
import {
  FilterIcon,
  ClearIcon,
  OkIcon,
  NoIcon,
  TrashIcon,
  EditIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import { Tab } from './bio.mjs'
import Timeago from 'react-timeago'
import { Spinner } from 'shared/components/spinner.mjs'
import { MeasieRow } from 'shared/components/sets/measie-input.mjs'

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
  if (props.field === 'imperial') return <EditUnits {...props} />
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
    toggle={<EditIcon />}
    toggleClasses="btn btn-secondary"
  >
    <EditField field="name" {...props} />
  </Collapse>
)

const EditImg = ({ t, mset, account, backend, startLoading, stopLoading, toast, refresh }) => {
  const [img, setImg] = useState(mset.img)

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
    const result = await backend.updateSet(mset.id, { img })
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
          <button className={`btn btn-secondary btn-outline mt-4 w-64`}>
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

const EditName = ({ t, mset, backend, toast, refresh, loading, startLoading, stopLoading }) => {
  const [value, setValue] = useState(mset.name)

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== value) {
      setValue(evt.target.value)
    }
  }

  const save = async () => {
    startLoading()
    const result = await backend.updateSet(mset.id, { name: value })
    if (result.success) {
      refresh()
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="flex flex-row gap-2">
      <input
        value={value}
        onChange={update}
        className="input w-full input-bordered flex flex-row"
        type="text"
        placeholder={t('name')}
      />
      <button className="btn btn-secondary" onClick={save} disabled={value === mset.name}>
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

const EditNotes = ({ t, mset, backend, toast, refresh, loading, startLoading, stopLoading }) => {
  const [value, setValue] = useState(mset.notes)
  const [activeTab, setActiveTab] = useState('edit')

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== value) {
      setValue(evt.target.value)
    }
  }

  const save = async () => {
    startLoading()
    const result = await backend.updateSet(mset.id, { notes: value })
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
        <button className="btn btn-secondary" onClick={save} disabled={value === mset.name}>
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

const EditUnits = ({ t, mset, backend, toast, refresh, startLoading, stopLoading }) => {
  const [selection, setSelection] = useState(mset?.imperial === true ? 'imperial' : 'metric')

  const update = async (val) => {
    setSelection(val)
    const asBool = val === 'imperial' ? true : false
    if (asBool !== mset.imperial) {
      startLoading()
      const result = await backend.updateSet(mset.id, { imperial: asBool })
      if (result.success) {
        refresh()
        toast.for.settingsSaved()
      } else toast.for.backendError()
      stopLoading()
    }
  }

  //const save = async () => {
  //  startLoading()
  //  const result = await backend.updateSet(mset.id, { name: value })
  //  if (result.success) {
  //    refresh()
  //    toast.for.settingsSaved()
  //  } else toast.for.backendError()
  //  stopLoading()
  //}

  return (
    <>
      {['metric', 'imperial'].map((val) => (
        <Choice
          val={val}
          t={t}
          update={update}
          current={selection}
          bool
          key={val}
          boolIcons={{ yes: <span>&quot;</span>, no: <span>cm</span> }}
        >
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2 ? t('showMore') : t(`${val}Units`)}
          </span>
          <span className="block text-normal font-light normal-case pt-1">{t(`${val}Unitsd`)}</span>
        </Choice>
      ))}
    </>
  )
}

const EditPublic = ({ t, mset, backend, toast, refresh, startLoading, stopLoading }) => {
  const [selection, setSelection] = useState(mset.public)

  const update = async (val) => {
    setSelection(val)
    if (val !== mset.public) {
      startLoading()
      const result = await backend.updateSet(mset.id, { public: val })
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
                <OkIcon className="w-6 h-6 text-success" /> <span>{t('publicSet')}</span>
              </>
            ) : (
              <>
                <NoIcon className="w-6 h-6 text-error" /> <span>{t('privateSet')}</span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-2 text-normal font-light normal-case pt-1 items-center">
            {val ? t('publicSetDesc') : t('privateSetDesc')}
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

const EditMeasurementsSet = (props) => {
  const [filter, setFilter] = useState(false)
  const { mset, t, setModal, startLoading, stopLoading, toast, refresh, backend } = props

  const filterMeasurements = () => {
    if (!filter) return measurements.map((m) => t(`measurements:${m}`)).sort()
    else return designMeasurements[filter].map((m) => t(`measurements:${m}`)).sort()
  }

  const saveProps = { t, startLoading, stopLoading, toast, refresh, backend }

  return (
    <div className="p-4">
      {/* Meta info */}
      {props.account.control > 2 ? (
        <div className="flex flex-row gap-4 text-sm items-center justify-center mb-2">
          <div className="flex flex-row gap-2 items-center">
            <b>{t('permalink')}:</b>
            {mset.public ? (
              <PageLink href={`/sets/${mset.id}`} txt={`/sets/${mset.id}`} />
            ) : (
              <NoIcon className="w-4 h-4 text-error" />
            )}
          </div>
          <div>
            <b>{t('created')}</b>: <Timeago date={mset.createdAt} />
          </div>
          <div>
            <b>{t('updated')}</b>: <Timeago date={mset.updatedAt} />
          </div>
        </div>
      ) : null}

      {/* JSON & YAML links */}
      {props.account.control > 3 ? (
        <div className="flex flex-row gap-4 text-sm items-center justify-center">
          <a
            className="badge badge-secondary font-bold"
            href={`${conf.backend}/sets/${mset.id}.json`}
          >
            JSON
          </a>
          <a
            className="badge badge-success font-bold"
            href={`${conf.backend}/sets/${mset.id}.yaml`}
          >
            YAML
          </a>
        </div>
      ) : null}

      <EditSectionTitle title={t('data')} />

      {/* Name is always shown */}
      <EditRow title={t('name')} field="name" {...props} {...saveProps}>
        {mset.name}
      </EditRow>

      {/* img: Control level determines whether or not to show this */}
      {props.account.control >= conf.account.sets.img ? (
        <EditRow title={t('image')} field="img" {...props} {...saveProps}>
          <img src={mset.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
        </EditRow>
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      {props.account.control >= conf.account.sets.public ? (
        <EditRow title={t('public')} field="public" {...props} {...saveProps}>
          <div className="flex flex-row gap-2">
            {mset.public ? (
              <>
                <OkIcon className="h-6 w-6 text-success" /> <span>{t('publicSet')}</span>
              </>
            ) : (
              <>
                <NoIcon className="h-6 w-6 text-error" /> <span>{t('privateSet')}</span>
              </>
            )}
          </div>
        </EditRow>
      ) : null}

      {/* units: Control level determines whether or not to show this */}
      {props.account.control >= conf.account.sets.units ? (
        <EditRow title={t('units')} field="imperial" {...props} {...saveProps}>
          {mset.imperial ? t('imperialUnits') : t('metricUnits')}
        </EditRow>
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      {props.account.control >= conf.account.sets.notes ? (
        <EditRow title={t('notes')} field="notes" {...props} {...saveProps}>
          <Markdown>{mset.notes}</Markdown>
        </EditRow>
      ) : null}

      <EditSectionTitle title={t('measies')} />
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
      {filterMeasurements().map((m) => (
        <MeasieRow key={m} m={m} {...props} {...saveProps} />
      ))}
    </div>
  )
}

const MeasurementsSet = ({ mset, t, account, backend, refresh }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const { setModal } = useContext(ModalContext)

  // Hooks
  const toast = useToast()

  const remove = async () => {
    startLoading()
    const result = await backend.removeSet(mset.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    // We obviously did not add a key here, but rather removed one
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

  return (
    <Collapse
      primary
      top
      bottom
      title={
        <>
          <img src={mset.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
          <span>{mset.name}</span>
        </>
      }
      openTitle={mset.name}
      buttons={[
        <button
          key="rm"
          className="btn btn-error hover:text-error-content border-0"
          onClick={account.control > 4 ? remove : removeModal}
        >
          <TrashIcon key="button2" />
        </button>,
      ]}
    >
      <EditMeasurementsSet
        {...{ t, mset, account, backend, toast, refresh, setModal, startLoading, stopLoading }}
      />
    </Collapse>
  )
}

// Component for the 'new/apikey' page
//export const NewApikey = ({ app, standAlone = false }) => {
//  const { account, token } = useAccount()
//  const backend = useBackend(token)
//  const { t } = useTranslation(ns)
//  const toast = useToast()
//
//  const [keys, setKeys] = useState([])
//  const [generate, setGenerate] = useState(false)
//  const [added, setAdded] = useState(0)
//
//  const oneAdded = () => setAdded(added + 1)
//
//  return (
//    <div className="max-w-xl xl:pl-4">
//      <NewKey {...{ app, t, account, setGenerate, backend, toast, oneAdded, standAlone }} />
//    </div>
//  )
//}

// Component for the account/sets page
export const Sets = ({ title = true }) => {
  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const { CollapseButton, closeCollapseButton } = useCollapseButton()

  // State
  const [sets, setSets] = useState([])
  const [added, setAdded] = useState(0)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) setSets(result.data.sets)
    }
    getSets()
  }, [added])

  // Helper method to force a refresh
  const refresh = () => {
    setAdded(added + 1)
  }

  return (
    <div className="max-w-2xl xl:pl-4">
      {title ? <h2>{t('sets')}</h2> : null}
      {orderBy(sets, ['name'], ['asc']).map((mset) => (
        <MeasurementsSet {...{ account, mset, t, backend, refresh }} key={mset.id} />
      ))}
      <CollapseButton
        primary
        title={t('newSet')}
        className="btn btn-primary w-full capitalize mt-4"
      >
        <NewSet {...{ t, account, backend, toast, refresh, closeCollapseButton }} title={false} />
      </CollapseButton>
      <BackToAccountButton />
    </div>
  )
}
