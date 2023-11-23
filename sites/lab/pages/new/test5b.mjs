/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Test5b } from 'designs/test5b/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('test5b', wbNs, pageNs)

const NewTest5bPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Test5b" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'test5b',
        Design: Test5b,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewTest5bPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'test5b'],
        title: 'Test5b',
      },
    },
  }
}
