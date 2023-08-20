// Hooks
import { useState, useEffect } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import Link from 'next/link'
import { EmailIcon, KeyIcon, RightIcon, WarningIcon } from 'shared/components/icons.mjs'

const darkLinkClasses = 'decoration-1 underline text-medium font-medium hover:decoration-2'

const UsernameField = ({ username, setUsername, t }) => (
  <input
    type="username"
    name="username"
    onChange={(evt) => setUsername(evt.target.value)}
    placeholder={t('signin:emailUsernameId')}
    className="input input-bordered w-full text-base-content"
    autoFocus={true}
    value={username}
  />
)

const PasswordField = ({ password, setPassword, revealPassword, setRevealPassword, t }) => (
  <div className="flex flex-row w-full items-center mt-2 gap-2">
    <input
      type={revealPassword ? 'text' : 'password'}
      name="password "
      onChange={(evt) => setPassword(evt.target.value)}
      placeholder={t('signin:password')}
      className="input input-bordered w-full text-base-content"
      autoFocus={true}
      value={password}
    />
    <button
      className="btn btn-ghost w-12 shrink-0 px-0"
      onClick={() => setRevealPassword(!revealPassword)}
    >
      <span role="img" className="text-2xl">
        {revealPassword ? '👀' : '🙈'}
      </span>
    </button>
  </div>
)

export const ButtonText = ({ children }) => (
  <div className="flex flex-row items-center justify-between w-full">{children}</div>
)

export const SignIn = () => {
  const { setAccount, setToken, seenUser, setSeenUser } = useAccount()
  const { t } = useTranslation(['signin', 'signup', 'status'])
  const backend = useBackend()
  const router = useRouter()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [revealPassword, setRevealPassword] = useState(false)
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
      let msg
      if (magicLink) {
        setLoadingStatus([true, t('singup:emailSent'), true, true])
        setMagicLinkSent(true)
        msg = t('signup:emailSent')
      } else {
        setAccount(result.data.account)
        setToken(result.data.token)
        setSeenUser(result.data.account.username)
        msg = t('signin:welcomeBackName', { name: result.data.account.username })
        setLoadingStatus([true, msg, true, true])
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
  } transition-colors ease-in-out duration-300`
  const noBueno = (
    <ButtonText>
      <WarningIcon />
      <span className="pl-2">{signInFailed}</span>
      <WarningIcon />
    </ButtonText>
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
      <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">
        {seenBefore ? t('signin:welcomeBackName', { name: seenUser }) : t('signin:welcome')}
      </h1>
      <p className="text-inherit text-center">
        {t('signin:signInToThing', { thing: 'FreeSewing' })}
      </p>
      {!seenBefore && <UsernameField {...{ username, setUsername, t }} />}
      {magicLink ? (
        <button className={btnClasses} tabIndex="-1" role="button" onClick={signinHandler}>
          {signInFailed ? (
            noBueno
          ) : (
            <ButtonText>
              <EmailIcon />
              <span className="pl-2">{t('signin:emailSignInLink')}</span>
              <RightIcon />
            </ButtonText>
          )}
        </button>
      ) : (
        <>
          <PasswordField {...{ password, setPassword, revealPassword, setRevealPassword, t }} />
          <button className={btnClasses} tabIndex="-1" role="button" onClick={signinHandler}>
            {signInFailed ? (
              noBueno
            ) : (
              <ButtonText>
                <KeyIcon /> <span className="pl-2">{t('signin:signIn')}</span>
                <RightIcon />
              </ButtonText>
            )}
          </button>
        </>
      )}
      <ul className="mt-4 mb-2 flex flex-row gap-2 text-sm items-center justify-center">
        <li>
          <button className={darkLinkClasses} onClick={() => setMagicLink(!magicLink)}>
            {magicLink ? t('signin:usePassword') : t('signin:emailSignInLink')}
          </button>
        </li>
        {seenBefore ? (
          <>
            <li>|</li>
            <li>
              <button className={darkLinkClasses} onClick={() => setSeenUser(false)}>
                Sign in as another user
              </button>
            </li>
          </>
        ) : null}
      </ul>
      {!seenBefore ? (
        <p className="text-inherit text-sm mt-4 opacity-80 text-center">
          {t('signin:dontHaveAnAccount')}{' '}
          <Link className={darkLinkClasses} href="/signup">
            {t('signin:signUpHere')}
          </Link>
        </p>
      ) : null}
    </>
  )
}
