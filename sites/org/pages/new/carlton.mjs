/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Carlton } from 'designs/carlton/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('carlton', wbNs, pageNs)

const NewCarltonPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Carlton" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'carlton',
        Design: Carlton,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewCarltonPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'carlton'],
        title: 'Carlton',
      },
    },
  }
}
