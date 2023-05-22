// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'

export const useAccountReload = () => {
  // Hooks
  const { setAccount, token } = useAccount()
  const backend = useBackend(token)

  // Helper method to reload account
  const reload = async () => {
    const result = await backend.reloadAccount()
    if (result.success) setAccount(result.data.account)
  }

  return reload
}
