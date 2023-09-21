import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { roles } from 'config/roles.mjs'
import { useEffect, useState } from 'react'
import { Loading } from 'shared/components/spinner.mjs'
import { horFlexClasses } from 'shared/utils.mjs'
import { LockIcon, PlusIcon } from 'shared/components/icons.mjs'
import { ConsentForm, ns as gdprNs } from 'shared/components/gdpr/form.mjs'

export const ns = ['auth', gdprNs]

const Wrap = ({ children }) => (
  <div className="m-auto max-w-xl text-center mt-8 p-8">{children}</div>
)

const ContactSupport = ({ t }) => (
  <div className="flex flex-row items-center justify-center gap-4 mt-8">
    <Link href="/support" className="btn btn-success w-full">
      {t('contactSupport')}
    </Link>
  </div>
)

const AuthRequired = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h2>{t('authRequired')}</h2>
    <p>{t('membersOnly')}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
      <Link href="/signup" className={`${horFlexClasses} btn btn-secondary w-full`}>
        <PlusIcon />
        {t('signUp')}
      </Link>
      <Link href="/signin" className={`${horFlexClasses} btn btn-secondary btn-outline w-full`}>
        <LockIcon />
        {t('signIn')}
      </Link>
    </div>
  </Wrap>
)

const AccountInactive = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('accountInactive')}</h1>
    <p>{t('accountInactiveMsg')}</p>
    <p>{t('signupAgain')}</p>
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Link href="/signup" className="btn btn-primary w-full">
        {t('signUp')}
      </Link>
    </div>
  </Wrap>
)

const AccountDisabled = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('accountDisabled')}</h1>
    <p>{t('accountDisabledMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const AccountProhibited = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('accountProhibited')}</h1>
    <p>{t('accountProhibitedMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const AccountStatusUnknown = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('statusUnknown')}</h1>
    <p>{t('statusUnknownMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const RoleLacking = ({ t, requiredRole, role, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('roleLacking')}</h1>
    <p dangerouslySetInnerHTML={{ __html: t('roleLackingMsg', { requiredRole, role }) }} />
    <ContactSupport t={t} />
  </Wrap>
)

const ConsentLacking = ({ banner, refresh }) => {
  const { setAccount, setToken, setSeenUser } = useAccount()
  const backend = useBackend()

  const updateConsent = async ({ consent1, consent2 }) => {
    let consent = 0
    if (consent1) consent = 1
    if (consent1 && consent2) consent = 2
    if (consent > 0) {
      const result = await backend.updateConsent(consent)
      console.log({ result })
      if (result.success) {
        setToken(result.data.token)
        setAccount(result.data.account)
        setSeenUser(result.data.account.username)
        refresh()
      } else {
        console.log('something went wrong', result)
        refresh()
      }
    }
  }

  return (
    <Wrap>
      <div className="text-left">
        {banner}
        <ConsentForm submit={updateConsent} />
      </div>
    </Wrap>
  )
}

export const AuthWrapper = ({ children, requiredRole = 'user' }) => {
  const { t } = useTranslation(ns)
  const { account, token, admin, stopImpersonating, signOut } = useAccount()
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
      if (!result.success) {
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

  if (!ready)
    return (
      <>
        <p>not ready</p>
        <Loading />
      </>
    )

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

  const childProps = { t, banner }

  if (!token || !account.username) return <AuthRequired {...childProps} />
  if (error) {
    if (error === 'accountInactive') return <AccountInactive {...childProps} />
    if (error === 'accountDisabled') return <AccountDisabled {...childProps} />
    if (error === 'accountBlocked') return <AccountProhibited {...childProps} />
    if (error === 'consentLacking') return <ConsentLacking {...childProps} refresh={refresh} />
    return <AccountStatusUnknown {...childProps} />
  }

  if (!roles.levels[account.role] || roles.levels[account.role] < roles.levels[requiredRole]) {
    return <RoleLacking {...childProps} role={account.role} requiredRole={requiredRole} />
  }

  return children
}
