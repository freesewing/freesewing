/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Wahid } from '@freesewing/wahid'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('wahid', wbNs, pageNs)

const NewWahidPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Wahid" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'wahid',
        Design: Wahid,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewWahidPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Wahid,
        design: 'wahid',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'wahid'],
        title: 'Wahid',
      },
    },
  }
}
