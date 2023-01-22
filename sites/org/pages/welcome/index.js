import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import Link from 'next/link'
import { useState } from 'react'
import AuthWrapper, { namespaces as authNs } from 'site/components/wrappers/auth/index.js'
import Spinner from 'shared/components/icons/spinner.js'
import ControlSettings from 'site/components/account/control/index.js'

// Translation namespaces used on this page
const namespaces = ['welcome', ...authNs]

const WelcomePage = (props) => {
  const app = useApp(props)
  const { t } = useTranslation(namespaces)

  //const [email, setEmail] = useState('')
  //const [emailValid, setEmailValid] = useState(false)
  //const [result, setResult] = useState(false)
  //const [error, setError] = useState(null)

  const loadingClasses = app.loading ? 'opacity-50' : ''

  return (
    <Page app={app} title={t('joinFreeSewing')} layout={Layout} footer={false}>
      <AuthWrapper app={app}>
        <div className="m-auto max-w-lg text-center lg:mt-12 p-8">
          <h1>What do you prefer?</h1>
          <ControlSettings app={app} />
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
