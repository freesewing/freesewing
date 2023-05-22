// Hooks
import { useState, useEffect, useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Link from 'next/link'
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { SusiWrapper } from 'shared/components/wrappers/susi.mjs'
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

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const SignInPage = ({ page }) => {
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const { setAccount, setToken, seenUser, setSeenUser } = useAccount()
  const { t } = useTranslation(['signin', 'signup', 'toast'])
  const backend = useBackend()
  const toast = useToast()
  const router = useRouter()

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
    startLoading()
    const result = magicLink
      ? await backend.signIn({ username, password: false })
      : await backend.signIn({ username, password })
    // Sign-in succeeded
    if (result.success) {
      let msg
      if (magicLink) {
        setMagicLinkSent(true)
        msg = t('signup:emailSent')
      } else {
        setAccount(result.data.account)
        setToken(result.data.token)
        setSeenUser(result.data.account.username)
        msg = t('signin:welcomeBackName', { name: result.data.account.username })
        stopLoading()
        router.push('/account')
      }
      return toast.success(<b>{msg}</b>)
    }
    // Sign-in failed
    if (result.status === 401) {
      let msg
      if (result.data.error === 'signInFailed') {
        msg = magicLink ? t('notFound') : t('signInFailed')
      }
      setSignInFailed(msg)

      return toast.warning(<b>{msg}</b>)
    }
    // Bad request
    if (result.status === 400) {
      let msg
      if (result.data.error === 'usernameMissing') msg = t('usernameMissing')
      else if (result.data.error === 'passwordMissing') msg = t('passwordMissing')
      setSignInFailed(msg)
      return toast.warning(<b>{msg}</b>)
    }
    stopLoading()
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
      <PageWrapper {...page} title={t('welcomeBack')} layout={BareLayout} footer={false}>
        <SusiWrapper>
          <h1 className="text-neutral-content font-light text-3xl mb-4 pb-0 text-center">
            {t('signup:emailSent')}
          </h1>
          <p className="text-neutral-content text-lg text-center">
            {t('signup:checkYourInbox')} <b>FreeSewing.org</b>
          </p>
          <p className="text-neutral-content text-lg text-center">{t('clickSigninLink')}</p>
          <div className="flex flex-row gap-4 items-center justify-center p-8">
            <button className="btn btn-ghost" onClick={() => setMagicLinkSent(false)}>
              {t('signin:back')}
            </button>
            <Link href="/support" className="btn btn-ghost">
              {t('signup:contact')}
            </Link>
          </div>
        </SusiWrapper>
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={t('welcomeBack')} layout={BareLayout} footer={false}>
      <SusiWrapper>
        <h1 className="text-neutral-content font-light text-3xl mb-4 pb-0 text-center">
          {seenBefore ? t('signin:welcomeBackName', { name: seenUser }) : t('signin:welcome')}
        </h1>
        <p className="text-neutral-content text-center">
          {t('signin:signInToThing', { thing: 'FreeSewing.org' })}
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
          <p className="text-neutral-content text-sm mt-4 opacity-80 text-center">
            {t('signin:dontHaveAnAccount')}{' '}
            <Link className={darkLinkClasses} href="/signup">
              {t('signin:signUpHere')}
            </Link>
          </p>
        ) : null}
      </SusiWrapper>
    </PageWrapper>
  )
}

export default SignInPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      page: {
        locale,
        path: ['signin'],
      },
    },
  }
}
