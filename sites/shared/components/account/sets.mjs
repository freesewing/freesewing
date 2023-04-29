// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import orderBy from 'lodash.orderby'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { BackToAccountButton, Choice } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { CopyIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { TrashIcon } from 'shared/components/icons.mjs'
import { LeftIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import { Tab } from './bio.mjs'

export const ns = ['account', 'toast']

const NewSet = ({ t, account, setGenerate, oneAdded, backend, toast, standAlone = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const router = useRouter()

  // State
  const [name, setName] = useState('')
  const [mset, setMset] = useState(false)

  // Helper method to create a new set
  const createSet = async () => {
    startLoading()
    const result = await backend.createSet({
      name,
    })
    if (result.success) {
      toast.success(<span>{t('nailedIt')}</span>)
      setMset(result.data.set)
      oneAdded()
    } else toast.for.backendError()
    stopLoading()
  }

  // Helper method to clear inputs
  const clear = () => {
    setMset(false)
    setGenerate(false)
  }

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  return (
    <div>
      <h2>{t('newSet')}</h2>
      <h3>{t('name')}</h3>
      <p>{t('setNameDesc')}</p>
      <input
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        className="input w-full input-bordered flex flex-row"
        type="text"
        placeholder={'Georg Cantor'}
      />
      <div className="flex flex-row gap-2 items-center w-full my-8">
        <button
          className="btn btn-primary grow capitalize"
          disabled={name.length < 1}
          onClick={createSet}
        >
          {t('newSet')}
        </button>
        <button
          className="btn btn-primary btn-outline capitalize"
          onClick={() => (standAlone ? router.push('/account/sets') : setGenerate(false))}
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  )
}

const Row = ({ title, children }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2">
    <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">{title}</div>
    <div className="grow">{children}</div>
  </div>
)

const MeasurementsSet = ({ apikey, t, account, backend, oneAdded }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)
  const { setModal } = useContext(ModalContext)

  // Hooks
  const toast = useToast()

  const fields = {
    id: 'ID',
    name: t('name'),
    level: t('keyLevel'),
    createdAt: t('created'),
  }

  const remove = async () => {
    startLoading()
    const result = await backend.removeSet(mset.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    // We obviously did not add a key here, but rather removed one
    oneAdded()
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
    <div className="flex flex-row gap-2 items-center inline-block justify-around w-full">
      <span>{mset.name}</span>
    </div>
  )

  //return <pre>{JSON.stringify(mset, null ,2)}</pre>
  return (
    <Collapse
      title={[title, null]}
      valid={true}
      buttons={[
        <button
          key="button1"
          className="z-10 btn btn-sm mr-4 bg-base-100 text-error hover:bg-error hover:text-error-content border-0"
          onClick={account.control > 4 ? remove : removeModal}
        >
          <TrashIcon key="button2" />
        </button>,
      ]}
    >
      <pre>{JSON.stringify(mset, null, 2)}</pre>
      {Object.entries(fields).map(([key, title]) => (
        <Row title={title} key={key}>
          {mset[key]}
        </Row>
      ))}
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
export const Sets = () => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [sets, setSets] = useState([])
  const [generate, setGenerate] = useState(false)
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
  const oneAdded = () => setAdded(added + 1)

  return (
    <div className="max-w-xl xl:pl-4">
      {generate ? (
        <NewSet {...{ t, account, setGenerate, backend, toast, oneAdded }} />
      ) : (
        <>
          <h2>{t('sets')}</h2>
          {orderBy(sets, ['name'], ['asc']).map((mset) => (
            <MeasurementsSet {...{ app, account, mset, t, backend, oneAdded }} key={mset.id} />
          ))}
          <button
            className="btn btn-primary w-full capitalize mt-4"
            onClick={() => setGenerate(true)}
          >
            {t('newSet')}
          </button>
          <BackToAccountButton loading={loading} />
        </>
      )}
    </div>
  )
}
