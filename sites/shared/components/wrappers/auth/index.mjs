import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { roles } from 'config/roles.mjs'
import { useEffect, useState } from 'react'
import { Loading } from 'shared/components/spinner.mjs'

export const ns = ['auth']

const Wrap = ({ children }) => (
  <div className="m-auto max-w-xl text-center mt-24 p-8">{children}</div>
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
    <h1>{t('authRequired')}</h1>
    <p>{t('membersOnly')}</p>
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Link href="/signup" className="btn btn-primary w-32">
        {t('signUp')}
      </Link>
      <Link href="/signin" className="btn btn-primary btn-outline w-32">
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

const ConsentLacking = ({ t, banner }) => (
  <Wrap>
    {banner}
    <h1>{t('consentLacking')}</h1>
    <p>{t('membersOnly')}</p>
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Link href="/signup" className="btn btn-primary w-32">
        {t('signUp')}
      </Link>
      <Link href="/signin" className="btn btn-primary btn-outline w-32">
        {t('signIn')}
      </Link>
    </div>
  </Wrap>
)

export const AuthWrapper = ({ children, app, requiredRole = 'user' }) => {
  const { t } = useTranslation(ns)
  const { account, token, admin, stopImpersonating, signOut } = useAccount()
  const backend = useBackend()

  const [ready, setReady] = useState(false)
  const [impersonating, setImpersonating] = useState(false)

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
    }
    const verifyUser = async () => {
      const result = await backend.ping()
      if (result.success) {
      } else signOut()
    }
    if (admin && admin.token) verifyAdmin()
    if (token) verifyUser()
    setReady(true)
  }, [admin, token])

  if (!ready) return <Loading />

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
  if (account.status !== 1) {
    if (account.status === 0) return <AccountInactive {...childProps} />
    if (account.status === -1) return <AccountDisabled {...childProps} />
    if (account.status === -2) return <AccountProhibited {...childProps} />
    return <AccountStatusUnknown {...childProps} />
  }
  if (account.consent < 1) return <ConsentLacking {...childProps} />

  if (!roles.levels[account.role] || roles.levels[account.role] < roles.levels[requiredRole]) {
    return <RoleLacking {...childProps} role={account.role} requiredRole={requiredRole} />
  }

  return children
}
