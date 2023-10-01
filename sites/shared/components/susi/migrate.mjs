// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useRouter } from 'next/router'
// Components
import Link from 'next/link'
import { Robot } from 'shared/components/robot/index.mjs'
import { StringInput, PasswordInput } from 'shared/components/inputs.mjs'
import { FreeSewingAnimation } from 'shared/components/animations/freesewing.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

// Translation namespaces used on this page
export const ns = ['signup', 'errros', 'account']

const DarkLink = ({ href, txt }) => (
  <Link className="decoration-1 underline text-medium font-medium hover:decoration-2" href={href}>
    {txt}
  </Link>
)

export const Migrate = () => {
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { loading, setLoadingStatus } = useContext(LoadingStatusContext)
  const { setAccount, setSeenUser, setToken } = useAccount()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(false)

  const migrate = async () => {
    setLoadingStatus([true, 'migrateV2Account'])
    const result = await backend.migrate({ username, password })
    if (result.success) {
      setLoadingStatus([true, 'nailedIt', true, true])
      setAccount(result.data.account)
      setToken(result.data.token)
      setSeenUser(result.data.account.username)
      setLoadingStatus([
        true,
        t('signup:welcomeMigrateName', { name: result.data.account.username }),
        true,
        true,
      ])
      setResult('success')
      router.push('/account')
    } else {
      let msg = t('signup:authenticationFailed')
      if (result.response?.response?.data?.error === 'userExists') {
        setResult('exists')
        msg = t('signup:v3UserAlreadyExists')
      } else setResult('failed')
      setLoadingStatus([true, msg, true, false])
    }
  }

  if (result === 'success')
    return (
      <>
        <FreeSewingAnimation />
      </>
    )
  if (result === 'exists')
    return (
      <>
        <h2 className="text-inherit">{t('signup:v3UserAlreadyExists')}</h2>
        <Robot pose="shrug" className="m-auto w-56 text-inherit" embed />
        <Link href="/signin" className="btn btn-primary w-full my-4">
          {t('signIn')}
        </Link>
        <div className="grid grid-cols-2 gap-2 w-full">
          <button className="btn btn-primary btn-outline" onClick={() => setResult(false)}>
            {t('tryAgain')}
          </button>
          <Link href="/support" className="btn btn-primary btn-outline">
            {t('contact')}
          </Link>
        </div>
      </>
    )
  if (result === 'failed')
    return (
      <>
        <h2 className="text-inherit">{t('signup:noWorkie')}</h2>
        <Robot pose="ohno" className="m-auto w-56 text-inherit" embed />
        <Link href="/signup" className="btn btn-primary w-full my-4">
          {t('signUpHere')}
        </Link>
        <div className="grid grid-cols-2 gap-2 w-full">
          <button className="btn btn-primary btn-outline" onClick={() => setResult(false)}>
            {t('tryAgain')}
          </button>
          <Link href="/support" className="btn btn-primary btn-outline">
            {t('contact')}
          </Link>
        </div>
      </>
    )

  return (
    <>
      <h2 className="text-inherit">{t('signup:migrateV2')}</h2>
      <p className="text-inherit">{t('migrateV2Desc')}</p>
      <div className="text-base-content">
        <StringInput
          id="migrate-username"
          label={t('account:username')}
          placeholder={t('account:username')}
          current={username}
          update={setUsername}
          valid={(val) => val.length > 1}
          docs={<DynamicOrgDocs language={i18n.language} path={`site/account/username`} />}
        />
        <PasswordInput
          id="migrate-password"
          label={t('account:password')}
          placeholder={t('password')}
          current={password}
          update={setPassword}
          valid={(val) => val.length > 1}
          docs={<DynamicOrgDocs language={i18n.language} path={`site/account/password`} />}
        />
        <button
          className="btn btn-primary btn-lg w-full mt-4"
          onClick={migrate}
          disabled={loading || username.length < 1 || password.length < 1}
        >
          {t('migrateV2')}
        </button>
      </div>
      <p className={`text-inherit text-sm mt-4 opacity-80 text-center`}>
        {t('dontHaveAV2Account')} <DarkLink href="/signup" txt={t('signUpHere')} />
      </p>
    </>
  )
}
