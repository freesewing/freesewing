// Hooks
import { useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Dependencies
import { validateEmail, validateTld, horFlexClasses, horFlexClassesNoSm } from 'shared/utils.mjs'
// Components
import Link from 'next/link'
import { Robot } from 'shared/components/robot/index.mjs'
import {
  LeftIcon,
  HelpIcon,
  GoogleIcon,
  GitHubIcon,
  KeyIcon,
  SettingsIcon,
  EmailIcon,
  DownIcon,
} from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { EmailInput } from 'shared/components/inputs.mjs'

// Translation namespaces used on this page
export const ns = ['susi', 'errors']

export const SignUp = () => {
  // Context
  const { setModal } = useContext(ModalContext)

  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [result, setResult] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const updateEmail = (value) => {
    setEmail(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid === true ? true : false)
  }

  const signupHandler = async (evt) => {
    evt.preventDefault()
    if (!emailValid) {
      setLoadingStatus([true, t('susi:pleaseProvideValidEmail'), true, false])
      return
    }
    let res
    try {
      res = await backend.signUp({
        email,
        language: i18n.language,
        setResult,
      })
    } catch (err) {
      // Here to keep the stupid linter happy
      console.log(err)
    }
    if (res.data.result === 'created') setResult('success')
    else {
      setModal(
        <ModalWrapper bg="base-100 lg:bg-base-300">
          <div className="bg-base-100 rounded-lg p-4 lg:px-8 max-w-xl lg:shadow-lg">
            <h3>An error occured while trying to process your request</h3>
            <Robot pose="ohno" className="m-auto w-56" embed />
            <p className="text-lg">{t('susi:err2')}</p>
            <p className="text-lg">{t('susi:err3')}</p>
            <div className="flex flex-row gap-4 items-center justify-center p-8 flex-wrap">
              <button className="btn btn-primary px-8" onClick={() => setResult(false)}>
                <LeftIcon />
                <span className="pl-2">{t('susi:back')}</span>
              </button>
              <Link href="/support" className="btn btn-primary btn-outline px-8">
                <HelpIcon />
                <span className="pl-2">{t('susi:contact')}</span>
              </Link>
            </div>
          </div>
        </ModalWrapper>
      )
    }
  }

  const initOauth = async (provider) => {
    setLoadingStatus([true, t(`status:contactingBackend`)])
    const result = await backend.oauthInit({ provider, language: i18n.language })
    if (result.success) {
      setLoadingStatus([true, t(`status:contacting${provider}`)])
      window.location.href = result.data.authUrl
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-inherit">
        {result ? (
          result === 'success' ? (
            <span>{t('susi:emailSent')}!</span>
          ) : (
            <span>An error occured while trying to process your request</span>
          )
        ) : (
          <span>{t('susi:createAFreeSewingAccount')}</span>
        )}
      </h2>

      {result ? (
        result === 'success' ? (
          <>
            <p className="text-inherit text-lg">
              {t('susi:checkYourInbox')} <b>FreeSewing.org</b>
            </p>
            <p className="text-inherit text-lg">{t('susi:clickSignupLink')}</p>
            <div className="flex flex-row gap-4 items-center justify-center p-8">
              <button className="btn btn-ghost" onClick={() => setResult(false)}>
                {t('susi:back')}
              </button>
              <Link href="/support" className="btn btn-ghost">
                {t('susi:contact')}
              </Link>
            </div>
          </>
        ) : (
          <>
            <Robot pose="ohno" className="m-auto w-56 text-inherit" embed />
            <p className="text-inherit text-lg">{t('susi:err2')}</p>
            <p className="text-inherit text-lg">{t('susi:err3')}</p>
            <div className="flex flex-row gap-4 items-center justify-center p-8">
              <button className="btn btn-ghost" onClick={() => setResult(false)}>
                {t('susi:back')}
              </button>
              <Link href="/support" className="btn btn-ghost">
                {t('susi:contact')}
              </Link>
            </div>
          </>
        )
      ) : (
        <>
          <p className="text-inherit">{t('toReceiveSignupLink')}:</p>
          <form onSubmit={signupHandler}>
            <EmailInput
              id="signup-email"
              label={t('susi:emailAddress')}
              current={email}
              original={''}
              valid={() => emailValid}
              placeholder={t('susi:emailAddress')}
              update={updateEmail}
            />
            <button
              className={`btn btn-primary btn-lg mt-2 w-full ${horFlexClasses} disabled:bg-neutral disabled:text-neutral-content disabled:opacity-50`}
              type="submit"
            >
              <EmailIcon />
              {t('susi:emailSignupLink')}
            </button>
          </form>
          {showAll ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-4">
                {['Google', 'GitHub'].map((provider) => (
                  <button
                    key={provider}
                    id={provider}
                    className={`${horFlexClasses} btn btn-secondary`}
                    onClick={() => initOauth(provider)}
                  >
                    {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
                    <span>{t('susi:signUpWithProvider', { provider })}</span>
                  </button>
                ))}
              </div>
              <Link
                className={`${horFlexClassesNoSm} w-full btn btn-lg btn-neutral mt-2`}
                href="/signup"
              >
                <span className="hidden md:block">
                  <KeyIcon className="h-10 w-10" />
                </span>
                {t('susi:signInHere')}
              </Link>
              <Link
                className={`${horFlexClassesNoSm} w-full btn btn-neutral btn-outline mt-2`}
                href="/migrate"
              >
                <span className="hidden md:block">
                  <SettingsIcon />
                </span>
                {t('susi:migrateV2Account')}
              </Link>
              <div className="flex flex-row justify-center mt-2">
                <button
                  onClick={() => setShowAll(false)}
                  className={`btn btn-ghost ${horFlexClasses}`}
                >
                  <DownIcon className="w-6 h-6 rotate-180" />
                  {t('susi:fewerOptions')}
                  <DownIcon className="w-6 h-6 rotate-180" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-center mt-2">
              <button
                onClick={() => setShowAll(true)}
                className={`btn btn-ghost ${horFlexClasses}`}
              >
                <DownIcon />
                {t('susi:moreOptions')}
                <DownIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
