// Dependencies
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'

export const ns = ['account', 'toast']

export const ForceAccountCheck = ({ showWelcome = false, trigger = null }) => {
  // Hooks
  const { account, setAccount, token, logout } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

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
          logout()
        }
      }
      checkAccount()
    }
  }, [trigger])

  // Don't return anything. This is all about the useEffect hook.
  return null
}
