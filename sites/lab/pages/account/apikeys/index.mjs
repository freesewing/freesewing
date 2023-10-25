// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useId } from 'shared/hooks/use-id.mjs'
import { useState, useEffect, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as apikeysNs } from 'shared/components/account/apikeys.mjs'

// Translation namespaces used on this page
const ns = nsMerge(apikeysNs, authNs, pageNs)

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicApikeys = dynamic(
  () => import('shared/components/account/apikeys.mjs').then((mod) => mod.Apikeys),
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
const AccountApikeysPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [id, setId] = useId()
  const [apikey, setApikey] = useState()

  useEffect(() => {
    const getApikey = async () => {
      setLoadingStatus([true, 'contactingBackend'])
      setApikey({ name: '', id })
      const result = await backend.getApikey(id)
      if (result.success) {
        setApikey(result.data.apikey)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([false])
    }
    if (id) getApikey()
  }, [id, backend, setLoadingStatus])

  return (
    <PageWrapper {...page} title={t('apikeys')}>
      <DynamicAuthWrapper>
        {id && apikey ? (
          <>
            <h2>{id}</h2>
            <DynamicApikey {...{ apikey, setId }} />
          </>
        ) : (
          <DynamicApikeys {...{ setId }} />
        )}
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default AccountApikeysPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['account', 'apikeys'],
      },
    },
  }
}
