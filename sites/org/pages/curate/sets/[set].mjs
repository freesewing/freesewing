import dynamic from 'next/dynamic'
// Hooks
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { capitalize } from 'shared/utils.mjs'
// Components
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
      if (result.success) {
        setTitle(`# ${set}: ` + result.data.curatedSet[`name${capitalize(page?.locale || 'en')}`])
      }
    }
    getCuratedSet()
  }, [set, backend, page?.locale])

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
