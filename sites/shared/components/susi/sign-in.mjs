// Hooks
import { useState, useEffect } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
import { horFlexClasses } from 'shared/utils.mjs'
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
} from 'shared/components/icons.mjs'
import { StringInput, PasswordInput } from 'shared/components/inputs.mjs'

const darkLinkClasses = 'decoration-1 underline text-medium font-medium hover:decoration-2'

export const SignIn = () => {
  const { setAccount, setToken, seenUser, setSeenUser } = useAccount()
  const { t } = useTranslation(['signin', 'signup', 'status'])
  const backend = useBackend()
  const router = useRouter()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

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
        setLoadingStatus([true, t('singup:emailSent'), true, true])
        setMagicLinkSent(true)
      } else {
        setAccount(result.data.account)
        setToken(result.data.token)
        setSeenUser(result.data.account.username)
        setLoadingStatus([
          true,
          t('signin:welcomeBackName', { name: result.data.account.username }),
          true,
          true,
        ])
        router.push('/account')
      }
    }
    // Sign-in failed
    if (result.response?.response?.status === 401) {
      const msg = magicLink ? t('notFound') : t('signInFailed')
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
    }
    // Bad request
    if (result.status === 400) {
      let msg
      if (result.data.error === 'usernameMissing') msg = t('usernameMissing')
      else if (result.data.error === 'passwordMissing') msg = t('passwordMissing')
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
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
        <LoadingStatus />
        <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">
          {t('signup:emailSent')}
        </h1>
        <p className="text-inherit text-lg text-center">
          {t('signup:checkYourInbox')} <b>FreeSewing.org</b>
        </p>
        <p className="text-inherit text-lg text-center">{t('clickSigninLink')}</p>
        <div className="flex flex-row gap-4 items-center justify-center p-8">
          <button className="btn btn-ghost" onClick={() => setMagicLinkSent(false)}>
            {t('signin:back')}
          </button>
          <Link href="/support" className="btn btn-ghost">
            {t('signup:contact')}
          </Link>
        </div>
      </>
    )

  return (
    <>
      <LoadingStatus />
      <h2>{seenBefore ? t('signin:welcomeBackName', { name: seenUser }) : t('signin:welcome')}</h2>
      <p>{t('signin:signInToThing', { thing: 'FreeSewing' })}:</p>
      {!seenBefore && (
        <StringInput
          label={t('signin:emailUsernameId')}
          update={setUsername}
          placeholder={t('signin:emailUsernameId')}
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
              <span className="pl-2">{t('signin:emailSignInLink')}</span>
              <span className="hidden lg:block">
                <EmailIcon />
              </span>
            </>
          )}
        </button>
      ) : (
        <>
          <PasswordInput
            label={t('password')}
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
                <span className="pl-2">{t('signin:signIn')}</span>
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
        {magicLink ? t('signin:usePassword') : t('signin:emailSignInLink')}
        <span className="hidden lg:block">{magicLink ? <KeyIcon /> : <EmailIcon />}</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-2">
        {['Google', 'Github'].map((provider) => (
          <button id={provider} className={`${horFlexClasses} btn btn-secondary`}>
            {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
            <span>{t('signInWithProvider', { provider })}</span>
          </button>
        ))}
      </div>
      {seenBefore ? (
        <button
          className={`${horFlexClasses} btn btn-ghost border-base-300 mt-2`}
          onClick={() => setSeenUser(false)}
        >
          Sign in as another user
        </button>
      ) : (
        <Link className={`${horFlexClasses} btn btn-lg btn-neutral mt-2`} href="/signup">
          <FreeSewingIcon className="h-10 w-10" />
          {t('signin:signUpHere')}
        </Link>
      )}
    </>
  )
}
