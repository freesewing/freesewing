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
import { H1, H2, H3 } from '@freesewing/react/components/Heading'

//import { ConsentForm, ns as gdprNs } from 'shared/components/gdpr/form.mjs'

const ConsentForm = () => null

const Wrap = ({ children }) => (
  <div className="tw-m-auto tw-max-w-xl tw-text-center tw-mt-8 tw-p-8">{children}</div>
)

const ContactSupport = ({ Link = false }) => {
  if (!Link) Link = DefaultLink

  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 tw-mt-8">
      <Link href="/support" className="tw-daisy-btn tw-daisy-btn-success tw-w-full">
        Contact Support
      </Link>
    </div>
  )
}

const AuthRequired = ({ Link, banner }) => {
  if (!Link) Link = DefaultLink

  return (
    <Wrap>
      {banner}
      <H3>Authentication Required</H3>
      <p>This functionality requires a FreeSewing account</p>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 tw-mt-8">
        <Link
          href="/signup"
          className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-secondary tw-w-full`}
        >
          <PlusIcon />
          Sign Up
        </Link>
        <Link
          href="/signin"
          className={`${horFlexClasses} tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline tw-w-full`}
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
      <H3>Account Inactive</H3>
      <p>You must activate your account via the signup link we sent you.</p>
      <p>If you cannot find the link, you can receive a new one by signing up again.</p>
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 tw-mt-8">
        <Link href="/signup" className="tw-daisy-btn tw-daisy-btn-primary tw-w-full">
          Sign Up
        </Link>
      </div>
    </Wrap>
  )
}

const AccountDisabled = ({ banner }) => (
  <Wrap>
    {banner}
    <H3>Acccount Disabled</H3>
    <p>
      You cannot re-enable a disabled account. You need to contact support to resolve this
      situation.
    </p>
    <ContactSupport />
  </Wrap>
)

const AccountProhibited = ({ banner }) => (
  <Wrap>
    {banner}
    <H3>Your account has been disabled</H3>
    <p>Your account has been administratively disabled.</p>
    <ContactSupport />
  </Wrap>
)

const AccountStatusUnknown = ({ banner }) => (
  <Wrap>
    {banner}
    <H3>Account status warning</H3>
    <p>Your account status prohibits us from processing your data. Please contact support.</p>
    <ContactSupport />
  </Wrap>
)

const RoleLacking = ({ t, requiredRole, role, banner }) => (
  <Wrap>
    {banner}
    <H3>You lack the required role to access this content</H3>
    <p>
      This content requires the <b>{requiredRole}</b> role. Your role is <b>{role}</b> which does
      not grant you access to this content.
    </p>
    <ContactSupport />
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
      <div className="tw-text-left">
        {banner}
        <ConsentForm submit={updateConsent} />
      </div>
    </Wrap>
  )
}

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
    if (admin?.account?.username && account?.username)
      setImpersonating({
        admin: admin.account.username,
        user: account.username,
      })
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
          signOut()
        }
      }
      setReady(true)
    }
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

  if (!ready) return <Spinner />

  const banner = impersonating ? (
    <div className="tw-bg-warning tw-rounded-lg tw-shadow tw-py-4 tw-px-6 tw-flex tw-flex-row tw-items-center tw-gap-4 tw-justify-between">
      <span className="tw-text-base-100 tw-text-left">
        Hi <b>{impersonating.admin}</b>, you are currently impersonating <b>{impersonating.user}</b>
      </span>
      <button className="tw-daisy-btn tw-daisy-btn-neutral" onClick={stopImpersonating}>
        Stop Impersonating
      </button>
    </div>
  ) : null

  const childProps = { banner }

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

export const UserVisitorContent = ({ userContent = null, visitorContent = null }) => {
  const { account, setAccount, token } = useAccount()
  const backend = useBackend()

  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  /*
   * Avoid hydration errors
   */
  useEffect(() => {
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
      }
      setReady(true)
    }
    if (token) {
      // Don't hammer the backend. Check once per hour.
      if (!account.bestBefore || account.bestBefore < Date.now()) verifyUser()
    }
    setReady(true)
  }, [refreshCount])

  const refresh = () => {
    setRefreshCount(refreshCount + 1)
    setError(false)
  }

  if (!ready) return <Spinner />

  return token && account.username ? userContent : visitorContent
}
