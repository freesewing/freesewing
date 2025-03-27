// Utils
import { horFlexClasses, horFlexClassesNoSm, capitalize, getSearchParam } from '@freesewing/utils'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link } from '@freesewing/react/components/Link'
import { Popout } from '@freesewing/react/components/Popout'
import { Spinner } from '@freesewing/react/components/Spinner'
import {
  EmailIcon,
  KeyIcon,
  LockIcon,
  WarningIcon,
  GoogleIcon,
  GitHubIcon,
  FreeSewingIcon,
  UserIcon,
} from '@freesewing/react/components/Icon'
import { MfaInput, StringInput, PasswordInput } from '@freesewing/react/components/Input'
import { H1, H2, H3, H4 } from '@freesewing/react/components/Heading'

/*
 * This SignIn component holds the entire sign-in form
 *
 * @param {object} props - All React props
 * @param {function} props.onSuccess - Optional: A method to run when the sign in is successful
 * @param {function} props.silent - Optional: Silently login the user if we have a valid session
 */
export const SignIn = ({ onSuccess = false, silent = false }) => {
  const { account, setAccount, setToken, seenUser, setSeenUser } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [magicLink, setMagicLink] = useState(true)
  const [signInFailed, setSignInFailed] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [seenBefore, setSeenBefore] = useState(false)
  const [mfa, setMfa] = useState(false)
  const [mfaCode, setMfaCode] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && signInFailed) {
      window.setTimeout(() => setSignInFailed(false), 1750)
    }
  }, [signInFailed])

  // Avoid SSR rendering mismatch by setting this in effect
  useEffect(() => {
    if (silent) {
      const checkSession = async () => {
        const result = await backend.ping()
        const [status, body] = Array.isArray(result) ? result : [false, false]
        // Silent sign-in succeeded
        if (status === 200) {
          setAccount(body.account)
          setSeenUser(body.account.username)
          setLoadingStatus([true, `Welcome back ${body.account.username}`, true, true])
          // Call the onSuccess handler
          if (typeof onSuccess === 'function') onSuccess(body)
        }
      }
      checkSession()
    }
    if (seenUser) {
      setSeenBefore(seenUser)
      setUsername(seenUser)
    } else {
      setSeenBefore(false)
      setUsername('')
    }
  }, [seenUser])

  const triggerSubmit = (evt) => {
    if (evt.key === 'Enter') signinHandler(evt)
  }

  const signinHandler = async (evt) => {
    evt.preventDefault()
    setLoadingStatus([true, 'Contacting FreeSewing backend'])
    const result = magicLink
      ? await backend.signIn({ username, password: false })
      : await backend.signIn({ username, password, token: mfaCode })
    const [status, body] = Array.isArray(result) ? result : [false, false]
    if (!status) {
      setSignInFailed('Unexpected error when attempting sign-in')
      return setLoadingStatus([
        true,
        'Unexpected error when attempting sign-in. Please report this.',
        true,
        false,
      ])
    }
    // Sign-in succeeded
    if (status === 200) {
      if (magicLink) {
        setLoadingStatus([true, 'Email sent', true, true])
        setMagicLinkSent(true)
      } else {
        setAccount(body.account)
        setToken(body.token)
        setSeenUser(body.account.username)
        setLoadingStatus([true, `Welcome back ${body.account.username}`, true, true])
        // Call the onSuccess handler
        if (typeof onSuccess === 'function') onSuccess(body)
      }
    }
    // Sign-in failed
    if (status === 401) {
      const msg = magicLink ? 'Unable to find this user' : 'Sign-In failed'
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
    }
    // Bad request
    if (status === 400) {
      let msg
      if (result.data.error === 'usernameMissing') msg = 'Please provide your username'
      else if (result.data.error === 'passwordMissing') msg = 'Please provide your password'
      setSignInFailed(msg)
      setLoadingStatus([true, msg, true, false])
    }
    // MFA active
    if (status === 403 && body.error === 'mfaTokenRequired') {
      setMfa(true)
      setLoadingStatus([
        true,
        'Please provide a one-time MFA code, or a backup scratch code',
        true,
        true,
      ])
    }
  }

  const initOauth = async (provider) => {
    setLoadingStatus([true, 'Contacting the FreeSewing backend'])
    const result = await backend.oauthInit({ provider, language: 'en' })
    if (result.success) {
      setLoadingStatus([true, `Contacting ${capitalize(provider)}`])
      window.location.href = result.data.authUrl
    }
  }

  const btnClasses = `tw-daisy-btn tw-capitalize tw-w-full tw-mt-4 ${
    signInFailed ? 'tw-daisy-btn-warning' : 'tw-daisy-btn-primary'
  } tw-transition-colors tw-ease-in-out tw-duration-300 ${horFlexClassesNoSm}`
  const noBueno = (
    <>
      <WarningIcon />
      <span className="tw-pl-2">{signInFailed}</span>
      <WarningIcon />
    </>
  )

  if (magicLinkSent)
    return (
      <WrapForm>
        <H1>Email Sent</H1>
        <p className="tw-text-inherit tw-text-lg tw-text-center">
          Go check your inbox for an email from <b>FreeSewing.org</b>
        </p>
        <p className="tw-text-inherit tw-text-lg tw-text-center">
          Click the sign-in link in that email to sign in to your FreeSewing account.
        </p>
        <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-p-8">
          <button
            className="tw-daisy-btn tw-daisy-btn-outline tw-daisy-btn-sm"
            onClick={() => setMagicLinkSent(false)}
          >
            Back
          </button>
          <Link
            href="/support"
            className="tw-daisy-btn tw-daisy-btn-outline tw-daisy-btn-sm hover:tw-no-underline"
          >
            Contact support
          </Link>
        </div>
      </WrapForm>
    )

  if (mfa)
    return (
      <MfaForm
        {...{ mfaCode, setMfaCode }}
        onSubmit={signinHandler}
        post={
          <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-p-8">
            <button className="tw-daisy-btn tw-daisy-btn-ghost" onClick={() => setMfa(false)}>
              Back
            </button>
            <Link href="/support" className="tw-daisy-btn tw-daisy-btn-ghost">
              Contact support
            </Link>
          </div>
        }
      />
    )

  return (
    <WrapForm>
      <H1>{seenBefore ? `Welcome back ${seenUser}` : 'Welcome'}</H1>
      <H4>Sign in to FreeSewing</H4>
      {!seenBefore && (
        <StringInput
          label="Your Email address, Username, or User #"
          update={setUsername}
          placeholder="Your Email address, Username, or User #"
          value={username}
          valid={(val) => val.length > 1}
        />
      )}
      {magicLink ? (
        <button
          className={`${btnClasses} tw-daisy-btn-lg`}
          tabIndex="-1"
          role="button"
          onClick={signinHandler}
        >
          {signInFailed ? (
            noBueno
          ) : (
            <>
              <span className="tw-hidden lg:tw-block">
                <EmailIcon />
              </span>
              <span className="tw-pl-2">Email me a sign-in link</span>
              <span className="tw-hidden lg:tw-block">
                <EmailIcon />
              </span>
            </>
          )}
        </button>
      ) : (
        <>
          <PasswordInput
            label="Your Password"
            update={setPassword}
            current={password}
            valid={(val) => val.length > 0}
            onKeyDown={triggerSubmit}
          />
          <button className={btnClasses} tabIndex="-1" role="button" onClick={signinHandler}>
            {signInFailed ? (
              noBueno
            ) : (
              <>
                <span className="tw-hidden lg:tw-block">
                  <KeyIcon />
                </span>
                <span className="tw-pl-2">Sign in</span>
                <span className="tw-hidden lg:tw-block">
                  <LockIcon />
                </span>
              </>
            )}
          </button>
        </>
      )}
      <button
        className={`tw-block md:tw-flex md:tw-flex-row md:tw-justify-between md:tw-items-center tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline tw-w-full tw-mt-8`}
        onClick={() => setMagicLink(!magicLink)}
      >
        <span className="tw-hidden lg:tw-block">{magicLink ? <LockIcon /> : <EmailIcon />}</span>
        {magicLink ? 'Use your password' : 'Email me a sign-in link'}
        <span className="tw-hidden lg:tw-block">{magicLink ? <KeyIcon /> : <EmailIcon />}</span>
      </button>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 tw-items-center tw-mt-2">
        {['Google', 'Github'].map((provider) => (
          <button
            key={provider}
            id={provider}
            className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-secondary`}
            onClick={() => initOauth(provider)}
          >
            {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
            <span>Sign in with {provider}</span>
          </button>
        ))}
      </div>
      {seenBefore ? (
        <button
          className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-outline tw-mt-2 tw-w-full`}
          onClick={() => setSeenUser(false)}
        >
          <UserIcon />
          Sign in as a different user
        </button>
      ) : (
        <Link
          className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-lg tw-daisy-btn-neutral tw-mt-2 hover:tw-text-neutral-content hover:tw-no-underline`}
          href="/signup"
        >
          <FreeSewingIcon className="tw-h-10 tw-w-10" />
          Sign up here
        </Link>
      )}
    </WrapForm>
  )
}

const WrapForm = ({ children }) => <div className="tw-text-center tw-py-12">{children}</div>

const MfaForm = ({ mfaCode, setMfaCode, onSubmit, post = [] }) => (
  <WrapForm>
    <H1>MFA Code</H1>
    <p className="tw-text-inherit tw-text-lg tw-text-center">
      Please provide a one-time MFA code, or a backup scratch code
    </p>
    <MfaInput
      label="Please provide a one-time MFA code, or a backup scratch code"
      update={setMfaCode}
      value={mfaCode}
    />
    <button
      className={`tw-daisy-btn tw-capitalize tw-w-full tw-mt-4 tw-daisy-btn-primary ${horFlexClassesNoSm}`}
      tabIndex="-1"
      role="button"
      onClick={onSubmit}
    >
      <span className="tw-hidden lg:tw-block">
        <KeyIcon />
      </span>
      <span className="tw-pl-2">Sign In</span>
      <span className="tw-hidden lg:tw-block">
        <LockIcon />
      </span>
    </button>
    {post}
  </WrapForm>
)

export const SignInConfirmation = ({ onSuccess = false }) => {
  // State
  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()
  const [mfa, setMfa] = useState()
  const [mfaCode, setMfaCode] = useState()

  // Hooks
  const { setAccount, setToken } = useAccount()
  const backend = useBackend()

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Effects
  useEffect(() => {
    const newId = getSearchParam('id')
    const newCheck = getSearchParam('check')
    if (newId !== id) setId(newId)
    if (newCheck !== check) setCheck(newCheck)
  }, [id, check])

  useEffect(() => {
    // Call async method
    if (id) getConfirmation()
  }, [id])

  // Gets the confirmation
  const getConfirmation = async () => {
    setLoadingStatus([true, 'Contacting the backend', true, true])
    // Reach out to backend
    const [status, body] = await backend.signInFromLink({ id, check, token: mfaCode })

    // If it works, store account, which runs the onSuccess handler
    if (body.token) return storeAccount(body)
    // If it did not work, perhaps we need to handle MFA?
    if (status === 403 && body.error === 'mfaTokenRequired') {
      setMfa(true)
      setLoadingStatus([
        true,
        'Please provide a one-time MFA code, or a backup scratch code',
        true,
        true,
      ])
      return
    }
    // If we get here, we're not sure what's wrong
    if (body.error) return setError(body.error)
    return setError(true)
  }

  // Updates the (local) account data
  const storeAccount = async (data) => {
    if (data?.token && data?.account) {
      setToken(data.token)
      setAccount(data.account)
      if (typeof onSuccess === 'function') onSuccess(data)
      else navigate('/account', true)
    } else {
      setError(data)
    }
  }

  // Short-circuit errors
  if (error && mfa)
    return error === 'signInFailed' ? (
      <>
        <MfaForm {...{ mfaCode, setMfaCode }} onSubmit={getConfirmation} />
        <Popout warning title="Sign In Failed">
          <p>Your one-time token is either invalid of expired.</p>
        </Popout>
      </>
    ) : (
      <>
        <MfaForm {...{ mfaCode, setMfaCode }} onSubmit={getConfirmation} />
        <p>This error is unexpected. Please report this.</p>
      </>
    )

  // Show MFA input if required
  if (mfa) return <MfaForm {...{ mfaCode, setMfaCode }} onSubmit={getConfirmation} />

  // If we do not (yet) have the data, show a loader
  if (!id || !check)
    return (
      <>
        <h1>One moment pleae</h1>
        <Spinner className="tw-w-8 tw-h-8 tw-m-auto tw-animate-spin" />
      </>
    )

  return <p>fixme</p>
}
