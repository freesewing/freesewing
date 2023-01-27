import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import AuthWrapper, { namespaces as authNs } from 'site/components/wrappers/auth/index.js'
import NewsletterSettings, {
  namespaces as newsletterNs,
} from 'site/components/account/newsletter/index.js'

// Translation namespaces used on this page
const namespaces = [...newsletterNs, ...authNs]

const WelcomePage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  return (
    <Page app={app} title={t('title')} layout={Layout} footer={false}>
      <AuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-12 p-8">
          <NewsletterSettings app={app} title welcome />
        </div>
      </AuthWrapper>
    </Page>
  )
}

export default WelcomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
