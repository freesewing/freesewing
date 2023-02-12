// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

const HomePage = (props) => {
  const app = useApp(props)
  const title = 'Welcome to FreeSewing.org'
  // Not using translation for now
  //  const { t } = useTranslation(['homepage', 'ograph'])

  return (
    <PageWrapper app={app} title={title} layout={BareLayout}>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="max-w-xl m-auto my-32 px-6">
          <Popout fixme>
            Create homepage. Meanwhile check <PageLink href="/signup" txt="the signup flow" />
          </Popout>
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
