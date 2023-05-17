// Hooks
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Aaron } from '@freesewing/aaron'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/index.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'
import { Null } from 'shared/components/null.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['aaron', ...wbNs, ...pageNs])]

const NewAaronPage = ({ page, id }) => {
  const backend = useBackend()
  const [set, setSet] = useState(false)

  useEffect(() => {
    const getCuratedSet = async () => {
      const result = await backend.getCuratedSet(id)
      if (result.success) setSet(result.data.curatedSet)
    }
    getCuratedSet()
  }, [id, backend])

  return (
    <PageWrapper {...page} title="Aaron" layout={WorkbenchLayout} header={Null}>
      <Workbench design="aaron" Design={Aaron} set={set} />
    </PageWrapper>
  )
}

export default NewAaronPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      id: params.id,
      page: {
        locale,
        path: ['new', 'pattern', 'aaron', params.id],
        title: '',
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
