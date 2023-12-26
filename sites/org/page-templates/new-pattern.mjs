/*
 * This page is auto-generated. Do not edit it by hand.
 */
import { $$Design$$ } from 'designs/$$design$$/src/index.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'

// Translation namespaces used on this page
const ns = nsMerge('$$design$$', wbNs, pageNs)

const New$$Design$$Page = ({ page, docs }) => (
  <PageWrapper {...page} title="$$Design$$" layout={WorkbenchLayout} header={null}>
    <Workbench
      {...{
        design: '$$design$$',
        Design: $$Design$$,
        docs,
      }}
    />
  </PageWrapper>
)

export default New$$Design$$Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['new', '$$design$$'],
        title: '$$Design$$',
      },
    },
  }
}
