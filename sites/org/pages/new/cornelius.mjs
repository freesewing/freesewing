/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Cornelius } from 'designs/cornelius/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('cornelius', wbNs, pageNs)

const NewCorneliusPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Cornelius" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'cornelius',
        Design: Cornelius,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewCorneliusPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'cornelius'],
        title: 'Cornelius',
      },
    },
  }
}
