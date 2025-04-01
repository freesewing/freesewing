// Dependencies
import { welcomeSteps } from './shared.mjs'
import { validateEmail, validateTld, getSearchParam } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext, useEffect } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { SaveIcon } from '@freesewing/react/components/Icon'
import { EmailInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'
import { Spinner } from '@freesewing/react/components/Spinner'

/*
 * Component for the account/bio page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const Email = ({ welcome = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [email, setEmail] = useState(account.email)
  const [changed, setChanged] = useState(false)

  // Helper method to update account
  const save = async () => {
    setLoadingStatus([true, 'Updating email address'])
    const [status, body] = await backend.updateAccount({ email })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setChanged(true)
      setLoadingStatus([true, 'Email change initiated', true, true])
    } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
  }

  // Is email valid?
  const valid = (validateEmail(email) && validateTld(email)) || false

  return (
    <div className="tw-w-full">
      {changed ? (
        <Popout note>
          <h3>Please confirm this change</h3>
          <p>
            We have sent an E-mail to your new address to confirm this change. Please click the link
            in that message to finalize this change.
          </p>
        </Popout>
      ) : (
        <>
          <EmailInput
            id="account-email"
            label="Email Address"
            placeholder="example@freesewing.org"
            update={setEmail}
            labelBL="You will need to confirm that you can receive email at this address"
            current={email}
            original={account.email}
            valid={() => valid}
          />
          <p className="tw-text-right">
            <button
              className="tw-daisy-btn tw-daisy-btn-primary tw-w-full lg:tw-w-auto tw-mt-8"
              onClick={save}
              disabled={!valid || email.toLowerCase() === account.email}
            >
              <SaveIcon /> Update Email Address
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export const EmailChangeConfirmation = ({ onSuccess = false }) => {
  // State
  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()

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
    const [status, body] = await backend.updateAccount({
      confirm: 'emailchange',
      confirmation: id,
      check,
    })

    // If it works, store account, which runs the onSuccess handler
    if (body.result === 'success' && body.account) return storeAccount(body)
    // If we get here, we're not sure what's wrong
    if (body.error) return setError(body.error)
    return setError(true)
  }

  // Updates the (local) account data
  const storeAccount = async (data) => {
    if (data?.account) {
      setAccount(data.account)
      setLoadingStatus([true, 'Email change completed', true, true])
      if (typeof onSuccess === 'function') onSuccess(data)
      else navigate('/account', true)
    } else {
      setError(data)
      setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
    }
  }

  // Short-circuit errors
  if (error) return <p>This error is unexpected. Please report this.</p>

  // If we do not (yet) have the data, show a loader
  if (!id || !check)
    return (
      <>
        <h1>One moment pleae</h1>
        <Spinner className="tw-w-8 tw-h-8 tw-m-auto tw-animate-spin" />
      </>
    )

  return <p>One moment please</p>
}
