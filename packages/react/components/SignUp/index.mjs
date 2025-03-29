// Dependencies
import { validateEmail, validateTld, getSearchParam } from '@freesewing/utils'

// Hooks
import React, { useState, useContext, useEffect } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Components
import { Link } from '@freesewing/react/components/Link'
import {
  LeftIcon,
  RightIcon,
  HelpIcon,
  GoogleIcon,
  GitHubIcon,
  KeyIcon,
  EmailIcon,
  DownIcon,
} from '@freesewing/react/components/Icon'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { EmailInput } from '@freesewing/react/components/Input'
import { IconButton } from '@freesewing/react/components/Button'
import { Spinner } from '@freesewing/react/components/Spinner'
import { Consent } from '@freesewing/react/components/Account'

export const SignUp = ({ embed = false }) => {
  // State
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [result, setResult] = useState(false)
  const [showAll, setShowAll] = useState(false)

  // Hooks
  const backend = useBackend()

  // Context
  const { setModal } = useContext(ModalContext)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const updateEmail = (value) => {
    setEmail(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid === true ? true : false)
  }

  const signupHandler = async (evt) => {
    evt.preventDefault()
    if (!emailValid) {
      setLoadingStatus([true, 'Please provide a valid email address', true, false])
      return
    }
    const [status, body] = await backend.signUp({ email })
    if (status === 201 && body.result === 'created') setResult('success')
    else {
      setModal(
        <ModalWrapper bg="tw-base-100 lg:tw-bg-base-300">
          <div className="tw-bg-base-100 tw-rounded-lg tw-p-4 lg:tw-px-8 tw-max-w-xl lg:tw-shadow-lg">
            <h3>An error occured while trying to process your request</h3>
            <p className="tw-text-lg">
              Unfortunately, we cannot recover from this error, we need a human being to look into
              this.
            </p>
            <p className="tw-text-lg">
              Feel free to try again, or reach out to support so we can assist you.
            </p>
            <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-p-8 tw-flex-wrap">
              <IconButton onClick={() => setResult(false)}>
                <LeftIcon />
                Back
              </IconButton>
              <IconButton href="/support" className="tw-daisy-btn-outline">
                <HelpIcon />
                Contact support
              </IconButton>
            </div>
          </div>
        </ModalWrapper>
      )
    }
  }

  const initOauth = async (provider) => {
    setLoadingStatus([true, 'Contacting the backend'])
    const result = await backend.oauthInit({ provider, language: 'en' })
    if (result.success) {
      setLoadingStatus([true, `Contacting ${provider}`])
      window.location.href = result.data.authUrl
    }
  }
  const Heading = embed
    ? ({ children }) => <h2 className="tw-text-inherit">{children}</h2>
    : ({ children }) => <h1 className="tw-text-inherit">{children}</h1>

  return (
    <div className="tw-w-full">
      <Heading className="tw-text-inherit">
        {result ? (
          result === 'success' ? (
            <span>Now check your inbox</span>
          ) : (
            <span>An error occured while trying to process your request</span>
          )
        ) : (
          <span>Create a FreeSewing account</span>
        )}
      </Heading>

      {result ? (
        result === 'success' ? (
          <>
            <p className="tw-text-inherit tw-text-lg">
              Go check your inbox for an email from <b>FreeSewing.org</b>
            </p>
            <p className="tw-text-inherit tw-text-lg">
              Click your personal signup link in that email to create your FreeSewing account.
            </p>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
              <IconButton onClick={() => setResult(false)}>
                <LeftIcon />
                Back
              </IconButton>
              <IconButton href="/support" className="tw-daisy-btn-outline">
                <HelpIcon />
                Contact support
              </IconButton>
            </div>
          </>
        ) : (
          <>
            robot here
            <p className="tw-text-inherit tw-text-lg">
              Unfortunately, we cannot recover from this error, we need a human being to look into
              this.
            </p>
            <p className="tw-text-inherit tw-text-lg">
              Feel free to try again, or reach out to support so we can assist you.
            </p>
            <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center tw-justify-center tw-p-8">
              <button className="tw-daisy-btn tw-daisy-btn-ghost" onClick={() => setResult(false)}>
                Back
              </button>
              <Link href="/support" className="tw-daisy-btn tw-daisy-btn-ghost">
                Contact support
              </Link>
            </div>
          </>
        )
      ) : (
        <>
          <p className="tw-text-inherit">To receive a sign-up link, enter your email address</p>
          <form onSubmit={signupHandler}>
            <EmailInput
              id="signup-email"
              label="Email address"
              current={email}
              original={''}
              valid={() => emailValid}
              placeholder="Email address"
              update={updateEmail}
            />
            <IconButton
              onClick={signupHandler}
              btnProps={{ type: 'submit' }}
              className="lg:tw-w-full tw-grow tw-mt-2"
            >
              <EmailIcon />
              Email me a sign-up link
            </IconButton>
          </form>
          {showAll ? (
            <>
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-1 tw-items-center tw-mt-1">
                {['Google', 'GitHub'].map((provider) => (
                  <IconButton
                    key={provider}
                    id={provider}
                    color="secondary"
                    onClick={() => initOauth(provider)}
                  >
                    {provider === 'Google' ? <GoogleIcon stroke={0} /> : <GitHubIcon />}
                    <span>Sign up with {provider}</span>
                  </IconButton>
                ))}
              </div>
              <IconButton color="neutral" href="/signin" className="tw-daisy-btn-lg tw-mt-1">
                <span className="tw-hidden md:tw-block">
                  <KeyIcon className="tw-h-10 tw-w-10" />
                </span>
                Sign in here
              </IconButton>
              <div className="tw-flex tw-flex-row tw-justify-center tw-mt-2">
                <IconButton color="ghost" onClick={() => setShowAll(false)}>
                  <DownIcon className="tw-w-6 tw-h-6 tw-rotate-180" />
                  Fewer options
                  <DownIcon className="tw-w-6 tw-h-6 tw-rotate-180" />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="tw-flex tw-flex-row tw-justify-center tw-mt-2">
              <IconButton color="ghost" onClick={() => setShowAll(true)}>
                <DownIcon />
                More options
                <DownIcon />
              </IconButton>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export const SignUpConfirmation = ({ onSuccess = false }) => {
  // State
  const [id, setId] = useState()
  const [check, setCheck] = useState()

  // Effects
  useEffect(() => {
    const newId = getSearchParam('id')
    const newCheck = getSearchParam('check')
    if (newId !== id) setId(newId)
    if (newCheck !== check) setCheck(newCheck)
  }, [id, check])

  // If we do not (yet) have the data, show a loader
  if (!id || !check)
    return (
      <>
        <h1>One moment pleae</h1>
        <Spinner className="tw-w-8 tw-h-8 tw-m-auto tw-animate-spin" />
      </>
    )

  return (
    <>
      <h1>One more thing</h1>
      <Consent signUp={id} />
    </>
  )
}
