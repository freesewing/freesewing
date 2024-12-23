// Dependencies
import { welcomeSteps } from './shared.mjs'
import { validateEmail, validateTld } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { SaveIcon } from '@freesewing/react/components/Icon'
import { EmailInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'

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
    <div className="w-full">
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
          <p className="text-right">
            <button
              className="daisy-btn daisy-btn-primary w-full lg:w-auto mt-8"
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
