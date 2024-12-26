// Dependencies
import { welcomeSteps } from './shared.mjs'
import { horFlexClasses } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, LockIcon } from '@freesewing/react/components/Icon'
import { PasswordInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'
import { NumberCircle } from '@freesewing/react/components/Number'
import { CopyToClipboard } from '@freesewing/react/components/CopyToClipboard'

/*
 * Component for the account/security/password page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 */
export const Mfa = ({ welcome = false, title = true }) => {
  // Hooks
  const backend = useBackend()
  const { account, setAccount } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [enable, setEnable] = useState(false)
  const [disable, setDisable] = useState(false)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [scratchCodes, setScratchCodes] = useState(false)

  // Helper method to enable MFA
  const enableMfa = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = await backend.enableMfa()
    if (status === 200) {
      setEnable(body.mfa)
      setLoadingStatus([true, 'Settings saved', true, true])
    } else setLoadingStatus([true, 'An error occured. Please report this.', true, false])
  }

  // Helper method to disable MFA
  const disableMfa = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = await backend.disableMfa({
      mfa: false,
      password,
      token: code,
    })
    if (status === 200) {
      if (body.result === 'success') {
        setAccount(body.account)
        setLoadingStatus([true, 'Settings saved', true, true])
      } else setLoadingStatus([true, 'An error occured. Please report this.', true, false])
      setDisable(false)
      setEnable(false)
      setCode('')
      setPassword('')
    }
  }

  // Helper method to confirm MFA
  const confirmMfa = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = await backend.confirmMfa({
      mfa: true,
      secret: enable.secret,
      token: code,
    })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setScratchCodes(body.scratchCodes)
      setLoadingStatus([true, 'Settings saved', true, true])
    } else setLoadingStatus([true, 'An error occured, please repor this', true, false])
    setEnable(false)
    setCode('')
  }

  // Figure out what title to use
  let titleText = `Mult-Factor Authentication is ${account.mfaEnabled ? 'enabled' : 'disabled'}`
  if (enable) titleText = 'Set up Multi-Factor Authentication'

  return (
    <div className="tw-w-full">
      {title ? <h2>{titleText}</h2> : null}
      {enable ? (
        <>
          <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-px-8 lg:tw-px-36">
            <div dangerouslySetInnerHTML={{ __html: enable.qrcode }} />
          </div>
          <p className="tw-flex tw-flex-row tw-items-center tw-justify-center">{enable.secret}</p>
          <Bullet num="1">
            Add FreeSewing to your Authenticator App by scanning the QR code above. If you cannot
            scan the QR code, you can manually enter the secret below it.
          </Bullet>
          <Bullet num="2">
            lease enter a code from your Authenticator App to confirm this action
          </Bullet>
          <input
            value={code}
            onChange={(evt) => setCode(evt.target.value)}
            className="tw-daisy-input tw-w-64 tw-m-auto tw-text-4xl tw-daisy-input-bordered tw-daisy-input-lg tw-flex tw-flex-row tw-text-center tw-mb-8 tw-tracking-widest"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            placeholder="000000"
          />
          <button
            className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-success tw-daisy-btn-lg tw-block tw-w-full md:tw-w-auto tw-mx-auto`}
            onClick={confirmMfa}
          >
            <LockIcon />
            Enable Multi-Factor Authentication
          </button>
        </>
      ) : null}
      {disable ? (
        <div className="tw-my-8 tw-max-w-xl">
          <Bullet num="1">
            <h5>Please enter your password to confirm this action</h5>
            <PasswordInput
              current={password}
              update={setPassword}
              placeholder="password here"
              valid={() => true}
            />
          </Bullet>
          <Bullet num="2">
            <h5>Please enter a code from your Authenticator App to confirm this action</h5>
            <input
              value={code}
              onChange={(evt) => setCode(evt.target.value)}
              className="tw-input tw-w-full tw-text-4xl tw-input-bordered tw-input-lg tw-flex tw-flex-row tw-text-center tw-mb-8 tw-tracking-widest"
              type="text"
              placeholder={'000000'}
            />
          </Bullet>
          <button
            className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-error tw-daisy-btn-lg`}
            onClick={disableMfa}
            disabled={code.length < 4 || password.length < 3}
          >
            Disable Mult-Factor Authentication
          </button>
        </div>
      ) : null}
      {scratchCodes ? (
        <>
          <h3>MFA Scratch Codes</h3>
          <p>
            You can use any of these scratch codes as a one-time MFA code when you do not have
            access to your code-generating app (for example, when you have lost your phone.
          </p>
          <p>
            You can use each of these codes only once. Write them down, because this is the only
            time you will get to see them.
          </p>
          <div className="hljs tw-my-4">
            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-text-xs tw-font-medium tw-text-warning tw-mt-1 tw-border-b tw-border-neutral-content tw-border-opacity-25 tw-px-4 tw-py-1 tw-mb-2 lg:tw-text-sm">
              <span>MFA Scratch Codes</span>
              <CopyToClipboard
                content={
                  'FreeSewing MFA Scratch Codes:\n' +
                  scratchCodes.map((code) => code + '\n').join('')
                }
              />
            </div>
            <pre className="language-shell hljs tw-text-base lg:tw-text-lg tw-whitespace-break-spaces tw-overflow-scroll tw-pr-4">
              {scratchCodes.map((code) => code + '\n')}
            </pre>
          </div>
        </>
      ) : (
        <div className="tw-mt-4">
          {account.mfaEnabled ? (
            disable ? null : (
              <button
                className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-w-full md:tw-w-auto tw-daisy-btn-outline`}
                onClick={() => setDisable(true)}
              >
                <NoIcon stroke={3} />
                Disable Mult-Factor Authentication
              </button>
            )
          ) : enable ? null : (
            <div>
              <button
                className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-primary tw-w-full md:tw-w-auto tw-daisy-btn-lg`}
                onClick={enableMfa}
              >
                <LockIcon />
                Set up Mult-Factor Authentication
              </button>
              <Popout tip>
                <h5>Please consider enabling Two-Factor Authentication</h5>
                <p>
                  We do not enforce a password policy, but we do recommend you enable Multi-Factor
                  Authentication to keep your FreeSewing account safe.
                </p>
              </Popout>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const Bullet = ({ num, children }) => (
  <div className="tw-flex tw-flex-row tw-items-start tw-py-4 tw-w-full tw-gap-4">
    <span className="tw-bg-secondary tw-text-secondary-content tw-rounded-full tw-w-8 tw-h-8 tw-p-1 tw-inline-block tw-text-center tw-font-bold tw-mr-4 tw-shrink-0">
      {num}
    </span>
    <div className="tw-text-lg tw-grow">{children}</div>
  </div>
)
