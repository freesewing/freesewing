// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Robot } from 'shared/components/robot/index.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, 'status')

const NotFoundPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={`404: ${t('status:404')}`}>
      <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-base xl:pl-4">
        <Robot pose="fail" className="text-base-content max-w-64 mx-auto my-8" />
      </div>
    </PageWrapper>
  )
}

export default NotFoundPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['404'],
      },
    },
  }
}
