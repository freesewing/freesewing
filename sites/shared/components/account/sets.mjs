// Dependencies
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
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

const NewSet = ({ app, t, account, setGenerate, oneAdded, backend, toast, standAlone = false }) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [set, setSet] = useState(false)
  const [activeTab, setActiveTab] = useState('edit')

  const createSet = async () => {
    app.startLoading()
    const result = await backend.createSet({
      name,
    })
    if (result.success) {
      toast.success(<span>{t('nailedIt')}</span>)
      setSet(result.data.set)
      oneAdded()
    } else toast.for.backendError()
    app.stopLoading()
  }

  const clear = () => {
    setSet(false)
    setGenerate(false)
  }
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
      {account.control > 2 ? (
        <>
          <h3>{t('notes')}</h3>
          <p>{t('setNotesDesc')}</p>
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
                onChange={(evt) => setNotes(evt.target.value)}
                value={notes}
              />
            ) : (
              <div className="text-left px-4 border w-full">
                <Markdown>{notes}</Markdown>
              </div>
            )}
          </div>
        </>
      ) : null}
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

const MeasurementsSet = ({ apikey, t, account, backend, oneAdded, app }) => {
  const toast = useToast()

  const fields = {
    id: 'ID',
    name: t('keyName'),
    level: t('keyLevel'),
    expiresAt: t('expires'),
    createdAt: t('created'),
  }

  const expired = DateTime.fromISO(apikey.expiresAt).valueOf() < DateTime.now().valueOf()

  const remove = async () => {
    app.startLoading()
    const result = await backend.removeApikey(apikey.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    // We obviously did not add a key here, but rather removed one
    oneAdded()
    app.stopLoading()
  }

  const removeModal = () => {
    app.setModal(
      <ModalWrapper app={app} slideFrom="top">
        <h2>{t('areYouCertain')}</h2>
        <p>{t('deleteKeyWarning')}</p>
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
      <span>{apikey.name}</span>
      <span className="font-normal">
        {t('expires')}: <b>{DateTime.fromISO(apikey.expiresAt).toLocaleString()}</b>
      </span>
      <span className="opacity-50">|</span>
      <span className="font-normal">
        {t('keyLevel')}: <b>{apikey.level}</b>
      </span>
    </div>
  )

  return (
    <Collapse
      title={[title, null]}
      valid={!expired}
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
      {expired ? (
        <Popout warning compact>
          <b>{t('keyExpired')}</b>
        </Popout>
      ) : null}
      {Object.entries(fields).map(([key, title]) => (
        <Row title={title} key={key}>
          {apikey[key]}
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
export const Sets = ({ app }) => {
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  const [sets, setSets] = useState([])
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) setSets(result.data.sets)
    }
    getSets()
  }, [added])

  const oneAdded = () => setAdded(added + 1)

  return (
    <div className="max-w-xl xl:pl-4">
      {generate ? (
        <NewSet {...{ app, t, account, setGenerate, backend, toast, oneAdded }} />
      ) : (
        <>
          <h2>{t('sets')}</h2>
          {sets.map((set) => (
            <Set {...{ app, account, apikey, t, backend, oneAdded }} key={apikey.id} />
          ))}
          <button
            className="btn btn-primary w-full capitalize mt-4"
            onClick={() => setGenerate(true)}
          >
            {t('newSet')}
          </button>
          <BackToAccountButton loading={app.state.loading} />
        </>
      )}
    </div>
  )
}
