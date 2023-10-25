// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Bullet } from 'shared/components/bullet.mjs'

export const ns = ['account']

const CodeInput = ({ code, setCode, t }) => (
  <input
    value={code}
    onChange={(evt) => setCode(evt.target.value)}
    className="input w-full text-4xl  input-bordered input-lg flex flex-row text-center mb-8 tracking-widest"
    type="number"
    placeholder={t('000000')}
  />
)

export const MfaSettings = ({ title = false, welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [enable, setEnable] = useState(false)
  const [disable, setDisable] = useState(false)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  // Helper method to enable MFA
  const enableMfa = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.enableMfa()
    if (result.success) {
      setEnable(result.data.mfa)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  // Helper method to disable MFA
  const disableMfa = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.disableMfa({
      mfa: false,
      password,
      token: code,
    })
    if (result) {
      if (result.success) {
        setAccount(result.data.account)
        setLoadingStatus([true, 'settingsSaved', true, true])
      } else setLoadingStatus([true, 'backendError', true, false])
      setDisable(false)
      setEnable(false)
      setCode('')
      setPassword('')
    }
  }

  // Helper method to confirm MFA
  const confirmMfa = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.confirmMfa({
      mfa: true,
      secret: enable.secret,
      token: code,
    })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
    setEnable(false)
    setCode('')
  }

  // Figure out what title to use
  let titleText = account.mfaEnabled ? t('mfaEnabled') : t('mfaDisabled')
  if (enable) titleText = t('mfaSetup')

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{titleText}</h2> : null}
      {enable ? (
        <>
          <div className="flex flex-row items-center justify-center px-8 lg:px-36">
            <div dangerouslySetInnerHTML={{ __html: enable.qrcode }} />
          </div>
          <Bullet num="1">{t('mfaAdd')}</Bullet>
          <Bullet num="2">{t('confirmWithMfa')}</Bullet>
          <input
            value={code}
            onChange={(evt) => setCode(evt.target.value)}
            className="input w-64 m-auto text-4xl  input-bordered input-lg flex flex-row text-center mb-8 tracking-widest"
            type="number"
            placeholder={t('000000')}
          />
          <button className="btn btn-success btn-lg block w-full" onClick={confirmMfa}>
            {t('enableMfa')}
          </button>
        </>
      ) : null}
      {disable ? (
        <div className="my-8">
          <Bullet num="1">
            <h5>{t('confirmWithPassword')}</h5>
            <input
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="input w-full input-bordered flex flex-row"
              type="text"
              placeholder={t('passwordPlaceholder')}
            />
          </Bullet>
          <Bullet num="2">
            <h5>{t('confirmWithMfa')}</h5>
            <CodeInput code={code} setCode={setCode} t={t} />
          </Bullet>
          <button
            className="btn btn-error btn-lg block w-full"
            onClick={disableMfa}
            disabled={code.length < 4 || password.length < 3}
          >
            {t('disableMfa')}
          </button>
        </div>
      ) : null}
      <div className="flex flex-row items-center mt-4">
        {account.mfaEnabled ? (
          disable ? null : (
            <button className="btn btn-primary block w-full" onClick={() => setDisable(true)}>
              {t('disableMfa')}
            </button>
          )
        ) : enable ? null : (
          <div>
            <button className="btn btn-primary block w-full" onClick={enableMfa}>
              {t('mfaSetup')}
            </button>
            <Popout tip>
              <h5>{t('mfaTipTitle')}</h5>
              <p>{t('mfaTipMsg')}</p>
            </Popout>
          </div>
        )}
      </div>
      {!welcome && <BackToAccountButton />}
    </div>
  )
}
