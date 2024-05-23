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
import { PasswordInput } from 'shared/components/inputs.mjs'
import { CopyToClipboard } from 'shared/components/copy-to-clipboard.mjs'

export const ns = ['account']

const CodeInput = ({ code, setCode, t }) => (
  <input
    value={code}
    onChange={(evt) => setCode(evt.target.value)}
    className="input w-full text-4xl  input-bordered input-lg flex flex-row text-center mb-8 tracking-widest"
    type="text"
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
  const [scratchCodes, setScratchCodes] = useState(false)

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
      setScratchCodes(result.data.scratchCodes)
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
          <p className="flex flex-row items-center justify-center">{enable.secret}</p>
          <Bullet num="1">{t('mfaAdd')}</Bullet>
          <Bullet num="2">{t('confirmWithMfa')}</Bullet>
          <input
            value={code}
            onChange={(evt) => setCode(evt.target.value)}
            className="input w-64 m-auto text-4xl  input-bordered input-lg flex flex-row text-center mb-8 tracking-widest"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
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
            <PasswordInput
              current={password}
              update={setPassword}
              placeholder={t('passwordPlaceholder')}
              valid={() => true}
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
      {scratchCodes ? (
        <>
          <h3>{t('account:mfaScratchCodes')}</h3>
          <p>{t('account:mfaScratchCodesMsg1')}</p>
          <p>{t('account:mfaScratchCodesMsg2')}</p>
          <div className="hljs my-4">
            <div className=" flex flex-row justify-between items-center text-xs font-medium text-warning mt-1 border-b border-neutral-content border-opacity-25 px-4 py-1 mb-2 lg:text-sm">
              <span>{t('account:mfaScratchCodes')}</span>
              <CopyToClipboard
                content={
                  'FreeSewing ' +
                  t('account:mfaScratchCodes') +
                  ':\n' +
                  scratchCodes.map((code) => code + '\n').join('')
                }
              />
            </div>
            <pre className="language-shell hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4">
              {scratchCodes.map((code) => code + '\n')}
            </pre>
          </div>
        </>
      ) : (
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
      )}
      {!welcome && <BackToAccountButton />}
    </div>
  )
}
