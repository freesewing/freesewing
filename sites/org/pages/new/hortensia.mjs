/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Hortensia } from 'designs/hortensia/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('hortensia', wbNs, pageNs)

const NewHortensiaPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Hortensia" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'hortensia',
        Design: Hortensia,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewHortensiaPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'hortensia'],
        title: 'Hortensia',
      },
    },
  }
}
