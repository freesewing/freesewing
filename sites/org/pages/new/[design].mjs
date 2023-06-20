// Hooks
import { useDesign, collection } from 'shared/hooks/use-design.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'
import { DynamicOrgDocs as DynamicDocs } from 'site/components/dynamic-org-docs.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(wbNs, pageNs)

const NewDesignPage = ({ page, design }) => {
  const Design = useDesign(design)

  return (
    <PageWrapper {...page} title={design} layout={WorkbenchLayout}>
      <Workbench {...{ design, Design, DynamicDocs }} />
    </PageWrapper>
  )
}

export default NewDesignPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [`o_${params.design}`, ...namespaces])),
      design: params.design,
      page: {
        locale,
        path: ['new', params.design],
        title: '',
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 */
export async function getStaticPaths() {
  return {
    paths: [...collection.map((design) => `/new/${design}`)],
    fallback: 'blocking',
  }
}
