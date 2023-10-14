// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Migrate, ns as migrateNs } from 'shared/components/susi/migrate.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, migrateNs, 'common')

const MigratePage = ({ page }) => {
  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-2xl">
          <Migrate />
        </div>
      </div>
    </PageWrapper>
  )
}

export default MigratePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        path: ['migrate'],
      },
    },
  }
}
