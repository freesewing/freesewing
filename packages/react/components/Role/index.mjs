import { horFlexClasses } from '@freesewing/utils'
import { roles } from '@freesewing/config'
//Hooks
import React, { useEffect, useState } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as DefaultLink } from '@freesewing/react/components/Link'
import { LockIcon, PlusIcon } from '@freesewing/react/components/Icon'
import { Spinner } from '@freesewing/react/components/Spinner'

//import { ConsentForm, ns as gdprNs } from 'shared/components/gdpr/form.mjs'

const ConsentForm = () => null

const Wrap = ({ children }) => (
  <div className="m-auto max-w-xl text-center mt-8 p-8">{children}</div>
)

const ContactSupport = ({ Link = false }) => {
  if (!Link) Link = DefaultLink

  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Link href="/support" className="btn btn-success w-full">
        {t('contactSupport')}
      </Link>
    </div>
  )
}

const AuthRequired = ({ Link, banner }) => {
  if (!Link) Link = DefaultLink

  return (
    <Wrap>
      {banner}
      <h2>Authentication Required</h2>
      <p>This functionality requires a FreeSewing account</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
        <Link href="/signup" className={`${horFlexClasses} daisy-btn daisy-btn-secondary w-full`}>
          <PlusIcon />
          Sign Up
        </Link>
        <Link
          href="/signin"
          className={`${horFlexClasses} daisy-btn daisy-btn-secondary daisy-btn-outline w-full`}
        >
          <LockIcon />
          Sign In
        </Link>
      </div>
    </Wrap>
  )
}

const AccountInactive = ({ Link, banner }) => {
  if (!Link) Link = DefaultLink

  return (
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
}

const AccountDisabled = ({ banner }) => (
  <Wrap>
    {banner}
    <h1>{t('accountDisabled')}</h1>
    <p>{t('accountDisabledMsg')}</p>
    <ContactSupport t={t} />
  </Wrap>
)

const AccountProhibited = ({ banner }) => (
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
      if (result.success) {
        setToken(result.data.token)
        setAccount({ ...result.data.account, bestBefore: Date.now() + 3600000 })
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

const t = (input) => input

export const RoleBlock = ({ children, user = false, Link = false }) => {
  if (!Link) Link = DefaultLink
  let requiredRole = 'admin'
  if (user) requiredRole = user

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
      const [status, data] = await backend.ping()
      if (status === 200 && data.result === 'success') {
        // Refresh account in local storage
        setAccount({
          ...account,
          ...data.account,
          bestBefore: Date.now() + 3600000,
        })
      } else {
        if (data?.error?.error) setError(data.error.error)
        else {
          console.log('WOULD SIGN OUT', data)
        }
        //else signOut()
      }
      setReady(true)
    }
    if (admin && admin.token) verifyAdmin()
    if (token) {
      // Don't hammer the backend. Check once per hour.
      if (!account.bestBefore || account.bestBefore < Date.now()) verifyUser()
    }
    setReady(true)
  }, [admin, refreshCount, signOut])

  const refresh = () => {
    setRefreshCount(refreshCount + 1)
    setError(false)
  }

  if (!ready)
    return (
      <>
        <p>not ready</p>
        <Spinner />
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
