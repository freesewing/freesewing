import dynamic from 'next/dynamic'
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
import { capitalize } from 'shared/utils.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { EditCuratedSet, ns as editNs } from 'site/components/curate/sets/edit.mjs'

// Translation namespaces used on this page
const namespaces = ['curate', 'sets', ...new Set([...editNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const EditCuratedSetPage = ({ page, set }) => {
  // Hooks
  const backend = useBackend()
  const [title, setTitle] = useState('...')

  useEffect(() => {
    const getCuratedSet = async () => {
      const result = await backend.getCuratedSet(set)
      console.log(result)
      if (result.success) {
        setTitle(`# ${set}: ` + result.data.curatedSet[`name${capitalize(page?.locale || 'en')}`])
      }
    }
    getCuratedSet()
  }, [set])

  return (
    <PageWrapper {...page} title={title}>
      <DynamicAuthWrapper requiredRole="curator">
        <EditCuratedSet id={set} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default EditCuratedSetPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      set: params.set,
      page: {
        locale,
        path: ['curate', 'sets', params.set],
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
