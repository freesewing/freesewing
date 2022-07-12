import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import Popout from 'shared/components/popout.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import { Icons } from 'shared/components/navigation/primary'
import DownIcon from 'shared/components/icons/down.js'

const HomePage = (props) => {
  const app = useApp()
  const { t } = useTranslation(['homepage', 'ograph'])

  return (
    <Page app={app} title="Welcome to FreeSewing.org" layout={Layout}>
      <Head>
        <meta property="og:title" content="FreeSewing.org" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content={t('ograph:orgDesc')} key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content={`https://canary.backend.freesewing.org/og-img/${app.locale}/org/`} key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.org/" key='url' />
        <meta property="og:locale" content={app.locale} key='locale' />
        <meta property="og:site_name" content="freesewing.org" key='site' />
      </Head>
        <section
          style={{
            backgroundImage: "url('/img/splash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: '40% 50%',
          }}
          className="m-0 p-0 shadow drop-shadow-lg w-full mb-8"
        >
          <div className="mx-auto px-8 pt-20 flex flex-col items-center justify-between min-h-screen">
            <span>&nbsp;</span>
            <div>
              <div className="flex flex-col items-end max-w-4xl">
                <h1
                  className={`
                    text-4xl font-black text-right px-4
                    sm:text-6xl
                    md:text-7xl px-6
                    lg:px-8
                    bg-primary
                    bg-opacity-80
                    `}
                  style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
                >
                  FreeSewing
                  <span className="font-light">.org</span>
                </h1>
                <h2
                  className={`
                    text-right text-xl mr-0
                    sm:text-3xl
                    md:text-4xl
                    lg:max-w-1/2 lg:text-4xl xl:pr-0 `}
                  style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
                >
                  <div>{t('common:sloganCome')}</div>
                  <div className="inline-block mt-2">
                    {t('common:sloganStay')}
                    <div className="theme-gradient h-1 lg:h-2" />
                  </div>
                </h2>
              </div>
              <Icons app={app}  active='/'
                ulClasses="flex flex-row flex-wrap mt-4 sm:mt-8 justify-between w-full max-w-7xl"
                liClasses="text-neutral-content w-1/3 my-4 lg:mx-2 lg:w-40 overflow-clip"
                linkClasses={`
                  text-sm sm:text-xl lg:text-xl py-1 text-secondary
                  hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
                  flex flex-col items-center capitalize`}
                linkStyle={{ textShadow: '2px 2px 2px #000, -2px 2px 2px #000, -2px -2px 2px #000, 2px -2px 2px #000',
                }}
              />
            </div>
            <div className="text-neutral-content text-center mt-8 text-center">
              {t('scrollDownToLearnMore')}
              <DownIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 animate-bounce w-full m-auto mt-8"/>
            </div>
          </div>
        </section>
      <div>
      <div className="max-w-xl m-auto my-32 px-6">
        <Popout fixme>Create homepage</Popout>
      </div>
      <div className="max-w-7xl m-auto my-32">
        <div className="px-8 text-base-content">
          <Icons app={app}
            active='/'
            ulClasses="flex flex-row flex-wrap mt-4 sm:mt-8 justify-between w-full max-w-7xl"
            liClasses="text-neutral-content w-1/3 my-4 lg:mx-2 lg:w-40 overflow-clip"
            linkClasses={`
              text-sm sm:text-xl lg:text-xl py-1 text-base-content
              hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
              flex flex-col items-center capitalize`}
          />
        </div>
      </div>
    </div>

    </Page>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}

