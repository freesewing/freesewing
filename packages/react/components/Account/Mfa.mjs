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
    <div className="w-full">
      {title ? <h2>{titleText}</h2> : null}
      {enable ? (
        <>
          <div className="flex flex-row items-center justify-center px-8 lg:px-36">
            <div dangerouslySetInnerHTML={{ __html: enable.qrcode }} />
          </div>
          <p className="flex flex-row items-center justify-center">{enable.secret}</p>
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
            className="daisy-input w-64 m-auto text-4xl daisy-input-bordered daisy-input-lg flex flex-row text-center mb-8 tracking-widest"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            placeholder="000000"
          />
          <button
            className={`${horFlexClasses} daisy-btn daisy-btn-success daisy-btn-lg block w-full md:w-auto mx-auto`}
            onClick={confirmMfa}
          >
            <LockIcon />
            Enable Multi-Factor Authentication
          </button>
        </>
      ) : null}
      {disable ? (
        <div className="my-8 max-w-xl">
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
              className="input w-full text-4xl  input-bordered input-lg flex flex-row text-center mb-8 tracking-widest"
              type="text"
              placeholder={'000000'}
            />
          </Bullet>
          <button
            className={`${horFlexClasses} daisy-btn daisy-btn-error daisy-btn-lg`}
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
          <div className="hljs my-4">
            <div className=" flex flex-row justify-between items-center text-xs font-medium text-warning mt-1 border-b border-neutral-content border-opacity-25 px-4 py-1 mb-2 lg:text-sm">
              <span>MFA Scratch Codes</span>
              <CopyToClipboard
                content={
                  'FreeSewing MFA Scratch Codes:\n' +
                  scratchCodes.map((code) => code + '\n').join('')
                }
              />
            </div>
            <pre className="language-shell hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4">
              {scratchCodes.map((code) => code + '\n')}
            </pre>
          </div>
        </>
      ) : (
        <div className="mt-4">
          {account.mfaEnabled ? (
            disable ? null : (
              <button
                className={`${horFlexClasses} daisy-btn daisy-btn-primary w-full md:w-auto daisy-btn-outline`}
                onClick={() => setDisable(true)}
              >
                <NoIcon stroke={3} />
                Disable Mult-Factor Authentication
              </button>
            )
          ) : enable ? null : (
            <div>
              <button
                className={`${horFlexClasses} daisy-btn daisy-btn-primary w-full md:w-auto daisy-btn-lg`}
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
  <div className="flex flex-row items-start py-4 w-full gap-4">
    <span className="bg-secondary text-secondary-content rounded-full w-8 h-8 p-1 inline-block text-center font-bold mr-4 shrink-0">
      {num}
    </span>
    <div className="text-lg grow">{children}</div>
  </div>
)
