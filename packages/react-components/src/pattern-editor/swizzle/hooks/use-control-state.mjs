import { useState } from 'react'

/**
 * A hook to update the account control settings
 */
export const useControlState = (hooks, methods) => {
  /*
   * Load swizzled account and backend hooks
   */
  const { useAccount, useBackend } = hooks

  /*
   * Load account data through useAccount hook
   */
  const { account, setAccount, token } = useAccount()

  /*
   * Load backend client through useBackend hook
   */
  const backend = useBackend()

  /*
   * Load swizzled setLoadingStatus method
   */
  const { setLoadingStatus } = methods

  // State
  const [selection, setSelection] = useState(account.control)

  // Method to update the control setting
  const update = async (control) => {
    if (control !== selection) {
      if (token) {
        setLoadingStatus([true, 'processingUpdate'])
        const result = await backend.updateAccount({ control })
        if (result.success) {
          setSelection(control)
          setAccount(result.data.account)
          setLoadingStatus([true, 'settingsSaved', true, true])
        } else setLoadingStatus([true, 'backendError', true, true])
      }
      //fallback for guest users
      else {
        setAccount({ ...account, control })
        setSelection(control)
      }
    }
  }

  return { control: selection, setControl: update }
}
