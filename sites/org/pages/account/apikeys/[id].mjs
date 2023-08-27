// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as apikeysNs } from 'shared/components/account/apikeys.mjs'

// Translation namespaces used on this page
const ns = nsMerge(apikeysNs, authNs, pageNs, 'status')

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicApikey = dynamic(
  () => import('shared/components/account/apikeys.mjs').then((mod) => mod.Apikey),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const ApikeyPage = ({ page, id }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const [apikey, setApikey] = useState()

  useEffect(() => {
    const getApikey = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      const result = await backend.getApikey(id)
      if (result.success) {
        setApikey(result.data.apikey)
        console.log(result.data.apikey)
        setLoadingStatus([true, 'backendLoadingCompleted', true, true])
      } else setLoadingStatus([false])
    }
    getApikey()
  }, [id])

  return (
    <PageWrapper {...page} title={`${t('apikeys')}: ${apikey?.name}`}>
      <LoadingStatus />
      <DynamicAuthWrapper>
        <DynamicApikey apikey={apikey} t={t} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default ApikeyPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['account', 'apikeys', params.id],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export const getStaticPaths = async () => ({ paths: [], fallback: false })
