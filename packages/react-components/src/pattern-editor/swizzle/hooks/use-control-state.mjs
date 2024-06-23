import { useState } from 'react'

/**
 * A hook to update the account control settings
 */
export const useControlState = (Swizzled) => {
  /*
   * Load account data through useAccount hook
   */
  const { account, setAccount, token } = Swizzled.hooks.useAccount(Swizzled)

  /*
   * Load backend client through useBackend hook
   */
  const backend = Swizzled.hooks.useBackend(Swizzled)

  // State
  const [selection, setSelection] = useState(account.control)

  // Method to update the control setting
  const update = async (control) => {
    if (control !== selection) {
      if (token) {
        const result = await backend.updateAccount({ control })
        if (result.success) {
          setSelection(control)
          setAccount(result.data.account)
        }
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
