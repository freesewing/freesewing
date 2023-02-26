// Hooks
import { useEffect, useState } from 'react'
import { useApp } from 'site/hooks/useApp.mjs'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
// Components
import { PageWrapper, ns as pageNs } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { BackToAccountButton } from 'site/components/account/shared.mjs'
import { HelpIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set([...pageNs, 'account']))

const ConfirmSignUpPage = (props) => {
  const app = useApp(props)
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const router = useRouter()

  const [error, setError] = useState(false)

  // Get confirmation ID and check from url
  const [id, check] = router.asPath.slice(1).split('/').slice(2)

  useEffect(() => {
    // Async inside useEffect requires this approach
    const confirmEmail = async () => {
      app.startLoading()
      const result = await backend.loadConfirmation({ id, check })
      if (result?.result === 'success' && result.confirmation) {
        const changed = await backend.updateAccount({
          confirm: 'emailchange',
          confirmation: result.confirmation.id,
          check: result.confirmation.check,
        })
        if (changed) {
          app.stopLoading()
          setError(false)
          toast.for.settingsSaved()
          router.push('/account')
        } else {
          app.stopLoading()
          setError(true)
        }
      } else {
        app.stopLoading()
        setError(true)
      }
    }
    // Call async methods
    if (app.token) confirmEmail()
  }, [id, check, app.token])

  // Short-circuit errors
  if (error)
    return (
      <PageWrapper app={app} title={t('account:politeOhCrap')} layout={BareLayout} footer={false}>
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
    <PageWrapper app={app} title={t('account:oneMomentPlease')} layout={BareLayout} footer={false}>
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
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
