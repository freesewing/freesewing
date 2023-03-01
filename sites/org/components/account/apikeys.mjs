// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Dependencies
import { DateTime } from 'luxon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// Components
import { BackToAccountButton, Choice } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { CopyIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { TrashIcon } from 'shared/components/icons.mjs'
import { LeftIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'toast']

const ExpiryPicker = ({ t, expires, setExpires }) => {
  const [months, setMonths] = useState(1)

  // Run update when component mounts
  useEffect(() => update(months), [])

  const update = (evt) => {
    const value = typeof evt === 'number' ? evt : evt.target.value
    setExpires(DateTime.now().plus({ months: value }))
    setMonths(value)
  }

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <input
          type="range"
          min="0"
          max={24}
          value={months}
          className="range range-secondary"
          onChange={update}
        />
      </div>
      <Popout note compact>
        {t('keyExpiresDesc')}
        <b> {expires.toHTTP()}</b>
      </Popout>
    </>
  )
}

const CopyInput = ({ text }) => {
  const { t } = useTranslation(['toast'])
  const toast = useToast()

  const [copied, setCopied] = useState(false)

  const showCopied = () => {
    setCopied(true)
    toast.success(<span>{t('copiedToClipboard')}</span>)
    window.setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="flex flez-row gap-2 items-center w-full">
      <input
        readOnly
        value={text}
        className="input w-full input-bordered flex flex-row"
        type="text"
      />
      <CopyToClipboard text={text} onCopy={showCopied}>
        <button className={`btn ${copied ? 'btn-success' : 'btn-secondary'}`}>
          <CopyIcon />
        </button>
      </CopyToClipboard>
    </div>
  )
}

const Row = ({ title, children }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2">
    <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">{title}</div>
    <div className="grow">{children}</div>
  </div>
)
const ShowKey = ({ apikey, t, clear }) => (
  <div>
    <Popout warning compact>
      {t('keySecretWarning')}
    </Popout>
    <Row title={t('keyName')}>{apikey.name}</Row>
    <Row title={t('created')}>{DateTime.fromISO(apikey.createdAt).toHTTP()}</Row>
    <Row title={t('expires')}>{DateTime.fromISO(apikey.expiresAt).toHTTP()}</Row>
    <Row title="Key ID">
      <CopyInput text={apikey.key} />
    </Row>
    <Row title="Key Secret">
      <CopyInput text={apikey.secret} />
    </Row>
    <button
      className="btn btn-secondary mt-8 pr-6 flex flex-row items-center gap-2"
      onClick={clear}
    >
      <LeftIcon />
      {t('apikeys')}
    </button>
  </div>
)

const NewKey = ({ app, t, setGenerate, keyAdded, backend, toast }) => {
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [expires, setExpires] = useState(DateTime.now())
  const [apikey, setApikey] = useState(false)

  const levels = app.account.role === 'admin' ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4]

  const createKey = async () => {
    app.startLoading()
    const result = await backend.createApikey({
      name,
      level,
      expiresIn: Math.floor((expires.valueOf() - DateTime.now().valueOf()) / 1000),
    })
    if (result.key) {
      toast.success(<span>{t('nailedIt')}</span>)
      setApikey(result)
      keyAdded()
    } else toast.for.backendError()
    app.stopLoading()
  }

  const clear = () => {
    setApikey(false)
    setGenerate(false)
  }

  return (
    <div>
      <h2>{t('newApikey')}</h2>
      {apikey ? (
        <>
          <ShowKey apikey={apikey} t={t} clear={clear} />
        </>
      ) : (
        <>
          <h3>{t('keyName')}</h3>
          <p>{t('keyNameDesc')}</p>
          <input
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            className="input w-full input-bordered flex flex-row"
            type="text"
            placeholder={'Alicia key'}
          />
          <h3>{t('keyExpires')}</h3>
          <ExpiryPicker {...{ t, expires, setExpires }} />
          <h3>{t('keyLevel')}</h3>
          {levels.map((l) => (
            <Choice val={l} t={t} update={setLevel} current={level} key={l}>
              <span className="block text-lg leading-5">{t(`keyLevel${l}`)}</span>
            </Choice>
          ))}
          <div className="flex flex-row gap-2 items-center w-full my-8">
            <button
              className="btn btn-primary grow capitalize"
              disabled={name.length < 1}
              onClick={createKey}
            >
              {t('newApikey')}
            </button>
            <button
              className="btn btn-primary btn-outline capitalize"
              onClick={() => setGenerate(false)}
            >
              {t('cancel')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const Apikey = ({ apikey, t, backend, keyAdded, app }) => {
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
    keyAdded()
    app.stopLoading()
  }

  const removeModal = () => {
    app.setModal(
      <div className="text-center">
        <h2>{t('areYouCertain')}</h2>
        <p>{t('deleteKeyWarning')}</p>
        <p className="flex flex-row gap-4 items-center justify-center">
          <button className="btn btn-neutral btn-outline px-8">{t('cancel')}</button>
          <button className="btn btn-error px-8" onClick={remove}>
            {t('delete')}
          </button>
        </p>
      </div>
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
          onClick={app.account.control > 4 ? remove : removeModal}
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

export const Apikeys = ({ app }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()

  const [keys, setKeys] = useState([])
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  useEffect(() => {
    const getApikeys = async () => {
      const allKeys = await backend.getApikeys()
      if (allKeys) setKeys(allKeys)
    }
    getApikeys()
  }, [added])

  const keyAdded = () => setAdded(added + 1)

  return (
    <div>
      {generate ? (
        <NewKey {...{ app, t, setGenerate, backend, toast, keyAdded }} />
      ) : (
        <>
          <h2>{t('apikeys')}</h2>
          {keys.map((apikey) => (
            <Apikey {...{ app, apikey, t, backend, keyAdded }} key={apikey.id} />
          ))}
          <button
            className="btn btn-primary w-full capitalize mt-4"
            onClick={() => setGenerate(true)}
          >
            {t('newApikey')}
          </button>
          <BackToAccountButton loading={app.loading} />
          {app.account.control < 5 ? (
            <Popout tip>
              <h5>Refer to FreeSewing.dev for details (English only)</h5>
              <p>
                This is an advanced feature aimed at developers or anyone who wants to interact with
                our backend directly. For details, please refer to{' '}
                <WebLink
                  href="https://freesewing.dev/reference/backend/api/apikeys"
                  txt="the API keys reference documentation"
                />{' '}
                on <WebLink href="https://freesewing.dev/" txt="FreeSewing.dev" />, our site for
                developers and contributors.
              </p>
            </Popout>
          ) : null}
        </>
      )}
    </div>
  )
}
