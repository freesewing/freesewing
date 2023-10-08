/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Bee } from '@freesewing/bee'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('bee', wbNs, pageNs)

const NewBeePage = ({ page, docs }) => (
  <PageWrapper {...page} title="Bee" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'bee',
        Design: Bee,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewBeePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Bee,
        design: 'bee',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'bee'],
        title: 'Bee',
      },
    },
  }
}
