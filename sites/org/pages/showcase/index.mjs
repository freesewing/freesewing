// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { V3Wip } from 'shared/components/v3-wip.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['designs', ...pageNs])]

const DesignsPage = (props) => {
  const app = useApp(props)

  return (
    <PageWrapper app={app}>
      <div className="max-w-2xl">
        <V3Wip />
      </div>
    </PageWrapper>
  )
}

export default DesignsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        path: ['showcase'],
      },
    },
  }
}
