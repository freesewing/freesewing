// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

/**
 * Control can be updated from many places in the UI.
 * So this shared state handler keeps this DRY
 */
export const useControl = () => {
  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [control, setControl] = useState(account.control)

  // Method to update the control setting
  const updateControl = async (newControl) => {
    if (newControl !== control) {
      if (token) {
        setLoadingStatus([true, 'Updating preferences'])
        const [status, body] = await backend.updateAccount({ control: newControl })
        if (status === 200) {
          setControl(newControl)
          setAccount(body.account)
          setLoadingStatus([true, 'Preferences updated', true, true])
        } else
          setLoadingStatus([true, 'Failed to update preferences. Please report this', true, true])
      } else {
      /*
       * Control is used even when people are not logged in
       * So this ensures control is always available, even if people are not authenticated
       */
        setAccount({ ...account, control: newControl })
        setControl(newControl)
      }
    }
  }

  return { control, updateControl }
}
