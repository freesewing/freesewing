import createPersistedState from 'use-persisted-state'

/*
 * Set up local storage state for account & token
 */
const usePersistedAccount = usePersistedState('fs-account')
const usePersistedToken = usePersistedState('fs-token')

/*
 * Make it possible to always check for account.username
 */
const noAccount = { username: false }

/*
 * The useAccount hook
 */
export function useAccount() {
  // (persisted) State (saved to local storage)
  const [account, setAccount] = usePersistedAccount()
  const [token, setToken] = usePersistedToken()

  // Clear user data. This gets called when signing out
  const clear = () => {
    setAccount(noAccount)
    setToken(null)
  }

  return {
    account,
    setAccount,
    token,
    setToken,
    clear,
  }
}
