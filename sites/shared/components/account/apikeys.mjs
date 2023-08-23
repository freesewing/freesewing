// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { shortDate, formatNumber } from 'shared/utils.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton, Choice } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { LeftIcon, PlusIcon, CopyIcon, RightIcon, TrashIcon } from 'shared/components/icons.mjs'
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { PageLink, Link, WebLink } from 'shared/components/link.mjs'

export const ns = ['account', 'status']

const ExpiryPicker = ({ t, expires, setExpires }) => {
  const router = useRouter()
  const { locale } = router
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
        <b> {shortDate(locale, expires)}</b>
      </Popout>
    </>
  )
}

const CopyInput = ({ text }) => {
  const { t } = useTranslation(['status'])
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const [copied, setCopied] = useState(false)

  const showCopied = () => {
    setCopied(true)
    setLoadingStatus([true, t('copiedToClipboard'), true, true])
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flez-row gap-2 items-center w-full">
      <LoadingStatus />
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

export const Row = ({ title, children }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2">
    <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">{title}</div>
    <div className="grow">{children}</div>
  </div>
)

export const Apikey = ({ apikey }) => {
  const { t } = useTranslation(ns)
  const router = useRouter()
  const { locale } = router

  return apikey ? (
    <div>
      <Row title={t('keyName')}>{apikey.name}</Row>
      <Row title={t('created')}>{shortDate(locale, apikey.createdAt)}</Row>
      <Row title={t('expires')}>{shortDate(locale, apikey.expiresAt)}</Row>
      <Row title="Key ID">{apikey.key}</Row>
      <div className="flex flex-row flex-wrap md:gap-2 md:items-center md:justify-between mt-8">
        <button
          className="w-full md:w-auto btn btn-secondary pr-6 flex flex-row items-center gap-2"
          onClick={() => router.push('/account/apikeys')}
        >
          <LeftIcon />
          {t('apikeys')}
        </button>
      </div>
    </div>
  ) : null
}

const ShowKey = ({ apikey, t, clear }) => {
  const router = useRouter()
  const { locale } = router

  return (
    <div>
      <Popout warning compact>
        {t('keySecretWarning')}
      </Popout>
      <Row title={t('keyName')}>{apikey.name}</Row>
      <Row title={t('created')}>{shortDate(locale, apikey.createdAt)}</Row>
      <Row title={t('created')}>{shortDate(locale, apikey.expiresAt)}</Row>
      <Row title="Key ID">
        <CopyInput text={apikey.key} />
      </Row>
      <Row title="Key Secret">
        <CopyInput text={apikey.secret} />
      </Row>
      <div className="flex flex-row flex-wrap md:gap-2 md:items-center md:justify-between mt-8">
        <button
          className="w-full md:w-auto btn btn-secondary pr-6 flex flex-row items-center gap-2"
          onClick={() => router.push('/account/apikeys')}
        >
          <LeftIcon />
          {t('apikeys')}
        </button>
        <button className="btn btn-primary w-full mt-2 md:w-auto md:mt-0" onClick={clear}>
          <PlusIcon />
          {t('newApikey')}
        </button>
      </div>
    </div>
  )
}

const NewKey = ({ t, account, setGenerate, backend, title = true }) => {
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [expires, setExpires] = useState(Date.now())
  const [apikey, setApikey] = useState(false)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const levels = account.role === 'admin' ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4]

  const createKey = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.createApikey({
      name,
      level,
      expiresIn: Math.floor((expires.valueOf() - Date.now().valueOf()) / 1000),
    })
    if (result.success) {
      setLoadingStatus([true, 'nailedIt', true, true])
      setApikey(result.data.apikey)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const clear = () => {
    setApikey(false)
    setGenerate(false)
    setName('')
    setLevel(1)
  }

  return (
    <div>
      <LoadingStatus />
      {apikey ? (
        <ShowKey {...{ apikey, t, clear }} />
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

// Component for the 'new/apikey' page
export const NewApikey = () => {
  // Hooks
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const { account } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)

  // State
  const [generate, setGenerate] = useState(false)
  const [added, setAdded] = useState(0)

  // Helper method to force refresh
  const keyAdded = () => setAdded(added + 1)

  return (
    <div className="max-w-2xl xl:pl-4">
      <LoadingStatus />
      <NewKey
        {...{
          t,
          account,
          generate,
          setGenerate,
          backend,
          keyAdded,
        }}
      />
    </div>
  )
}

// Component for the account/apikeys page
export const Apikeys = () => {
  const router = useRouter()
  const { locale } = router

  // Hooks
  const { account } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus, LoadingProgress } = useLoadingStatus()

  // State
  const [keys, setKeys] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Effects
  useEffect(() => {
    const getApikeys = async () => {
      const result = await backend.getApikeys()
      if (result.success) setKeys(result.data.apikeys)
    }
    getApikeys()
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
    if (selCount === keys.length) setSelected({})
    else {
      const newSelected = {}
      for (const key of keys) newSelected[key.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more apikeys
  const removeSelectedApikeys = async () => {
    let i = 0
    for (const key in selected) {
      i++
      await backend.removeApikey(key)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingApikeys')} />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  return (
    <div className="max-w-4xl xl:pl-4">
      <LoadingStatus />
      <p className="text-right">
        <Link className="btn btn-primary capitalize btn-lg" bottom primary href="/new/apikey">
          {t('newApikey')}
        </Link>
      </p>
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelectedApikeys}>
          <TrashIcon /> {selCount} {t('apikeys')}
        </button>
      ) : null}
      <table className="table table-auto">
        <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
          <tr className="b">
            <th className="text-base-300 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                onClick={toggleSelectAll}
                checked={keys.length === selCount}
              />
            </th>
            <th className="text-base-300 text-base">{t('keyName')}</th>
            <th className="text-base-300 text-base">
              <span className="hidden md:inline">{t('keyLevel')}</span>
              <span role="img" className="inline md:hidden">
                🔐
              </span>
            </th>
            <th className="text-base-300 text-base">{t('keyExpires')}</th>
            <th className="text-base-300 text-base hidden md:block">{t('apiCalls')}</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((apikey, i) => (
            <tr key={i}>
              <td className="text-base font-medium">
                <input
                  type="checkbox"
                  checked={selected[apikey.id] ? true : false}
                  className="checkbox checkbox-secondary"
                  onClick={() => toggleSelect(apikey.id)}
                />
              </td>
              <td className="text-base font-medium">
                <PageLink href={`/account/apikeys/${apikey.id}`} txt={apikey.name} />
              </td>
              <td className="text-base font-medium">
                {apikey.level}
                <small className="hidden md:inline pl-2 text-base-300 italic">
                  ({t(`keyLevel${apikey.level}`)})
                </small>
              </td>
              <td className="text-base font-medium">
                {shortDate(locale, apikey.expiresAt, false)}
              </td>
              <td className="text-base font-medium hidden md:block">
                {formatNumber(apikey.calls)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToAccountButton />
      {account.control < 5 ? (
        <Popout link>
          <h5>{t('keyDocsTitle')}</h5>
          <p>{t('keyDocsMsg')}</p>
          <p className="text-right">
            <a
              className="btn btn-secondary mt-2"
              href="https://freesewing.dev/reference/backend/apikeys"
            >
              FreeSewing.dev
              <RightIcon />
            </a>
          </p>
        </Popout>
      ) : null}
    </div>
  )
}
