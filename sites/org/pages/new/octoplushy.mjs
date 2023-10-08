/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { Octoplushy } from '@freesewing/octoplushy'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { workbenchInlineDocs } from 'shared/mdx/docs.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('octoplushy', wbNs, pageNs)

const NewOctoplushyPage = ({ page, docs }) => (
  <PageWrapper {...page} title="Octoplushy" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: 'octoplushy',
        Design: Octoplushy,
        docs,
      }}
    />
  </PageWrapper>
)

export default NewOctoplushyPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      docs: await workbenchInlineDocs({
        Design: Octoplushy,
        design: 'octoplushy',
        locale,
      }),
      page: {
        locale,
        path: ['new', 'octoplushy'],
        title: 'Octoplushy',
      },
    },
  }
}
