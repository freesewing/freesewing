/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Tamiko } from 'designs/tamiko/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('tamiko', wbNs, pageNs)

const NewTamikoPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Tamiko" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'tamiko',
        Design: Tamiko,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewTamikoPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'tamiko'],
        title: 'Tamiko',
      },
    },
  }
}
