// Utils
import { horFlexClasses, horFlexClassesNoSm, capitalize } from '@freesewing/utils'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link } from '@freesewing/react/components/Link'
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

/*
 * This SignIn component holds the entire sign-in form
 *
 * @param {object} props - All React props
 * @param {function} props.onSuccess - A method to run when the sign in is successful
 */
export const SignIn = ({ onSuccess = false }) => {
  const { setAccount, setToken, seenUser, setSeenUser } = useAccount()
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
    console.log({ magicLink })
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
        onSuccess(body)
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

  const btnClasses = `daisy-btn capitalize w-full mt-4 ${
    signInFailed ? 'daisy-btn-warning' : 'daisy-btn-primary'
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
        <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">Email Sent</h1>
        <p className="text-inherit text-lg text-center">
          Go check your inbox for an email from <b>FreeSewing.org</b>
        </p>
        <p className="text-inherit text-lg text-center">
          Click the sign-in link in that email to sign in to your FreeSewing account.
        </p>
        <div className="flex flex-row gap-4 items-center justify-center p-8">
          <button className="daisy-btn daisy-btn-ghost" onClick={() => setMagicLinkSent(false)}>
            Back
          </button>
          <Link href="/support" className="daisy-btn daisy-btn-ghost">
            Contact support
          </Link>
        </div>
      </>
    )

  if (mfa)
    return (
      <>
        <h1 className="text-inherit text-3xl lg:text-5xl mb-4 pb-0 text-center">MFA Code</h1>
        <p className="text-inherit text-lg text-center">
          Please provide a one-time MFA code, or a backup scratch code
        </p>
        <MfaInput
          label="Please provide a one-time MFA code, or a backup scratch code"
          update={setMfaCode}
          value={mfaCode}
        />
        <button className={btnClasses} tabIndex="-1" role="button" onClick={signinHandler}>
          {signInFailed ? (
            noBueno
          ) : (
            <>
              <span className="hidden lg:block">
                <KeyIcon />
              </span>
              <span className="pl-2">Sign In</span>
              <span className="hidden lg:block">
                <LockIcon />
              </span>
            </>
          )}
        </button>
        <div className="flex flex-row gap-4 items-center justify-center p-8">
          <button className="daisy-btn daisy-btn-ghost" onClick={() => setMfa(false)}>
            Back
          </button>
          <Link href="/support" className="daisy-btn daisy-btn-ghost">
            Contact support
          </Link>
        </div>
      </>
    )

  return (
    <div className="tailwind-container">
      <h1>{seenBefore ? `Welcome back ${seenUser}` : 'Welcome'}</h1>
      <h3>Sign in to FreeSewing</h3>
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
          className={`${btnClasses} daisy-btn-lg`}
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
              <span className="pl-2">Email me a sign-in link</span>
              <span className="hidden lg:block">
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
                <span className="hidden lg:block">
                  <KeyIcon />
                </span>
                <span className="pl-2">Sign in</span>
                <span className="hidden lg:block">
                  <LockIcon />
                </span>
              </>
            )}
          </button>
        </>
      )}
      <button
        className={`block md:flex md:flex-row md:justify-between md:items-center  daisy-btn daisy-btn-primary daisy-btn-outline w-full mt-8`}
        onClick={() => setMagicLink(!magicLink)}
      >
        <span className="hidden lg:block">{magicLink ? <LockIcon /> : <EmailIcon />}</span>
        {magicLink ? 'Use your password' : 'Email me a sign-in link'}
        <span className="hidden lg:block">{magicLink ? <KeyIcon /> : <EmailIcon />}</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-2">
        {['Google', 'Github'].map((provider) => (
          <button
            key={provider}
            id={provider}
            className={`${horFlexClasses} daisy-btn daisy-btn-secondary`}
            onClick={() => initOauth(provider)}
          >
            {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
            <span>Sign in with {provider}</span>
          </button>
        ))}
      </div>
      {seenBefore ? (
        <button
          className={`${horFlexClassesNoSm} daisy-btn daisy-btn-neutral daisy-btn-outline mt-2 w-full`}
          onClick={() => setSeenUser(false)}
        >
          <UserIcon />
          Sign in as a different user
        </button>
      ) : (
        <Link
          className={`${horFlexClasses} daisy-btn daisy-btn-lg daisy-btn-neutral mt-2`}
          href="/signup"
        >
          <FreeSewingIcon className="h-10 w-10" />
          Sign up here
        </Link>
      )}
    </div>
  )
}
