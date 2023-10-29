// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useEffect, useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { BackToAccountButton } from 'shared/components/account/shared.mjs'
import { HelpIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, 'account', 'susi')

const ConfirmSignUpPage = ({ page }) => {
  // Hooks
  const { setAccount, setToken, token } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { t } = useTranslation(ns)
  const router = useRouter()

  // State
  const [error, setError] = useState(false)
  const [id, setId] = useState()
  const [check, setCheck] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    const newCheck = getSearchParam('check')
    if (newId !== id) setId(newId)
    if (newCheck !== check) setCheck(newCheck)
  }, [id, check])

  // Effects
  useEffect(() => {
    // Async inside useEffect requires this approach
    const confirmEmail = async () => {
      setLoadingStatus([true, 'status:contactingBackend'])
      const confirmation = await backend.loadConfirmation({ id, check })
      if (confirmation?.result === 'success' && confirmation.confirmation) {
        const result = await backend.updateAccount({
          confirm: 'emailchange',
          confirmation: confirmation.confirmation.id,
          check: confirmation.confirmation.check,
        })
        if (result.success) {
          setLoadingStatus([true, 'status:settingsSaved', true, true])
          setAccount(result.data.account)
          setToken(result.data.token)
          setError(false)
          router.push('/account')
        } else {
          setLoadingStatus([true, 'status:backendError', true, false])
          setError(true)
        }
      } else {
        setLoadingStatus([true, 'status:backendError', true, false])
        setError(true)
      }
    }
    // Call async methods
    if (token) confirmEmail()
  }, [id, check, token, backend, router, setAccount, setToken])

  // Update path with dynamic ID
  if (!page) return null
  page.path = ['confirm', 'emailchange', id]

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
