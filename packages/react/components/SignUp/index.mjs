// Dependencies
import { validateEmail, validateTld } from '@freesewing/utils'

// Hooks
import React, { useState, useContext } from 'react'
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
//import { Robot } from 'shared/components/robot/index.mjs'

export const SignUp = () => {
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
        <ModalWrapper bg="base-100 lg:bg-base-300">
          <div className="bg-base-100 rounded-lg p-4 lg:px-8 max-w-xl lg:shadow-lg">
            <h3>An error occured while trying to process your request</h3>
            <p className="text-lg">
              Unfortunately, we cannot recover from this error, we need a human being to look into
              this.
            </p>
            <p className="text-lg">
              Feel free to try again, or reach out to support so we can assist you.
            </p>
            <div className="flex flex-row gap-4 items-center justify-center p-8 flex-wrap">
              <IconButton onClick={() => setResult(false)}>
                <LeftIcon />
                Back
              </IconButton>
              <IconButton href="/support" className="daisy-btn-outline">
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

  return (
    <div className="w-full">
      <h1 className="text-inherit">
        {result ? (
          result === 'success' ? (
            <span>Now check your inbox</span>
          ) : (
            <span>An error occured while trying to process your request</span>
          )
        ) : (
          <span>Create a FreeSewing account</span>
        )}
      </h1>

      {result ? (
        result === 'success' ? (
          <>
            <p className="text-inherit text-lg">
              Go check your inbox for an email from <b>FreeSewing.org</b>
            </p>
            <p className="text-inherit text-lg">
              Click your personal signup link in that email to create your FreeSewing account.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <IconButton onClick={() => setResult(false)}>
                <LeftIcon />
                Back
              </IconButton>
              <IconButton href="/support" className="daisy-btn-outline">
                <HelpIcon />
                Contact support
              </IconButton>
            </div>
          </>
        ) : (
          <>
            robot here
            <p className="text-inherit text-lg">
              Unfortunately, we cannot recover from this error, we need a human being to look into
              this.
            </p>
            <p className="text-inherit text-lg">
              Feel free to try again, or reach out to support so we can assist you.
            </p>
            <div className="flex flex-row gap-4 items-center justify-center p-8">
              <button className="btn btn-ghost" onClick={() => setResult(false)}>
                Back
              </button>
              <Link href="/support" className="btn btn-ghost">
                Contact support
              </Link>
            </div>
          </>
        )
      ) : (
        <>
          <p className="text-inherit">To receive a sign-up link, enter your email address</p>
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
              className="lg:w-full grow"
            >
              <EmailIcon />
              Email me a sign-up link
            </IconButton>
          </form>
          {showAll ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
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
              <IconButton color="neutral" href="/signin" className="daisy-btn-lg">
                <span className="hidden md:block">
                  <KeyIcon className="h-10 w-10" />
                </span>
                Sign in here
              </IconButton>
              <div className="flex flex-row justify-center mt-2">
                <IconButton color="ghost" onClick={() => setShowAll(false)}>
                  <DownIcon className="w-6 h-6 rotate-180" />
                  Fewer options
                  <DownIcon className="w-6 h-6 rotate-180" />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-center mt-2">
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
