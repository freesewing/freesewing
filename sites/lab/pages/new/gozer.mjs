/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Gozer } from 'designs/gozer/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('gozer', wbNs, pageNs)

const NewGozerPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Gozer" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'gozer',
        Design: Gozer,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewGozerPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', 'gozer'],
        title: 'Gozer',
      },
    },
  }
}
