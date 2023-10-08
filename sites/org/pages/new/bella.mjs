/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Bella } from '@freesewing/bella'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('bella', wbNs, pageNs)

const NewBellaPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Bella" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'bella',
        Design: Bella,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewBellaPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Bella,
        design: 'bella',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'bella'],
        title: 'Bella',
      },
    },
  }
}
