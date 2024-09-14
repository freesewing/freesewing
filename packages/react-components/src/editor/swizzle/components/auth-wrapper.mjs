import { useState, useEffect } from 'react'

export const AuthMessageWrapper = ({ children }) => (
  <div className="m-auto max-w-xl text-center mt-8 p-8">{children}</div>
)

export const ContactSupport = ({ t, Swizzled }) => (
  <div className="flex flex-row items-center justify-center gap-4 mt-8">
    <Swizzled.components.Link href="/support" className="btn btn-success w-full">
      {t('contactSupport')}
    </Swizzled.components.Link>
  </div>
)

export const AuthRequired = ({ t, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h2>{Swizzled.methods.t('pe:authRequired')}</h2>
    <p>{t('pe:membersOnly')}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
      <Swizzled.components.Link
        href="/signup"
        className={`${Swizzled.config.classes.horFlex} btn btn-secondary w-full`}
      >
        <Swizzled.components.PlusIcon />
        {t('pe:signUp')}
      </Swizzled.components.Link>
      <Swizzled.components.Link
        href="/signin"
        className={`${Swizzled.config.classes.horFlex} btn btn-secondary btn-outline w-full`}
      >
        <Swizzled.components.LockIcon />
        {t('signIn')}
      </Swizzled.components.Link>
    </div>
  </Swizzled.components.AuthMessageWrapper>
)

export const AccountInactive = ({ t, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h1>{t('accountInactive')}</h1>
    <p>{t('accountInactiveMsg')}</p>
    <p>{t('signupAgain')}</p>
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Swizzled.components.Link href="/signup" className="btn btn-primary w-full">
        {t('signUp')}
      </Swizzled.components.Link>
    </div>
  </Swizzled.components.AuthMessageWrapper>
)

export const AccountDisabled = ({ t, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h1>{t('accountDisabled')}</h1>
    <p>{t('accountDisabledMsg')}</p>
    <ContactSupport t={t} />
  </Swizzled.components.AuthMessageWrapper>
)

export const AccountProhibited = ({ t, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h1>{t('accountProhibited')}</h1>
    <p>{t('accountProhibitedMsg')}</p>
    <Swizzled.components.ContactSupport t={t} />
  </Swizzled.components.AuthMessageWrapper>
)

export const AccountStatusUnknown = ({ t, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h1>{t('statusUnknown')}</h1>
    <p>{t('statusUnknownMsg')}</p>
    <Swizzled.components.ContactSupport t={t} />
  </Swizzled.components.AuthMessageWrapper>
)

export const RoleLacking = ({ t, requiredRole, role, banner, Swizzled }) => (
  <Swizzled.components.AuthMessageWrapper>
    {banner}
    <h1>{t('roleLacking')}</h1>
    <p dangerouslySetInnerHTML={{ __html: t('roleLackingMsg', { requiredRole, role }) }} />
    <Swizzled.components.ContactSupport t={t} />
  </Swizzled.components.AuthMessageWrapper>
)

export const ConsentLacking = ({ banner, refresh, Swizzled }) => {
  const { setAccount, setToken, setSeenUser } = Swizzled.hooks.useAccount()
  const backend = Swizzled.hooks.useBackend()

  //const updateConsent = async ({ consent1, consent2 }) => {
  //  let consent = 0
  //  if (consent1) consent = 1
  //  if (consent1 && consent2) consent = 2
  //  if (consent > 0) {
  //    const result = await backend.updateConsent(consent)
  //    if (result.success) {
  //      setToken(result.data.token)
  //      setAccount(result.data.account)
  //      setSeenUser(result.data.account.username)
  //      refresh()
  //    } else {
  //      console.log('something went wrong', result)
  //      refresh()
  //    }
  //  }
  //}

  return (
    <Swizzled.components.AuthMessageWrapper>
      <div className="text-left">
        {banner}
        <p>FIXME: Handle content form</p>
        {/*<ConsentForm submit={updateConsent} />*/}
      </div>
    </Swizzled.components.AuthMessageWrapper>
  )
}

export const AuthWrapper = ({ children, requiredRole = 'user', Swizzled }) => {
  const { t } = Swizzled.methods
  const { useAccount, useBackend } = Swizzled.hooks
  const { account, setAccount, token, admin, stopImpersonating, signOut } = useAccount()
  const backend = useBackend()

  const [ready, setReady] = useState(false)
  const [impersonating, setImpersonating] = useState(false)
  const [error, setError] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  /*
   * Avoid hydration errors
   */
  useEffect(() => {
    const verifyAdmin = async () => {
      const result = await backend.adminPing(admin.token)
      if (result.success && result.data.account.role === 'admin') {
        setImpersonating({
          admin: result.data.account.username,
          user: account.username,
        })
      }
      setReady(true)
    }
    const verifyUser = async () => {
      const result = await backend.ping()
      if (result.success) {
        // Refresh account in local storage
        setAccount({
          ...account,
          ...result.data.account,
        })
      } else {
        if (result.data?.error?.error) setError(result.data.error.error)
        else signOut()
      }
      setReady(true)
    }
    if (admin && admin.token) verifyAdmin()
    if (token) verifyUser()
    else setReady(true)
  }, [admin, token, refreshCount])

  const refresh = () => {
    setRefreshCount(refreshCount + 1)
    setError(false)
  }

  if (!ready) return <Swizzled.components.Loading />

  const banner = impersonating ? (
    <div className="bg-warning rounded-lg shadow py-4 px-6 flex flex-row items-center gap-4 justify-between">
      <span className="text-base-100 text-left">
        Hi <b>{impersonating.admin}</b>, you are currently impersonating <b>{impersonating.user}</b>
      </span>
      <button className="btn btn-neutral" onClick={stopImpersonating}>
        Stop Impersonating
      </button>
    </div>
  ) : null

  const childProps = { t, banner, Swizzled }

  if (!token || !account.username) return <Swizzled.components.AuthRequired {...childProps} />
  if (error) {
    if (error === 'accountInactive') return <Swizzled.components.AccountInactive {...childProps} />
    if (error === 'accountDisabled') return <Swizzled.components.AccountDisabled {...childProps} />
    if (error === 'accountBlocked') return <Swizzled.components.AccountProhibited {...childProps} />
    if (error === 'consentLacking')
      return <Swizzled.components.ConsentLacking {...childProps} refresh={refresh} />
    return <Swizzled.components.AccountStatusUnknown {...childProps} />
  }

  if (
    !Swizzled.config.roles.levels[account.role] ||
    Swizzled.config.roles.levels[account.role] < Swizzled.config.roles.levels[requiredRole]
  ) {
    return (
      <Swizzled.components.RoleLacking
        {...childProps}
        role={account.role}
        requiredRole={requiredRole}
      />
    )
  }

  return children
}
