// Dependencies
import { welcomeSteps } from './shared.mjs'
import { linkClasses } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, SaveIcon } from '@freesewing/react/components/Icon'
import { ListInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'

const strings = {
  yes: {
    title: 'Yes, in case it may help me',
    desc:
      'Allowing us to compare your measurments to a baseline or others measurements sets ' +
      'allows us to detect potential problems in your measurements or patterns.',
  },
  no: {
    title: 'No, never compare',
    desc:
      'We get it, comparison is the thief of joy. Just be aware that this limits our ability ' +
      'to warn you about potential problems in your measurements sets or patterns.',
  },
}

/*
 * Component for the account/preferences/newsletter page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @param {function} props.Link - An optional framework-specific Link component
 */
export const Consent = ({ welcome = false, Link = false, title = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const backend = useBackend()
  const { account, setAccount, setToken } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [consent1, setConsent1] = useState(account?.consent > 0)
  const [consent2, setConsent2] = useState(account?.consent > 1)

  // Helper method to update the account
  const update = async () => {
    let newConsent = 0
    if (consent1) newConsent = 1
    if (consent1 && consent2) newConsent = 2
    if (newConsent !== account.consent) {
      setLoadingStatus([true, 'Updating your account'])
      const [status, body] = await backend.updateAccount({ consent: newConsent })
      if (status === 200) {
        setLoadingStatus([true, 'Account updated', true, true])
        setAccount(body.account)
      } else setLoadingStatus([true, 'An error occured, please report this', true, true])
    }
  }

  // Helper method to remove the account
  const removeAccount = async () => {
    setLoadingStatus([true, 'One moment please'])
    const [status, body] = await backend.removeAccount()
    if (status === 200) {
      setLoadingStatus([true, 'All done,  farewell', true, true])
      setToken(null)
      setAccount({ username: false })
    } else setLoadingStatus([true, 'Something went wrong. Please report this.', true, true])
  }

  return (
    <div className="tw-w-full mdx">
      {title ? <h2 className="tw-text-4xl">Privacy Matters</h2> : null}
      {text.intro}
      <h5 className="tw-mt-8">Do you give your consent to process your account data?</h5>
      {text.account}
      {consent1 ? (
        <Checkbox value={consent1} setter={setConsent1} label="Yes, I do" />
      ) : (
        <button
          className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-lg tw-w-full tw-mt-4"
          onClick={() => setConsent1(!consent1)}
        >
          Click here to give your consent
        </button>
      )}
      {consent1 ? (
        <>
          <h5 className="tw-mt-8">
            Do you give your consent to share your anonymized measurements
          </h5>
          <Checkbox
            value={consent2}
            setter={setConsent2}
            label="Share anonymized measurements as open data"
          />
          {!consent2 ? <Popout note>{text.opendata}</Popout> : null}
        </>
      ) : null}
      {!consent1 && <Popout warning>This consent is required for a FreeSewing account.</Popout>}
      {consent1 ? (
        <button className="tw-daisy-btn tw-daisy-btn-primary tw-w-full tw-mt-4" onClick={update}>
          Save
        </button>
      ) : (
        <button
          className="tw-daisy-btn tw-mt-4 tw-capitalize tw-w-full tw-daisy-btn-error"
          onClick={removeAccount}
        >
          Remove your account
        </button>
      )}
      <p className="tw-text-center tw-opacity-50 tw-mt-12">
        <Link href="/docs/about/privacy" className="hover:tw-text-secondary tw-underline">
          FreeSewing Privacy Notice
        </Link>
      </p>
    </div>
  )
}

const Checkbox = ({ value, setter, label, children = null }) => (
  <div
    className={`tw-form-control tw-p-4 hover:tw-cursor-pointer tw-rounded tw-border-l-8 tw-my-2
    ${value ? 'tw-border-success tw-bg-success' : 'tw-border-error tw-bg-error'}
    btw-g-opacity-10 tw-shadow`}
    onClick={() => setter(value ? false : true)}
  >
    <div className="tw-form-control tw-flex tw-flex-row tw-items-center tw-gap-2">
      <input
        type="checkbox"
        className="tw-daisy-checkbox"
        checked={value ? 'checked' : ''}
        onChange={() => setter(value ? false : true)}
      />
      <span className="tw-label-text">{label}</span>
    </div>
    {children}
  </div>
)

const text = {
  intro: (
    <>
      <p>
        FreeSewing respects your privacy and your rights. We adhere to the toughest privacy and
        security law in the world: the{' '}
        <a href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation">
          General Data Protection Regulation
        </a>{' '}
        (GDPR) of the European Union (EU).
      </p>
      <p>
        Under the GDPR, processing of your personal data requires granular consent — in other words,{' '}
        <b>we need your permission for the various ways we handle your data</b>.
      </p>
    </>
  ),
  account: (
    <div className="tw-border-l-4 tw-ml-1 tw-pl-4 tw-my-2 tw-opacity-80">
      <h6>What is account data?</h6>
      <p>
        Your <b>email address</b>, <b>username</b>, and <b>password</b>, and any <b>measurements</b>{' '}
        you add to your account.
      </p>
      <h6>Why do we need it?</h6>
      <p>
        To <b>authenticate</b> you, <b>contact</b> you when needed, and generate <b>bespoke</b>{' '}
        sewing patterns.
      </p>
      <h6>How long do we keep it?</h6>
      <p>
        <b>12 months</b> after the last time your connected to our backend, or until you{' '}
        <b>remove</b> your account or <b>revoke</b> this consent.
      </p>
      <h6>Do we share it with others?</h6>
      <p>
        <b>No</b>, never.
      </p>
      <p className="tw-text-sm tw-italic">
        Note: Freesewing publishes anonymized measurements as open data for scientific research. You
        have the right to object to this.
      </p>
    </div>
  ),
  opendata: `This data is used to study and understand the human form in all its shapes,
    so we can get better sewing patterns, and better fitting garments.
    Even though this data is anonymized, you have the right to object to this.`,
}
