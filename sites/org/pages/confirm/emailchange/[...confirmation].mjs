// Hooks
import { useEffect, useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { BackToAccountButton } from 'shared/components/account/shared.mjs'
import { HelpIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set([...pageNs, 'account']))

const ConfirmSignUpPage = ({ page }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { setAccount, setToken, token } = useAccount()
  const backend = useBackend()
  const toast = useToast()
  const { t } = useTranslation(ns)
  const router = useRouter()
  // Get confirmation ID and check from url
  const [id, check] = router.asPath.slice(1).split('/').slice(2)

  // State
  const [error, setError] = useState(false)

  // Effects
  useEffect(() => {
    // Async inside useEffect requires this approach
    const confirmEmail = async () => {
      startLoading()
      const confirmation = await backend.loadConfirmation({ id, check })
      if (confirmation?.result === 'success' && confirmation.confirmation) {
        const result = await backend.updateAccount({
          confirm: 'emailchange',
          confirmation: confirmation.confirmation.id,
          check: confirmation.confirmation.check,
        })
        if (result.success) {
          setAccount(result.data.account)
          setToken(result.data.token)
          stopLoading()
          setError(false)
          toast.for.settingsSaved()
          router.push('/account')
        } else {
          stopLoading()
          setError(true)
        }
      } else {
        stopLoading()
        setError(true)
      }
    }
    // Call async methods
    if (token) confirmEmail()
  }, [
    id,
    check,
    token,
    backend,
    router,
    setAccount,
    setToken,
    startLoading,
    stopLoading,
    toast.for,
  ])

  // Update path with dynamic ID
  if (!page) return null
  if (page) page.path = ['confirm', 'emailchange', id]

  // Short-circuit errors
  if (error)
    return (
      <PageWrapper {...page} title={t('account:politeOhCrap')} layout={BareLayout} footer={false}>
        <div className="max-w-md flex flex-col items-center m-auto justify-center h-screen text-center">
          <h1 className="text-center">{t('account:politeOhCrap')}</h1>
          <Robot pose="ohno" className="w-48" embed />
          <p className="mt-4">{t('account:vagueError')}</p>
          <div className="flex flex-row gap-4 items-center mt-4">
            <BackToAccountButton />
            <Link className="btn btn-primary mt-4 pr-6" href="/support">
              <HelpIcon className="w-6 h-6 mr-4" /> {t('contactSupport')}
            </Link>
          </div>
        </div>
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={t('account:oneMomentPlease')} layout={BareLayout} footer={false}>
      <div className="max-w-md flex flex-col items-center m-auto justify-center h-screen text-center">
        <h1 className="text-center">{t('account:oneMomentPlease')}</h1>
        <p className="text-center">
          <Spinner />
        </p>
      </div>
    </PageWrapper>
  )
}

export default ConfirmSignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: { locale },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
