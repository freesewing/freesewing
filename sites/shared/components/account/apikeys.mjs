// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
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
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { TrashIcon } from 'shared/components/icons.mjs'
import { LeftIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

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
const ShowKey = ({ apikey, t, clear, standalone }) => {
  const router = useRouter()

  return (
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
        onClick={standalone ? () => router.push('/account/apikeys') : clear}
      >
        <LeftIcon />
        {t('apikeys')}
      </button>
    </div>
  )
}

const NewKey = ({
  t,
  account,
  setGenerate,
  keyAdded,
  backend,
  toast,
  startLoading,
  stopLoading,
  closeCollapseButton,
  standalone = false,
  title = true,
}) => {
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [expires, setExpires] = useState(DateTime.now())
  const [apikey, setApikey] = useState(false)

  const levels = account.role === 'admin' ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4]

  const createKey = async () => {
    startLoading()
    const result = await backend.createApikey({
      name,
      level,
      expiresIn: Math.floor((expires.valueOf() - DateTime.now().valueOf()) / 1000),
    })
    if (result.success) {
      toast.success(<span>{t('nailedIt')}</span>)
      setApikey(result.data.apikey)
      keyAdded()
    } else toast.for.backendError()
    stopLoading()
    if (closeCollapseButton) closeCollapseButton()
  }

  const clear = () => {
    setApikey(false)
    setGenerate(false)
  }

  return (
    <div>
      {title ? <h2>{t('newApikey')}</h2> : null}
      {apikey ? (
        <>
          <ShowKey {...{ apikey, t, clear, standalone }} />
        </>
      ) : (
        <>
          <h5>{t('keyName')}</h5>
          <p>{t('keyNameDesc')}</p>
          <input
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            className="input w-full input-bordered flex flex-row"
            type="text"
            placeholder={'Alicia key'}
          />
          <h5 className="mt-4">{t('keyExpires')}</h5>
          <ExpiryPicker {...{ t, expires, setExpires }} />
          <h5 className="mt-4">{t('keyLevel')}</h5>
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
          </div>
        </>
      )}
    </div>
  )
}

const Apikey = ({ apikey, t, account, backend, keyAdded, startLoading, stopLoading }) => {
  const { setModal } = useContext(ModalContext)
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
    startLoading()
    const result = await backend.removeApikey(apikey.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    // We obviously did not add a key here, but rather removed one
    keyAdded()
    stopLoading()
  }

  const removeModal = () => {
    setModal(
      <ModalWrapper slideFrom="top">
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
      title={title}
      openTitle={apikey.name}
      primary
      valid={!expired}
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
export const NewApikey = ({ standalone = false }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [keys, setKeys] = useState([])
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  // Helper method to force refresh
  const keyAdded = () => setAdded(added + 1)

  return (
    <div className="max-w-xl xl:pl-4">
      <NewKey
        {...{
          t,
          account,
          setGenerate,
          backend,
          toast,
          keyAdded,
          standalone,
          startLoading,
          stopLoading,
        }}
      />
    </div>
  )
}

// Component for the account/apikeys page
export const Apikeys = () => {
  // Context
  const { startLoading, stopLoading, loading } = useContext(LoadingContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const { CollapseButton, closeCollapseButton } = useCollapseButton()

  // State
  const [keys, setKeys] = useState([])
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  // Effects
  useEffect(() => {
    const getApikeys = async () => {
      const result = await backend.getApikeys()
      if (result.success) setKeys(result.data.apikeys)
    }
    getApikeys()
  }, [added])

  // Helper method to force refresh
  const keyAdded = () => setAdded(added + 1)

  return (
    <div className="max-w-xl xl:pl-4">
      {generate ? (
        <NewKey
          {...{
            t,
            account,
            setGenerate,
            backend,
            toast,
            keyAdded,
            startLoading,
            stopLoading,
          }}
        />
      ) : (
        <>
          <h2>{t('apikeys')}</h2>
          {keys.map((apikey) => (
            <Apikey
              {...{ account, apikey, t, backend, keyAdded, startLoading, stopLoading }}
              key={apikey.id}
            />
          ))}
          <CollapseButton
            title={t('newApikey')}
            className="btn btn-primary w-full capitalize mt-4"
            bottom
            primary
          >
            <NewKey
              title={false}
              {...{
                t,
                account,
                setGenerate,
                backend,
                toast,
                keyAdded,
                startLoading,
                stopLoading,
                closeCollapseButton,
              }}
            />
          </CollapseButton>
          <BackToAccountButton loading={loading} />
          {account.control < 5 ? (
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
