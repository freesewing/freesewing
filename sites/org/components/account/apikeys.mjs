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

export const ns = ['account', 'toast']

const ExpiryPicker = ({ t, expires, setExpires }) => {
  const [days, setDays] = useState(true) // False = months
  const [val, setVal] = useState(3)

  // Run update when component mounts
  useEffect(() => update(val), [])

  const update = (evt) => {
    const value = typeof evt === 'number' ? evt : evt.target.value
    setVal(value)
    const plus = {}
    if (days) plus.days = value
    else plus.months = value
    setExpires(DateTime.now().plus(plus))
  }

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <input
          type="range"
          min="0"
          max={days ? 30 : 24}
          value={val}
          className="range range-secondary"
          onChange={update}
        />
        <div className="btn-group btn-group-vertical">
          <button
            className={`btn btn-secondary btn-sm ${days ? '' : 'btn-outline'}`}
            onClick={() => setDays(true)}
          >
            {days ? (
              <span>
                {val}&nbsp;{t('days')}
              </span>
            ) : (
              t('days')
            )}
          </button>
          <button
            className={`btn btn-secondary btn-sm ${days ? 'btn-outline' : ''}`}
            onClick={() => {
              setDays(false)
              setVal(1)
            }}
          >
            {!days ? (
              <span>
                {val}&nbsp;{t('months')}
              </span>
            ) : (
              t('months')
            )}
          </button>
        </div>
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
      <input value={text} className="input w-full input-bordered flex flex-row" type="text" />
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
    <div className="w-24 text-left md:text-right block md:inline font-bold">{title}</div>
    <div className="grow">{children}</div>
  </div>
)
const ShowKey = ({ apikey, t, clear }) => (
  <div>
    <Row title={t('keyName')}>{apikey.name}</Row>
    <Row title={t('created')}>{DateTime.fromISO(apikey.createdAt).toHTTP()}</Row>
    <Row title={t('expires')}>{DateTime.fromISO(apikey.expiresAt).toHTTP()}</Row>
    <Row title="Key ID">
      <CopyInput text={apikey.key} />
    </Row>
    <Row title="Key Secret">
      <CopyInput text={apikey.secret} />
    </Row>
    <Popout warning compact>
      {t('keySecretWarning')}
    </Popout>
    <button className="btn btn-primary capitalize mt-4i w-full" onClick={clear}>
      {t('apikeys')}
    </button>
  </div>
)

const NewKey = ({ app, t, setGenerate, backend, toast }) => {
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
    console.log({ result })
    if (result.key) {
      toast.success(<span>{t('nailedIt')}</span>)
      setApikey(result)
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

export const Apikeys = ({ app }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()

  //const [keys, setKeys] = useState([])
  const [generate, setGenerate] = useState(false)

  //useEffect(() => {
  //  const getApikeys = () => {
  //    const allKeys = await backend.getApikeys()
  //    if (allKeys) setKeys(allKeys)
  //  }
  //  getApiKeys()
  //}, [ ])

  return (
    <>
      <div>
        {generate ? (
          <NewKey {...{ app, t, setGenerate, backend, toast }} />
        ) : (
          <>
            <h2>{t('apikeys')}</h2>
            <button className="btn btn-primary w-full capitalize" onClick={() => setGenerate(true)}>
              {t('newApikey')}
            </button>
            <BackToAccountButton loading={app.loading} />
            <Popout tip>
              <h5>Refer to FreeSewing.dev for details (English only)</h5>
              <p>
                This is an advanced feature aimed at developers or anyone who wants to interact with
                our backend directly. For details, please refer to{' '}
                <WebLink
                  href="https://freesewing.dev/reference/backend/api/apikeys"
                  txt="the API keys reference documentation"
                />{' '}
                on <WebLink href="https://freesewing.dev/" txt="FreeSewing.dev" /> our site for
                developers and contributors.
              </p>
            </Popout>
          </>
        )}
      </div>
    </>
  )
}
