// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { ReloadIcon } from '@freesewing/react/components/Icon'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'

/*
 * Component for the account/actions/export page
 */
export const Reload = () => {
  // Hooks
  const backend = useBackend()
  const { setAccount } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Helper method to reload account
  const reload = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = await backend.reloadAccount()
    if (status === 200) {
      setAccount(body.account)
      setLoadingStatus([true, 'All done', true, true])
    } else setLoadingStatus([true, 'This did not go as planned. Please report this.', true, false])
  }

  return (
    <div className="tw-w-full">
      <p>
        The data stored in your browser can sometimes get out of sync with the data stored in our
        backend.
      </p>
      <p>
        This lets you reload your account data from the backend. It has the same effect as signing
        out, and then signing in again.
      </p>
      <IconButton onClick={reload}>
        <ReloadIcon />
        Reload Account Data
      </IconButton>
    </div>
  )
}
