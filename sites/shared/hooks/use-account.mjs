import createPersistedState from 'use-persisted-state'

/*
 * Set up local storage state for account & token
 */
const usePersistedAccount = createPersistedState('fs-account')
const usePersistedAdmin = createPersistedState('fs-admin')
const usePersistedToken = createPersistedState('fs-token')
const usePersistedSeenUser = createPersistedState('fs-seen-user')

/*
 * Make it possible to always check for account.username and account.control
 */
const noAccount = { username: false, control: 2 }

/*
 * The useAccount hook
 */
export function useAccount() {
  // (persisted) State (saved to local storage)
  const [account, setAccount] = usePersistedAccount(noAccount)
  const [admin, setAdmin] = usePersistedAdmin(noAccount)
  const [token, setToken] = usePersistedToken(null)
  const [seenUser, setSeenUser] = usePersistedSeenUser(false)

  // Clear user data. This gets called when signing out
  const signOut = () => {
    setAccount(noAccount)
    setToken(null)
  }

  // Impersonate a user.
  // Only admins can do this but that is enforced at the backend.
  const impersonate = (data) => {
    setAdmin({ token, account })
    const newAccount = {
      ...data.account,
      impersonatingAdmin: { id: account.id, username: account.username },
    }
    setAdmin({ token, account: { ...account } })
    setAccount(newAccount)
    setToken(data.token)
  }

  const stopImpersonating = () => {
    setAccount(admin.account)
    setToken(admin.token)
    clearAdmin()
  }

  const clearAdmin = () => setAdmin(noAccount)

  return {
    account,
    setAccount,
    token,
    setToken,
    seenUser,
    setSeenUser,
    signOut,
    admin,
    clearAdmin,
    impersonate,
    stopImpersonating,
    control: account.control || 2,
  }
}
