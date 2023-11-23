/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Test5 } from 'designs/test5/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('test5', wbNs, pageNs)

const NewTest5Page = ({ page, docs }) => (
  <PageWrapper {...page} title="Test5" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'test5',
        Design: Test5,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewTest5Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'test5'],
        title: 'Test5',
      },
    },
  }
}
