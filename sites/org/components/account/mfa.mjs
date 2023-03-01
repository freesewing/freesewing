// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { Bullet } from 'site/components/bullet.mjs'

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

export const MfaSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()

  const [enable, setEnable] = useState(false)
  const [disable, setDisable] = useState(false)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const enableMfa = async () => {
    app.startLoading()
    const result = await backend.enableMfa()
    if (result) setEnable(result)
    app.stopLoading()
  }

  const disableMfa = async () => {
    app.startLoading()
    const result = await backend.disableMfa({
      mfa: false,
      password,
      token: code,
    })
    if (result) {
      if (result === true) toast.warning(<span>{t('mfaDisabled')}</span>)
      else toast.for.backendError()
      setDisable(false)
      setEnable(false)
      setCode('')
      setPassword('')
    }
    app.stopLoading()
  }

  const confirmMfa = async () => {
    app.startLoading()
    const result = await backend.confirmMfa({
      mfa: true,
      secret: enable.secret,
      token: code,
    })
    if (result === true) toast.success(<span>{t('mfaEnabled')}</span>)
    else toast.for.backendError()
    setEnable(false)
    setCode('')
    app.stopLoading()
  }

  let titleText = app.account.mfaEnabled ? t('mfaEnabled') : t('mfaDisabled')
  if (enable) titleText = t('mfaSetup')

  return (
    <>
      {title ? <h2 className="text-4xl">{titleText}</h2> : null}
      {enable ? (
        <>
          <div className="flex flex-row items-center justify-center">
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
        {app.account.mfaEnabled ? (
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
      {!welcome && <BackToAccountButton loading={app.loading} />}
    </>
  )
}
