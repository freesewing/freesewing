import createPersistedState from 'use-persisted-state'

/*
 * Set up local storage state for account & token
 */
const usePersistedAccount = createPersistedState('fs-account')
const usePersistedToken = createPersistedState('fs-token')
const usePersistedSeenUser = createPersistedState('fs-seen-user')

/*
 * Make it possible to always check for account.username
 */
const noAccount = { username: false }

/*
 * The useAccount hook
 */
export function useAccount() {
  // (persisted) State (saved to local storage)
  const [account, setAccount] = usePersistedAccount(noAccount)
  const [token, setToken] = usePersistedToken(null)
  const [seenUser, setSeenUser] = usePersistedSeenUser(false)

  // Clear user data. This gets called when signing out
  const logout = () => {
    setAccount(noAccount)
    setToken(null)
  }

  return {
    account,
    setAccount,
    token,
    setToken,
    seenUser,
    setSeenUser,
    logout,
  }
}
