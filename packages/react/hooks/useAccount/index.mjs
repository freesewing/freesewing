import useLocalStorageState from 'use-local-storage-state'
import { defaultControlLevel } from '@freesewing/react/config/freesewing'

/*
 * When there is no account, we use this making it easy to check for username
 * or control
 */
const noAccount = { username: false, control: defaultControlLevel }

/*
 * FreeSewing's useAccount hook. Grants access to the (data in the) user's account
 */
export function useAccount() {
  /*
   * Account is stored in persisted state (saved to local storage)
   */
  const [account, setAccount] = useLocalStorageState('fs-account', { defaultValue: noAccount })

  /*
   * Admins are allowed to inpersonate a user.
   * When that happens, we store the admin's account in this admin field (saved in local storage).
   * When the admin ends the impersonation, we copy the account data under the admin key back into
   * the regular account key.
   * With this, admins would have to re-login after impersonating a user.
   */
  const [admin, setAdmin] = useLocalStorageState('fs-admin', { defaultValue: noAccount })

  /*
   * This holds the JSON Web Token (JWT) returned from the backend after authentication
   */
  const [token, setToken] = useLocalStorageState('fs-token', { defaultValue: null })

  /*
   * We use this to allow 'welcome back' style UI, asking for password, not username
   */
  const [seenUser, setSeenUser] = useLocalStorageState('fs-seen-user', { defaultValue: false })

  /*
   *  Clear user data when signing out
   */
  const signOut = () => {
    setAccount(noAccount)
    setToken(null)
  }

  /*
   * Impersonate a user.
   * Only admins can do this but that is enforced at the backend.
   */
  const impersonate = (data) => {
    /*
     * Store token and account data in admin, so we can restore them later
     */
    setAdmin({ token, account })

    /*
     * Create new account object based on the data passed in
     */
    const newAccount = {
      ...data.account,
      impersonatingAdmin: { id: account.id, username: account.username },
    }

    /*
     * Now set the new account and token
     */
    setAccount(newAccount)
    setToken(data.token)
  }

  /*
   * When impersonation ends, restore the original admin account
   */
  const stopImpersonating = () => {
    setAccount(admin.account)
    setToken(admin.token)
    clearAdmin()
  }

  /*
   * Don't keep account data lingering in the admin key
   */
  const clearAdmin = () => setAdmin(noAccount)

  /*
   * Return everything this hook provides
   */
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
