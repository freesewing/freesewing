import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { roles } from 'config/roles.mjs'

export const ns = ['auth']

const Wrap = ({ children }) => (
  <div className="m-auto max-w-lg text-center mt-24 p-8">{children}</div>
)

const ContactSupport = ({ t }) => (
  <div className="flex flex-row items-center justify-center gap-4 mt-8">
    <Link href="/support" className="btn btn-warning w-full">
      {t('contactSupport')}
    </Link>
  </div>
)

const AuthRequired = ({ t }) => (
  <Wrap>
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

const AccountInactive = ({ t }) => (
  <Wrap>
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

const AccountDisabled = ({ t }) => (
  <Wrap>
    <h1>{t('accountDisabled')}</h1>
    <p>{t('accountDisabledMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const AccountProhibited = ({ t }) => (
  <Wrap>
    <h1>{t('accountProhibited')}</h1>
    <p>{t('accountProhibitedMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const AccountStatusUnknown = ({ t }) => (
  <Wrap>
    <h1>{t('statusUnknown')}</h1>
    <p>{t('statusUnknownMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const RoleLacking = ({ t, requiredRole, role }) => (
  <Wrap>
    <h1>{t('roleLacking')}</h1>
    <p dangerouslySetInnerHTML={{ __html: t('roleLackingMsg', { requiredRole, role }) }} />
    <ContactSupport t={t} />
  </Wrap>
)

const ConsentLacking = ({ t }) => (
  <Wrap>
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
  const { account, token } = useAccount()
  if (!token || !account.username) return <AuthRequired t={t} />
  if (account.status !== 1) {
    if (account.status === 0) return <AccountInactive t={t} />
    if (account.status === -1) return <AccountDisabled t={t} />
    if (account.status === -2) return <AccountProhibited t={t} />
    return <AccountStatusUnknown t={t} />
  }
  if (account.consent < 1) return <ConsentLacking />

  if (!roles.levels[account.role] || roles.levels[account.role] < roles.levels[requiredRole]) {
    return <RoleLacking t={t} role={account.role} requiredRole={requiredRole} />
  }

  return children
}
