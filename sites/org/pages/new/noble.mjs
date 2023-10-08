/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Noble } from '@freesewing/noble'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('noble', wbNs, pageNs)

const NewNoblePage = ({ page, docs }) => (
  <PageWrapper {...page} title="Noble" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'noble',
        Design: Noble,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewNoblePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Noble,
        design: 'noble',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'noble'],
        title: 'Noble',
      },
    },
  }
}
