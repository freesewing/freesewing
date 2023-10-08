/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Shin } from '@freesewing/shin'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('shin', wbNs, pageNs)

const NewShinPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Shin" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'shin',
        Design: Shin,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewShinPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Shin,
        design: 'shin',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'shin'],
        title: 'Shin',
      },
    },
  }
}
