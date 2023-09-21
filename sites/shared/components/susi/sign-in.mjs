// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { horFlexClasses, horFlexClassesNoSm, capitalize } from 'shared/utils.mjs'
// Components
import Link from 'next/link'
import {
  EmailIcon,
  KeyIcon,
  LockIcon,
  WarningIcon,
  GoogleIcon,
  GitHubIcon,
  FreeSewingIcon,
  SettingsIcon,
  UserIcon,
} from 'shared/components/icons.mjs'
import { StringInput, PasswordInput } from 'shared/components/inputs.mjs'

export const ns = ['susi', 'errors', 'status']

export const SignIn = () => {
  const { setAccount, setToken, seenUser, setSeenUser } = useAccount()
  const { t, i18n } = useTranslation(ns)
  const backend = useBackend()
  const router = useRouter()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [magicLink, setMagicLink] = useState(true)
  const [signInFailed, setSignInFailed] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [seenBefore, setSeenBefore] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && signInFailed) {
      window.setTimeout(() => setSignInFailed(false), 1750)
    }
  }, [signInFailed])

  // Avoid SSR rendering mismatch by setting this in effect
  useEffect(() => {
    if (seenUser) {
      setSeenBefore(seenUser)
      setUsername(seenUser)
    } else {
      setSeenBefore(false)
      setUsername('')
    }
  }, [seenUser])

  const signinHandler = async (evt) => {
    evt.preventDefault()
    setLoadingStatus([true, 'processingUpdate'])
    const result = magicLink
      ? await backend.signIn({ username, password: false })
      : await backend.signIn({ username, password })
    // Sign-in succeeded
    if (result.success) {
      if (magicLink) {
        setLoadingStatus([true, t('susi:emailSent'), true, true])
        setMagicLinkSent(true)
      } else {
        setAccount(result.data.account)
        setToken(result.data.token)
        setSeenUser(result.data.account.username)
        setLoadingStatus([
          true,
          t('susi:welcomeBackName', { name: result.data.account.username }),
          true,
          true,
        ])
        router.push('/account')
      }
    }
    // Sign-in failed
    if (result.response?.response?.status === 401) {
      const msg = magicLink ? t('susi:notFound') : t('susi:signInFailed')
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
    }
    // Bad request
    if (result.status === 400) {
      let msg
      if (result.data.error === 'usernameMissing') msg = t('susi:usernameMissing')
      else if (result.data.error === 'passwordMissing') msg = t('susi:passwordMissing')
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
    }
  }

  const initOauth = async (provider) => {
    setLoadingStatus([true, t(`susi:contactingBackend`)])
    const result = await backend.oauthInit({ provider, language: i18n.language })
    if (result.success) {
      setLoadingStatus([true, t(`susi:contacting${capitalize(provider)}`)])
      window.location.href = result.data.authUrl
    }
  }

  const btnClasses = `btn capitalize w-full mt-4 ${
    signInFailed ? 'btn-warning' : 'btn-primary'
  } transition-colors ease-in-out duration-300 ${horFlexClasses}`
  const noBueno = (
    <>
      <WarningIcon />
      <span className="pl-2">{signInFailed}</span>
      <WarningIcon />
    </>
  )

  if (magicLinkSent)
    return (
      <>
        <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">
          {t('susi:emailSent')}
        </h1>
        <p className="text-inherit text-lg text-center">
          {t('susi:checkYourInbox')} <b>FreeSewing.org</b>
        </p>
        <p className="text-inherit text-lg text-center">{t('susi:clickSigninLink')}</p>
        <div className="flex flex-row gap-4 items-center justify-center p-8">
          <button className="btn btn-ghost" onClick={() => setMagicLinkSent(false)}>
            {t('susi:back')}
          </button>
          <Link href="/support" className="btn btn-ghost">
            {t('susi:contact')}
          </Link>
        </div>
      </>
    )

  return (
    <>
      <h2>{seenBefore ? t('susi:welcomeBackName', { name: seenUser }) : t('susi:welcome')}</h2>
      <p>{t('susi:signInToThing', { thing: 'FreeSewing' })}:</p>
      {!seenBefore && (
        <StringInput
          label={t('susi:emailUsernameId')}
          update={setUsername}
          placeholder={t('susi:emailUsernameId')}
          value={username}
          valid={(val) => val.length > 1}
        />
      )}
      {magicLink ? (
        <button
          className={`${btnClasses} btn-lg`}
          tabIndex="-1"
          role="button"
          onClick={signinHandler}
        >
          {signInFailed ? (
            noBueno
          ) : (
            <>
              <span className="hidden lg:block">
                <EmailIcon />
              </span>
              <span className="pl-2">{t('susi:emailSigninLink')}</span>
              <span className="hidden lg:block">
                <EmailIcon />
              </span>
            </>
          )}
        </button>
      ) : (
        <>
          <PasswordInput
            label={t('susi:password')}
            update={setPassword}
            current={password}
            valid={(val) => val.length > 0}
          />
          <button className={btnClasses} tabIndex="-1" role="button" onClick={signinHandler}>
            {signInFailed ? (
              noBueno
            ) : (
              <>
                <span className="hidden lg:block">
                  <KeyIcon />
                </span>
                <span className="pl-2">{t('susi:signIn')}</span>
                <span className="hidden lg:block">
                  <LockIcon />
                </span>
              </>
            )}
          </button>
        </>
      )}
      <button
        className={`block md:flex md:flex-row md:justify-between md:items-center  btn btn-primary btn-outline w-full mt-8`}
        onClick={() => setMagicLink(!magicLink)}
      >
        <span className="hidden lg:block">{magicLink ? <LockIcon /> : <EmailIcon />}</span>
        {magicLink ? t('susi:usePassword') : t('susi:emailSigninLink')}
        <span className="hidden lg:block">{magicLink ? <KeyIcon /> : <EmailIcon />}</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-2">
        {['Google', 'Github'].map((provider) => (
          <button
            key={provider}
            id={provider}
            className={`${horFlexClasses} btn btn-secondary`}
            onClick={() => initOauth(provider)}
          >
            {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
            <span>{t('susi:signInWithProvider', { provider })}</span>
          </button>
        ))}
      </div>
      {seenBefore ? (
        <button
          className={`${horFlexClassesNoSm} btn btn-neutral btn-outline mt-2 w-full`}
          onClick={() => setSeenUser(false)}
        >
          <UserIcon />
          {t('susi:signInAsOtherUser')}
        </button>
      ) : (
        <Link className={`${horFlexClasses} btn btn-lg btn-neutral mt-2`} href="/signup">
          <FreeSewingIcon className="h-10 w-10" />
          {t('susi:signUpHere')}
        </Link>
      )}
      <Link className={`${horFlexClasses} btn btn-neutral btn-outline mt-2`} href="/migrate">
        <SettingsIcon />
        {t('susi:migrateV2Account')}
      </Link>
    </>
  )
}
