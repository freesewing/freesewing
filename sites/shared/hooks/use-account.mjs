//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import useLocalStorageState from 'use-local-storage-state'

/*
 * Make it possible to always check for account.username and account.control
 */
const noAccount = { username: false, control: 3 }

/*
 * The useAccount hook
 */
export function useAccount() {
  // (persisted) State (saved to local storage)
  const [account, setAccount] = useLocalStorageState('fs-account', { defaultValue: noAccount })
  const [admin, setAdmin] = useLocalStorageState('fs-admin', { defaultValue: noAccount })
  const [token, setToken] = useLocalStorageState('fs-token', { defaultValue: null })
  const [seenUser, setSeenUser] = useLocalStorageState('fs-seen-user', { defaultValue: false })

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
    control: account?.control || 2,
  }
}
