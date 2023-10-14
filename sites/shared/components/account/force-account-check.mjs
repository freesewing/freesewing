// Dependencies
import { useState, useEffect } from 'react'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'

export const ForceAccountCheck = ({ trigger = null }) => {
  // Hooks
  const { account, setAccount, signOut } = useAccount()
  const backend = useBackend()

  // State
  const [lastCheck, setLastCheck] = useState(Date.now())

  // The actual check
  useEffect(() => {
    const age = Date.now() - lastCheck
    if (account.status && age < 500) {
      const checkAccount = async () => {
        const result = await backend.reloadAccount()
        if (result.success) {
          setAccount(result.data.account)
        } else {
          // Login expired. Logout user.
          signOut()
        }
        setLastCheck(Date.now())
      }
      checkAccount()
    }
  }, [trigger])

  // Don't return anything. This is all about the useEffect hook.
  return null
}
